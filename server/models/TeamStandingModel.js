import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  id: Number,
  name: String,
});

const TableStats = new mongoose.Schema({
  played: Number,
  win: Number,
  draw: Number,
  lose: Number,
  goals: {
    for: Number,
    against: Number,
  },
});

const TeamStandingSchema = new mongoose.Schema({
  league: String,
  rank: Number,
  team: TeamSchema,
  points: Number,
  goalsDiff: Number,
  form: String,
  all: TableStats,
  isRelegated: Boolean,
  isChampion: Boolean,
});

const TeamStanding = mongoose.model("Team Standing", TeamStandingSchema);
export default TeamStanding;
