import * as dotenv  from 'dotenv'
dotenv.config({ path: '../.env' })
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema/schema.js'
import { resolvers } from './resolvers/resolvers.js'
import connectDB from './config/database.js'
import chalk from 'chalk'

// connect to database
connectDB();

// setup graph ql apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// connect to server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(chalk.magenta.bold('graphql server ready at port: ', 4000));