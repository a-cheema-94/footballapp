import mongoose from 'mongoose'

const SquadMemberSchema = new mongoose.Schema({
  id: Number,
  name: String,
  age: Number,
  number: Number,
  position: String,
  team: String,
  league: String
})

const SquadMember = mongoose.model('SquadMember', SquadMemberSchema);
export default SquadMember