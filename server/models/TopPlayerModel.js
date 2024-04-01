import mongoose from "mongoose"

const GeneralPlayerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  firstname: String,
  lastname: String,
  age: Number,
  nationality: String,
  height: String,
  weight: String
})

const PlayerStatisticsSchema = new mongoose.Schema({
  team: {
    id: Number,
    name: String
  },
  games: {
    appearances: Number,
    minutes: Number,
    position: String,
    captain: Boolean
  },
  substitutions: {
    in: Number,
    out: Number
  },
  shots: {
    total: Number,
    on: Number
  },
  goals: {
    total: Number,
    conceded: Number,
    assists: Number,
    saves: Number
  },
  passes: {
    total: Number,
    key: Number,
    accuracy: Number
  },
  tackles: {
    total: Number,
    blocks: Number,
    interceptions: Number
  },
  duels: {
    won: Number
  },
  dribbles: {
    attempts: Number,
    success: Number,
    past: Number
  },
  fouls: {
    drawn: Number,
    committed: Number
  },
  cards: {
    yellow: Number,
    red: Number
  },
  penalty: {
    scored: Number,
    missed: Number,
    saved: Number
  },
})

const TopPlayerSchema = new mongoose.Schema({
  league: String,
  general: GeneralPlayerSchema,
  statistics: PlayerStatisticsSchema,
})

const TopPlayer = mongoose.model('Top Player', TopPlayerSchema);
export default TopPlayer