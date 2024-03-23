import mongoose from 'mongoose'

const connectDB = async () => {
  console.log(typeof process.env.RANDOM)
  const connection = await mongoose.connect(process.env.MONGO_URI)

  console.log(`MongoDB connection established: ${connection.connection.host}`);
}

export default connectDB;