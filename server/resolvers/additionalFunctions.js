import chalk from "chalk"
import { shouldMakeApiCall } from "../dataFetching/shouldMakeApiCall.js"
import { makeFootballApiCall } from "../dataFetching/apiCallFunctions.js";
import TeamStanding from "../models/TeamStandingModel.js";

export const makeInitialQuery  = async (apiCallFrequency, endpoint, apiCallCategory, queryParams, collection, league = null) => {
  try {
    if(await shouldMakeApiCall(apiCallFrequency, endpoint, apiCallCategory)) {
      console.log(chalk.bold(endpoint));
      console.log(chalk.green('Call Api!!'))
      await makeFootballApiCall(endpoint, queryParams, league);
      console.log('Api Called')
    }
  } catch (error) {
    throw new Error(`${collection} failed to fetch: ${error.message}`)
  }
}

export const getTeamOrPlayerId = async (mongooseModel, query) => {
  let model = mongooseModel === TeamStanding ? 'Team Standing' : 'Player'
  let result;
  try {
      result = await mongooseModel.findOne(query);
  } catch (error) {
      console.error(`An error occured querying the ${model}: ${error}`)
  }
  
  return model === 'Team Standing' ? result?.team.id : result?.id
}