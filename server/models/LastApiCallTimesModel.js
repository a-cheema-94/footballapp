import mongoose from "mongoose";

const LastApiCallTimesSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    require: true
  },
  league: {
    type: String,
    require: true
  },
  freq: {
    minute: Number,
    daily: Number,
    weekly: Number,
    yearly: Number
  }
})

const LastApiCallTimes = mongoose.model('Last Api Call Times', LastApiCallTimesSchema);
export default LastApiCallTimes