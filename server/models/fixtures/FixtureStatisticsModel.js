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


export default FixtureTeamStatsSchema