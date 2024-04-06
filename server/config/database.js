import mongoose from 'mongoose'
import chalk from 'chalk'

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI)

  console.log(chalk.cyanBright.bold(`MongoDB connection established: ${connection.connection.host}`));
}

export default connectDB;