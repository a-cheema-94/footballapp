import TopPlayer from '../models/TopPlayerModel.js'

export const resolvers = {
  Query: {
    topScorers: async (_, { league, limit = 20, sortBy }) => {
      try {
        const topScorers = await TopPlayer.find({ league })
          .sort(`-${sortBy}`)
          .limit(limit);
        return topScorers
      } catch (error) {
        throw new Error(`Top Scorers failed to fetch: ${error.message}`)
      }
    } 
  }
}

export default resolvers

// sort by statistics.goals.total