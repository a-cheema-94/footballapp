import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  player: {
    id: Number,
    name: String,
    number: Number,
    pos: String,
    grid: String
  }
})

const PlayerColorsSchema = new mongoose.Schema({
  primary: String,
  number: String,
  border: String
})

const FixtureLineupSchema = new mongoose.Schema({
  team: {
    id: Number,
    name: String,
    colors: {
      player: PlayerColorsSchema,
      goalkeeper: PlayerColorsSchema
    },
    coach: {
      id: Number,
      name: String
    },
    formation: String,
    startXI: [PlayerSchema],
    substitutions: [PlayerSchema]
  }
})

export default FixtureLineupSchema