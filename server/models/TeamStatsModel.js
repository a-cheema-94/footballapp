import mongoose from 'mongoose'

const TeamStatsFixturesSchema = new mongoose.Schema({
  played: {
    total: Number
  },
  wins: {
    total: Number
  },
  draws: {
    total: Number
  },
  loses: {
    total: Number
  },
})

const TeamStatsGoalsSchema = new mongoose.Schema({
  for: {
    total: {
      total: Number
    },
    average: {
      total: String
    }
  },
  against: {
    total: {
      total: Number
    },
    average: {
      total: String
    }
  }
})

const TeamStatsBiggestSchema = new mongoose.Schema({
  streak: {
    wins: Number,
    draws: Number,
    loses: Number,
  },
  wins: {
    home: String,
    away: String,
  },
  loses: {
    home: String,
    away: String
  }
})

const TeamStatsPenaltySchema = new mongoose.Schema({
  scored: {
    total: Number,
    percentage: String
  },
  missed: {
    total: Number,
    percentage: String
  },
  total: Number
})

const TeamSchema = new mongoose.Schema({
  id: Number,
  name: String
})

const TeamStatsSchema = new mongoose.Schema({
  league: String,
  team: TeamSchema,
  form: String,
  fixtures: TeamStatsFixturesSchema,
  goals: TeamStatsGoalsSchema,
  biggest: TeamStatsBiggestSchema,
  clean_sheet: {
    home: Number,
    away: Number,
    total: Number
  },
  penalty: TeamStatsPenaltySchema,
  lineups: {
    formation: String,
    played: Number
  }
})

const TeamStats = mongoose.model('Team Stats', TeamStatsSchema)
export default TeamStats