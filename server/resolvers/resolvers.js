import TopPlayer from '../models/TopPlayerModel.js'

// based on sortBy value will this output top scorers or top assists by changing values like endpoint to either players/topscorers or players/topassists.
// sortBy = goals or assists
export const resolvers = {
  Query: {
    topPlayers: async (_, { league, limit = 20, sortBy }) => {
      // Check if day has passed since last call to 3rd party API or no call made => 
            // TRUE: make Api call, 
                  // then sort data to match mongoose schema
                  // input data in database i.e. add as new document
                  // then continue with below
            // FALSE: continue with below

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