import mongoose from 'mongoose';

const EventInfoSchema = new mongoose.Schema({
  id: Number,
  name: String
})

const FixtureEventSchema = new mongoose.Schema({
  time: {
    elapsed: Number,
    extra: Number,
  },
  team: EventInfoSchema,
  player: EventInfoSchema,
  assist: EventInfoSchema,
  type: String,
  detail: String,
  comments: String
})

export default FixtureEventSchema