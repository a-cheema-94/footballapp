import { makeFootballApiCall, makeNewsApiCall } from '../dataFetching/apiCallFunctions.js';
import { shouldMakeApiCall } from '../dataFetching/shouldMakeApiCall.js';
import { clearMongoCollection } from '../dataFetching/handleDatabaseFunctions.js';
import { FIXTURES_ENDPOINTS, LEAGUES, SEASON } from '../fixedData/fixedData.js';
import LastApiCallTimes from '../models/LastApiCallTimesModel.js';
import SquadMember from '../models/SquadMemberModel.js';
import TeamStanding from '../models/TeamStandingModel.js';
import TeamStats from '../models/TeamStatsModel.js';
import Player from '../models/TopPlayerModel.js';
import chalk from 'chalk'
import Fixture from '../models/fixtures/FixtureModel.js';
import News from '../models/NewsModel.js';
import { getTeamOrPlayerId, makeInitialQuery, searchDatabase } from './additionalFunctions.js';

export const resolvers = {
  Query: {
    topPlayers: async (_, { league, limit = 20, sortBy }) => {

      // clearMongoCollection(TopPlayer);
      // clearMongoCollection(LastApiCallTimes);
      
      
      let endpoint = 'players/topscorers'
      if(sortBy === 'assists') endpoint = 'players/topassists'

      if(!Object.keys(LEAGUES).includes(league)) league = 'Premier League';

      await makeInitialQuery('daily', endpoint, league, { league: LEAGUES[league], season: SEASON }, 'Top Players', league)

      let sortingInformation = {};
      let category = 'total';
      if (sortBy === 'assists') {
        category = 'assists'
      } 
      sortingInformation[`statistics.goals.${category}`] = -1
      let topPlayers;
      try {
        
        topPlayers = await Player.find({ league }).sort(sortingInformation).limit(limit).exec();
        
        console.log(chalk.green('data finalized'))
        // console.log(topPlayers.length)
      } catch (error) {
        console.error(`some error occurred when fetching players from database: ${error}`)
      }
      return topPlayers
    },

    leagueStandings: async (_, { league, limit = 20 }) => {
      
      // clearMongoCollection(TeamStanding)
      // clearMongoCollection(LastApiCallTimes);

      let endpoint = 'standings'
      if(!Object.keys(LEAGUES).includes(league)) league = 'Premier League';

      await makeInitialQuery('daily', endpoint, league, { league: LEAGUES[league], season: SEASON }, 'Team Standings', league)
      
      let sortingInformation = {};
      sortingInformation[`rank`] = 1

      let teamStandings;
      try {
        
        teamStandings = await TeamStanding.find({ league }).sort(sortingInformation).limit(limit).exec();
        
        console.log(chalk.green('data finalized'))
        
      } catch (error) {
        console.error(`some error occurred when fetching team Standings from database: ${error}`)
      }
      return teamStandings
    }, 

    playerSquads: async (_, { team, league }) => {
      // clearMongoCollection(LastApiCallTimes, { endpoint: 'players/squads' });
      // clearMongoCollection(SquadMember)

      let endpoint = 'players/squads';
      // teamId
      let teamId= await getTeamOrPlayerId(TeamStanding, { 'team.name': team });
      
      console.log(chalk.yellow(team, ': ', teamId))

      await makeInitialQuery('weekly', endpoint, team, { team: teamId }, "Squad Members", league )

      
      let squad;
      try {
        
        squad = await SquadMember.find({ team }).exec();
        
        console.log(chalk.green('data finalized'))
        
      } catch (error) {
        console.error(`some error occurred when fetching squad members from database: ${error}`)
      }
      return squad
    },

    teamStats: async (_, { team, league }) => {
      // clearMongoCollection(LastApiCallTimes);
      // clearMongoCollection(TeamStats)

      let endpoint = 'teams/statistics';
      // team Id
      let teamId = await getTeamOrPlayerId(TeamStanding, { 'team.name': team })
      console.log(teamId)

      await makeInitialQuery('weekly', endpoint, team, { team: teamId, league: LEAGUES[league], season: SEASON  }, 'Team Stats', league );

      let teamStats;

      try {
        teamStats = await TeamStats.findOne({ 'team.name': team })
        console.log(chalk.green('data finalized'))
        
      } catch (error) {
        console.error(`some error occurred when fetching team stats from database: ${error}`)
      }
      return teamStats;
    },

    playerStats: async (_, { player, team, league }) => {
      // clearMongoCollection(Player);
      // clearMongoCollection(LastApiCallTimes);

      let endpoint = 'players';

      let teamId = await getTeamOrPlayerId(TeamStanding, { 'team.name': team });

      let playerId = await getTeamOrPlayerId(SquadMember, { name: player });

      await makeInitialQuery('weekly', endpoint, player, { id: playerId, team: teamId, league: LEAGUES[league], season: SEASON }, "Player", league )

      let playerStats;
      try {
        playerStats = await Player.findOne({ 'general.id': playerId })
        console.log(chalk.green('data finalized'))
        
      } catch (error) {
        console.error(`some error occurred when fetching player stats from database: ${error}`)
      }
      return playerStats;
    },

    getLastOrNextFixture: async (_, { team, league, type }) => {
      // clearMongoCollection(LastApiCallTimes, { endpoint: "fixtures" })
      // await clearMongoCollection(Fixture, { $or: [
      //   { 'teams.home.name': team },
      //   { 'teams.home.name': team },
      // ] })



      let endpoint = 'fixtures';

      let teamId = await getTeamOrPlayerId(TeamStanding, { 'team.name': team })
      console.log(chalk.yellow(team, ': ', teamId))

      
      const fixtureParams = { team: teamId, league: LEAGUES[league], season: SEASON }
      fixtureParams[type] = 1 // can be last or next

      await makeInitialQuery("daily", endpoint, `${team}: ${type}`, fixtureParams, "Fixtures (last or next)", league )

      let finalFixture;

      // get latest fixture i.e. latest last fixture and latest next fixture for a particular team, so use .sort after query has been sorted.
      let sortingInfo = {};

      if(type === 'next') {
        sortingInfo['fixture.status.short'] = 'NS'
      } else if (type === 'last') {
        sortingInfo['fixture.status.short'] = 'FT'
      }

      try {
        finalFixture = await Fixture.findOne({ ...sortingInfo, $or: [
          { 'teams.home.name': team },
          { 'teams.away.name': team }
        ] }).sort({ createdAt: -1 })
        console.log(chalk.green('data finalized'))
        
      } catch (error) {
        console.error(`some error occurred when fetching fixture from database: ${error}`)
      }

      return finalFixture;
    },

    getLastFixtureInfo: async (_, { team, league }) => {
      // need fixture id of last fixture
      // clearMongoCollection(Fixture)
      // clearMongoCollection(LastApiCallTimes)

      let lastFixture = await Fixture.findOne({
        $or: [
          { 'teams.home.name': team },
          { 'teams.away.name': team }
        ],
        'fixture.status.short': 'FT'
      }).sort({ createdAt: -1 });

      const {
        fixture: { id: lastFixtureId } = {}, // case where fixture might be undefined => avoid errors
        events: fixtureEvents,
        lineups: fixtureLineups,
        statistics: fixtureStatistics
      } = lastFixture || {};

      // if the events/lineups/statistics are empty call api.
      const fixtureInfoData = [ fixtureEvents, fixtureLineups, fixtureStatistics ]

      try {
        if(fixtureInfoData.every(array => array.length === 0)) {
          // call api for endpoints events/lineups/statistics
          const fixtureInfoCalls = FIXTURES_ENDPOINTS.map(endpoint => makeFootballApiCall(endpoint, { fixture: lastFixtureId }, `${league}.${lastFixtureId}`));
  
          await Promise.all(fixtureInfoCalls)
        }
        
      } catch (error) {
        console.error(`Error! not able to make api call to get fixture info: ${error}`)
      }
  

      // look for fixture again and then return
      let finalFixture;
      try {
        finalFixture = await Fixture.findOne({ "fixture.id": lastFixtureId });
        console.log(chalk.green.bold('successfully got data from database'))
      } catch (error) {
        console.error(`Error, cannot query fixture from database: ${error}`)
      }
      return finalFixture;

    },
    
    liveFixtures: async (_, { leagues }) => {
      // clearMongoCollection(Fixture, { live: true })
      // clearMongoCollection(LastApiCallTimes, { parameter: 'live' })

      let liveLeagueIds = ''
      leagues.forEach(league => liveLeagueIds += `${LEAGUES[league]}-`);
      liveLeagueIds = liveLeagueIds.split('-');
      liveLeagueIds.pop();
      liveLeagueIds = liveLeagueIds.join('-');
      let endpoint = 'fixtures'

      await makeInitialQuery("minute", endpoint, 'live', { live: liveLeagueIds }, "Live Fixture")


      // more complex since I want Premier league live fixtures first followed by the rest, so use an aggregation pipeline.

      let liveFixtures;

      try {
        liveFixtures = await Fixture.aggregate([
          {
            $match: { live: true }
            // get all live fixtures in an array
          },
          {
            // add a sortOrder field to specify that premier league live fixtures will be sorted first
            $addFields: {
              sortOrder: {
                $cond: {
                  if: { $eq: [ "$league", "Premier League" ] },
                  then: 0,
                  else: 1
                }
              }
            }
          },
          {
            // now, sort first by live premier league fixtures in alphabetical order, then the other fixtures by league in alphabetical order.
            $sort: {
              sortOrder: 1,
              league: 1
            }
          }
        ])
      } catch (error) {
        console.error(`some error occurred when fetching live fixtures from database: ${error}`)
      }

      return liveFixtures;      
    },

    topFootballStories: async () => {

      try {
        if( await shouldMakeApiCall('daily', 'news', 'top football headlines')) {
          console.log(chalk.bold('news'))
          console.log(chalk.green('Call Api!!!'))
          await makeNewsApiCall()
          console.log(chalk.green('async happening'))
        }
      } catch (error) {
        throw new Error(`Top news stories failed to fetch: ${error.message}`)
      }

      let topFootballHeadlines;
      try {
        
        topFootballHeadlines = await News.find().sort({ publishedAt: -1 }).exec();
        
        console.log(chalk.green('data finalized'))
        // console.log(topPlayers.length)
      } catch (error) {
        console.error(`some error occurred when fetching news stories from database: ${error}`)
      }

      return topFootballHeadlines;

    },

    // TODO: Player Search
    playerSearch: async (_, { query, league, team = null }) => {
      let searchResults = [];
      let teamId;
      let endpoint = 'players'

      const playerSearchParams = { search: query, league: LEAGUES[league], season: SEASON }
      const matchFields = [{ league }];
      if(team) {
        teamId = await getTeamOrPlayerId(TeamStanding, { 'team.name': team })
        playerSearchParams[team] = teamId;
        // matchFields["statistics.team.name"] = team;
        matchFields.push({ "statistics.team.name": team })
      }
      
      // search through Player collection to see if any matches, if not call api can add new player to Player collection. Also have limits to the search with league and team (if not null).

      try {
        searchResults = await searchDatabase(query);

        if(searchResults.length === 0) {
          console.log(chalk.bold.bgYellowBright.black('player/players NOT in database already need to call API'))

          await makeFootballApiCall(endpoint, playerSearchParams, league);

          // add a delay, to ensure database has processed data.
          await new Promise((resolve) => setTimeout(resolve, 1000));

          searchResults = await searchDatabase(query);
        } else {
          console.log(chalk.bold.bgMagenta('player/players in database already'))
        }

      } catch (error) {
        console.error(chalk.bold.bgRedBright(`Error when searching and fetching players: ${error}`))
      }
      return searchResults;
      
    }
  }
}

export default resolvers