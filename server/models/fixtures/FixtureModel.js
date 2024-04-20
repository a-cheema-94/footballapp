import mongoose from 'mongoose'
import FixtureEventSchema from './FixtureEventModel.js';
import FixtureLineupSchema from './FixtureLineupModel.js';
import FixtureTeamStatsSchema from './FixtureStatisticsModel.js';

const FixtureTeamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  winner: Boolean
})

const FixtureSchema = new mongoose.Schema({
  league: String,
  fixture: {
    id: Number,
    referee: String,
    timestamp: String,
    venue: {
      id: Number,
      name: String,
      city: String
    },
    status: {
      long: String,
      short: String,
      elapsed: Number
    },
  },
  teams: {
    home: FixtureTeamSchema,
    away: FixtureTeamSchema
  },
  goals: {
    home: Number,
    away: Number
  },
  statistics: [FixtureTeamStatsSchema],
  events: [FixtureEventSchema],
  lineups: [FixtureLineupSchema]
});


const Fixture = mongoose.model('Fixture', FixtureSchema);
export default Fixture