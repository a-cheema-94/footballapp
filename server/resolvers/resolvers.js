import { makeApiCall } from '../dataFetching/apiCallFunctions.js';
import { shouldMakeApiCall } from '../dataFetching/fetchData.js';
import { clearMongoCollection } from '../dataFetching/handleDatabaseFunctions.js';
import { LEAGUES, SEASON } from '../fixedData/fixedData.js';
import LastApiCallTimes from '../models/LastApiCallTimesModel.js';
import SquadMember from '../models/SquadMemberModel.js';
import TeamStanding from '../models/TeamStandingModel.js';
import TeamStats from '../models/TeamStatsModel.js';
import Player from '../models/TopPlayerModel.js';
import chalk from 'chalk'

// sortBy = goals or assists => specify endpoint based off this
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
        
        console.log(chalk.green('data finalised'))
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
    }
  }
}

export default resolvers

// sort by statistics.goals.total