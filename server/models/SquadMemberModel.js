import mongoose from 'mongoose'

const SquadMemberSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: Number,
  position: String,
  team: String
})

const SquadMember = mongoose.Model('SquadMember', SquadMemberSchema);
export default SquadMember