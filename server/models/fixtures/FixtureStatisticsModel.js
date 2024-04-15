import mongoose from 'mongoose';

const StatSchema = new mongoose.Schema({
  type: String,
  value: Number
})

const FixtureTeamStatsSchema = new mongoose.Schema({
  team: {
    id: Number,
    name: String,
  },
  statistics: [StatSchema]
})

const FixtureStatisticsSchema = new mongoose.Schema({
  home: FixtureTeamStatsSchema,
  away: FixtureTeamStatsSchema
})

export default FixtureStatisticsSchema