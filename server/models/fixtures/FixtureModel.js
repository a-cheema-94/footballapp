import mongoose from 'mongoose'
import FixtureEventSchema from './FixtureEventModel.js';
import FixtureLineupSchema from './FixtureLineupModel.js';
import FixtureTeamStatsSchema from './FixtureStatisticsModel.js';
import { apiCallFrequencies } from '../../dataFetching/fetchData.js';

const FixtureTeamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  winner: Boolean
})

const FixtureSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  live: {
    type: Boolean,
    default: false
  },
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

Fixture.index({ createdAt: 1 }, { expireAfterMilliseconds: apiCallFrequencies.WEEKLY })
// this will ensure the Fixture collection will not be cluttered and will be cleared after a week.

const Fixture = mongoose.model('Fixture', FixtureSchema);
export default Fixture