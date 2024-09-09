import LastApiCallTimes from "../models/LastApiCallTimesModel.js";
import chalk from 'chalk'

export const apiCallFrequencies = {
  MINUTE: 60 * 1000,
  DAILY: 24 * 60 * 60 * 1000,
  WEEKLY: 7 * 24 * 60 * 60 * 1000,
  YEARLY: 365 * 24 * 60 * 60 * 1000,
}

// api call frequency => how often should the endpoint update.
// parameter => additional identifier when needing to access the document.
// e.g. freq = daily, endpoint = players/topscorers, parameter = Premier League => here we are querying whether we need to update the top scorers in the premier league endpoint.

export const shouldMakeApiCall = async (freq, endpoint, parameter) => {
  const apiFreq = apiCallFrequencies[freq.toUpperCase()];
  const currentTime = Date.now();

  // cache freq for an endpoint
  // initialize lastApiCallTimes[endpoint] prop
  let lastApiCallTimes;
  let cachedFreq;
  try {
    lastApiCallTimes = await LastApiCallTimes.findOne({ endpoint, parameter });
    
  } catch (error) {
    console.error('An error occurred getting lastApiCallTimes: ', error);
    return true
  }
  
  console.log(chalk.black.bgYellow(freq, endpoint, parameter))
  cachedFreq = lastApiCallTimes?.freq[freq.toLowerCase()];

  // todo: to delete
  console.log(chalk.bold.bgRed('loooook BELOW'))
  console.log("current Time: ", currentTime)
  console.log("cached time: ", cachedFreq)
  console.log("api frequency: ", apiFreq)
  console.log(chalk.bold.bgRed('loooook ABOVE'))

  if(cachedFreq && ((currentTime - cachedFreq) < apiFreq)) {
    console.log(chalk.bgMagenta('call time is cached and NOT expired'))
    return false
  }

  // now api call time is not cached or expired.

  try {
    // creating a completely new document
    if(!lastApiCallTimes) {
      lastApiCallTimes = new LastApiCallTimes({
        endpoint,
        parameter,
        freq: {}
      })
    }
    // assigning the updated time to the frequency of the document.
    lastApiCallTimes.freq[freq] = currentTime;
    // will replace old document with new one with the current saved freq.
    await lastApiCallTimes.save()
    
  } catch (error) {
    console.error(`An error occurred when saving latest call time to database: ${error}`)
  }
  console.log(chalk.black.bold.bgGreen('call time is not cached and expired'))

  return true;
}