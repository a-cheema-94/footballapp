import chalk from "chalk"
import { shouldMakeApiCall } from "../dataFetching/shouldMakeApiCall.js"
import { makeFootballApiCall } from "../dataFetching/apiCallFunctions.js";

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

// top Players:
// try {
      //   if( await shouldMakeApiCall('daily', endpoint, league)) {
      //     console.log(chalk.bold(endpoint))
      //     console.log(chalk.green('Call Api!!!'))
      //     await makeFootballApiCall(endpoint, { league: LEAGUES[league], season: SEASON }, league)
      //     console.log(chalk.green('async happening'))
      //   }
      // } catch (error) {
      //   throw new Error(`Top Players failed to fetch: ${error.message}`)
      // }

// league standings

      // try {
      //   if( await shouldMakeApiCall('daily', endpoint, league)) {
      //     console.log(chalk.bold(endpoint))
      //     console.log(chalk.green('Call Api!!!'))
      //     await makeFootballApiCall(endpoint, { league: LEAGUES[league], season: SEASON }, league)
      //     console.log(chalk.green('async happening'))
      //   }
      // } catch (error) {
      //   throw new Error(`Team Standings failed to fetch: ${error.message}`)
      // }

// player squads


      // try {
      //   if( await shouldMakeApiCall('weekly', endpoint, team)) {
      //     console.log(chalk.bold(endpoint))
      //     console.log(chalk.green('Call Api!!!'))
      //     await makeFootballApiCall(endpoint, { team: teamId }, league)
      //     console.log(chalk.green('async happening'))
      //   }
      // } catch (error) {
      //   throw new Error(`Squad Members failed to fetch: ${error.message}`)
      // }

// teamStats: 


      // try {
      //   if( await shouldMakeApiCall('weekly', endpoint, team)) {
      //     console.log(chalk.bold(endpoint))
      //     console.log(chalk.green('Call Api!!!'))
      //     await makeFootballApiCall(endpoint, { team: teamId, league: LEAGUES[league], season: SEASON  }, league)
      //     console.log(chalk.green('async happening'))
      //   }
      // } catch (error) {
      //   throw new Error(`Team Stats failed to fetch: ${error.message}`)
      // }

// player stats:

// try {
//     if( await shouldMakeApiCall('weekly', endpoint, player)) {
//       console.log(chalk.bold(endpoint))
//       console.log(chalk.green('Call Api!!!'))
//       await makeFootballApiCall(endpoint, { id: playerId, team: teamId, league: LEAGUES[league], season: SEASON }, league)
//       console.log(chalk.green('async happening'))
//     }
//   } catch (error) {
//     throw new Error(`Player failed to fetch: ${error.message}`)
//   }

// get last or next fixtures:


      // try {
      //   if( await shouldMakeApiCall('daily', endpoint, `${team}: ${type}`)) {
      //     console.log(chalk.bold.blue('Endpoint: ', endpoint))
      //     console.log(chalk.green('Call Api!!!'))
      //     await makeFootballApiCall(endpoint, fixtureParams, league)
      //     console.log(chalk.green('async happening'))
      //   }
      // } catch (error) {
      //   throw new Error(`Squad Members failed to fetch: ${error.message}`)
      // }
