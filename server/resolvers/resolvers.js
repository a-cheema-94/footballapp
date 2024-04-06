import { makeApiCall } from '../dataFetching/apiCallFunctions.js';
import { shouldMakeApiCall } from '../dataFetching/fetchData.js';
import { clearMongoCollection } from '../dataFetching/handleDatabaseFunctions.js';
import { LEAGUES, SEASON } from '../fixedData/fixedData.js';
import LastApiCallTimes from '../models/LastApiCallTimesModel.js';
import TopPlayer from '../models/TopPlayerModel.js'

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
          console.log(endpoint)
          console.log('Call Api!!!')
          await makeApiCall(endpoint, { league: LEAGUES[league], season: SEASON }, league)
          console.log('async happening')
        }
      } catch (error) {
        throw new Error(`Top Players failed to fetch: ${error.message}`)
      }
      console.log('start of rest')
      let sortingInformation = {};
      let category = 'total';
      if (sortBy === 'assists') {
        category = 'assists'
      } 
      sortingInformation[`statistics.goals.${category}`] = -1
      let topPlayers;
      try {
        
        topPlayers = await TopPlayer.find({ league }).sort(sortingInformation).limit(limit).exec();
        
        console.log('finding player')
        console.log('data finalised')
        console.log(topPlayers.length)
      } catch (error) {
        console.error(`some error occurred when fetching players from database: ${error}`)
      }
      return topPlayers
    } 
  }
}

export default resolvers

// sort by statistics.goals.total