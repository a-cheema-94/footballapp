import { shouldMakeApiCall } from '../dataFetching/fetchData.js';
import TopPlayer from '../models/TopPlayerModel.js'

// sortBy = goals or assists => specify endpoint based off this
export const resolvers = {
  Query: {
    topPlayers: async (_, { league, limit = 20, sortBy }) => {
      // Check if day has passed since last call to 3rd party API or no call made => 
            // TRUE: make Api call, 
                  // then sort data to match mongoose schema
                  // input data in database i.e. add as new document
      let endpoint = ''
      if(sortBy === 'goals') endpoint = 'players/topscorers'
      if(sortBy === 'assists') endpoint = 'players/topassists'

      if(shouldMakeApiCall('daily', endpoint)) {
        // make api call then format data to match database schema
        // get data from database
      }

      try {
        let sortingInformation = {};
        let category = 'total';
        if (sortBy === 'assists') {
          category = 'assists'
        } 
        sortingInformation[`statistics.goals.${category}`] = -1

        let topPlayers = TopPlayer.find({ league }).sort(sortingInformation).limit(limit);

        const data = await topPlayers.exec();
        return data
      } catch (error) {
        throw new Error(`Top Players failed to fetch: ${error.message}`)
      }
    } 
  }
}

export default resolvers

// sort by statistics.goals.total