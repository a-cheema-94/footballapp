import LastApiCallTimes from "../models/LastApiCallTimesModel.js";

const apiCallFrequencies = {
  MINUTE: 60 * 1000,
  DAILY: 24 * 60 * 60 * 1000,
  WEEKLY: 7 * 24 * 60 * 60 * 1000,
  YEARLY: 365 * 24 * 60 * 60 * 1000,
}

export const shouldMakeApiCall = async (freq, endpoint, league) => {
  const apiFreq = apiCallFrequencies[freq.toUpperCase()];
  const currentTime = Date.now();

  // cache freq for an endpoint
  // initialize lastApiCallTimes[endpoint] prop
  let lastApiCallTimes;
  let cachedFreq;
  try {
    lastApiCallTimes = await LastApiCallTimes.findOne({ endpoint, league });
    
  } catch (error) {
    console.error('An error occurred getting lastApiCallTimes: ', error);
    return true
  }
  
  console.log(freq)
  cachedFreq = lastApiCallTimes?.freq[freq];
  if(cachedFreq && currentTime - cachedFreq < apiFreq) {
    console.log('call time is cached and NOT expired')
    return false
  }

  // now api call time is not cached or expired.

  try {
    if(!lastApiCallTimes) {
      lastApiCallTimes = new LastApiCallTimes({
        endpoint,
        league,
        freq: {}
      })
    }
    lastApiCallTimes.freq[freq] = currentTime;
    await lastApiCallTimes.save()
    
  } catch (error) {
    console.error(`An error occurred when saving latest call time to database: ${error}`)
  }
  console.log('call time is not cached and expired')

  return true;
}

// milliseconds since Date.now() is in milliseconds
// TODO => fixture frequency special case => 