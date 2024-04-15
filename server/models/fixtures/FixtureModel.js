import mongoose from 'mongoose'
import FixtureStatisticsSchema from './FixtureStatisticsModel';
import FixtureEventSchema from './FixtureEventModel';
import FixtureLineupSchema from './FixtureLineupModel';

const FixtureTeamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  winner: Boolean
})

const FixtureSchema = new mongoose.Schema({
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
  statistics: FixtureStatisticsSchema,
  events: [FixtureEventSchema],
  lineups: {
    home: FixtureLineupSchema,
    away: FixtureLineupSchema
  }
});


const Fixture = mongoose.model('Fixture', FixtureSchema);
export default Fixture