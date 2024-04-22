import { makeApiCall } from '../dataFetching/apiCallFunctions.js';
import { shouldMakeApiCall } from '../dataFetching/fetchData.js';
import { clearMongoCollection } from '../dataFetching/handleDatabaseFunctions.js';
import { FIXTURES_ENDPOINTS, LEAGUES, SEASON } from '../fixedData/fixedData.js';
import LastApiCallTimes from '../models/LastApiCallTimesModel.js';
import SquadMember from '../models/SquadMemberModel.js';
import TeamStanding from '../models/TeamStandingModel.js';
import TeamStats from '../models/TeamStatsModel.js';
import Player from '../models/TopPlayerModel.js';
import chalk from 'chalk'
import Fixture from '../models/fixtures/FixtureModel.js';

export const resolvers = {

  Query: {
    topPlayers: async (_, { league, limit = 20, sortBy }) => {

      // clearMongoCollection(TopPlayer);
      // clearMongoCollection(LastApiCallTimes);
      
      
      let endpoint = 'players/topscorers'
      if(sortBy === 'assists') endpoint = 'players/topassists'

      if(!Object.keys(LEAGUES).includes(league)) league = 'Premier League';
      
      try {
        if( await shouldMakeApiCall('daily', endpoint, league)) {
          console.log(chalk.bold(endpoint))
          console.log(chalk.green('Call Api!!!'))
          await makeApiCall(endpoint, { league: LEAGUES[league], season: SEASON }, league)
          console.log(chalk.green('async happening'))
        }
      } catch (error) {
        throw new Error(`Top Players failed to fetch: ${error.message}`)
      }

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
        console.log(topPlayers.length)
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

      try {
        if( await shouldMakeApiCall('daily', endpoint, league)) {
          console.log(chalk.bold(endpoint))
          console.log(chalk.green('Call Api!!!'))
          await makeApiCall(endpoint, { league: LEAGUES[league], season: SEASON }, league)
          console.log(chalk.green('async happening'))
        }
      } catch (error) {
        throw new Error(`Team Standings failed to fetch: ${error.message}`)
      }
      
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
      let endpoint = 'players/squads';
      // teamId
      let teamStanding = await TeamStanding.findOne({ 'team.name': team });
      let teamId = teamStanding?.team.id
      console.log(chalk.yellow(team, ': ', teamId))
      try {
        if( await shouldMakeApiCall('weekly', endpoint, team)) {
          console.log(chalk.bold(endpoint))
          console.log(chalk.green('Call Api!!!'))
          await makeApiCall(endpoint, { team: teamId }, league)
          console.log(chalk.green('async happening'))
        }
      } catch (error) {
        throw new Error(`Squad Members failed to fetch: ${error.message}`)
      }
      
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
      let teamStanding;
      try {
        teamStanding = await TeamStanding.findOne({ 'team.name': team });
        
      } catch (error) {
        console.error(`An error occurred querying the team standing`)
      }
      let teamId = teamStanding?.team.id;
      // console.log(teamId)

      try {
        if( await shouldMakeApiCall('weekly', endpoint, team)) {
          console.log(chalk.bold(endpoint))
          console.log(chalk.green('Call Api!!!'))
          await makeApiCall(endpoint, { team: teamId, league: LEAGUES[league], season: SEASON  }, league)
          console.log(chalk.green('async happening'))
        }
      } catch (error) {
        throw new Error(`Team Stats failed to fetch: ${error.message}`)
      }

      let teamStats;

      try {
        teamStats = await TeamStats.findOne({ 'team.name': team })
        console.log(chalk.green('data finalized'))
        
      } catch (error) {
        console.error(`some error occurred when fetching team stats from database: ${error}`)
      }

      // console.log(teamStats)
      return teamStats;
    },

    playerStats: async (_, { player, team, league }) => {
      // clearMongoCollection(Player);
      // clearMongoCollection(LastApiCallTimes);

      let endpoint = 'players';

      let teamStanding;
      try {
        teamStanding = await TeamStanding.findOne({ 'team.name': team });
        
      } catch (error) {
        console.error(`An error occurred querying the team standing`)
      }
      let teamId = teamStanding?.team.id;
      let playerToFind;
      try {
        playerToFind = await SquadMember.findOne({ name: player });
      } catch (error) {
        console.error(`An error occurred querying the Player`)
      }
      let playerId = playerToFind?.id;

      try {
        if( await shouldMakeApiCall('weekly', endpoint, player)) {
          console.log(chalk.bold(endpoint))
          console.log(chalk.green('Call Api!!!'))
          await makeApiCall(endpoint, { id: playerId, team: teamId, league: LEAGUES[league], season: SEASON }, league)
          console.log(chalk.green('async happening'))
        }
      } catch (error) {
        throw new Error(`Player failed to fetch: ${error.message}`)
      }

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
      // TODO make logic for clearing the db (fixtures and lastApiCalls (all fixtures)) when a week has passed
      // type = 'last' or type = 'next' and make freq daily
      let endpoint = 'fixtures';
      // teamId
      let teamStanding = await TeamStanding.findOne({ 'team.name': team });
      let teamId = teamStanding?.team.id
      console.log(chalk.yellow(team, ': ', teamId))
      try {
        if( await shouldMakeApiCall('daily', endpoint, `${team}: ${type}`)) {
          console.log(chalk.bold.blue('Endpoint: ', endpoint))
          console.log(chalk.green('Call Api!!!'))
          const fixtureParams = { team: teamId, league: LEAGUES[league], season: SEASON }
          fixtureParams[type] = 1;
          await makeApiCall(endpoint, fixtureParams, league)
          console.log(chalk.green('async happening'))
        }
      } catch (error) {
        throw new Error(`Squad Members failed to fetch: ${error.message}`)
      }

      let finalFixture;

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
        ] })
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
      });
      let lastFixtureId = lastFixture?.fixture.id;
      let fixtureEvents = lastFixture?.events;
      let fixtureLineups = lastFixture?.lineups;
      let fixtureStatistics = lastFixture?.statistics;

      // if the events/lineups/statistics are empty call api.

      // let apiCalls;


      try {
        if(fixtureEvents.length === 0 && fixtureLineups.length === 0 && fixtureStatistics.length === 0) {
          // call api for endpoints events/lineups/statistics
          const fixtureInfoCalls = FIXTURES_ENDPOINTS.map(endpoint => makeApiCall(endpoint, { fixture: lastFixtureId }, `${league}.${lastFixtureId}`));
  
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
      let liveLeagueIds = ''
      leagues.forEach(league => liveLeagueIds += `${LEAGUES[league]}-`);
      liveLeagueIds = liveLeagueIds.split('-');
      liveLeagueIds.pop();
      liveLeagueIds = liveLeagueIds.join('-');
      let endpoint = 'fixtures'

      try {
        if( await shouldMakeApiCall('minute', endpoint, 'live')) {
          console.log(chalk.bold(endpoint))
          console.log(chalk.green('Call Api!!!'))
          await makeApiCall(endpoint, { live: liveLeagueIds })
          console.log(chalk.green('async happening'))
        }
      } catch (error) {
        throw new Error(`Player failed to fetch: ${error.message}`)
      }

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
    }
  }
}

export default resolvers

// sort by statistics.goals.total