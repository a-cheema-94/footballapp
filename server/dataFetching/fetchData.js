import { getDataFromDatabase, inputDataInDatabase } from "./handleDatabaseFunctions";
import { makeApiCall } from "./apiCallFunctions";

const apiCallFrequencies = {
  MINUTE: 60 * 1000,
  DAILY: 24 * 60 * 60 * 1000,
  WEEKLY: 7 * 24 * 60 * 60 * 1000,
  YEARLY: 365 * 24 * 60 * 60 * 1000,
}

const lastApiCallTimes = {};

export const shouldMakeApiCall = (freq, endpoint) => {
  const apiFreq = apiCallFrequencies[freq.toUpperCase()];
  const currentTime = Date.now();

  // cache freq for an endpoint
  // initialize lastApiCallTimes[endpoint] prop
  lastApiCallTimes[endpoint] = lastApiCallTimes[endpoint] || {};
  const cachedFreq = lastApiCallTimes[endpoint][freq];

  if(cachedFreq && currentTime - cachedFreq < apiFreq) {
    return false
  }

  lastApiCallTimes[endpoint][freq] = currentTime;
  return true;

}
// reminder: in resolver change 'freq' based on query

const fetchData = async (freq, endpoint, params) => {
  const apiFreq = apiCallFrequencies[freq.toUpperCase()];
  const currentTime = Date.now();

  // no call or the specified time has passed since last call
  if(!lastApiCallTimes[endpoint] || currentTime - lastApiCallTimes[endpoint] >= apiFreq) {
    // make api call
    const apiRes = await makeApiCall(endpoint, params);
    // update last call time
    lastApiCallTimes[endpoint] = currentTime;
    // put data in database
    inputDataInDatabase(apiRes, endpoint);
    // return api response
    return apiRes;
  }

  const footballData = getDataFromDatabase(endpoint)
  
  return footballData

}

// milliseconds since Date.now() is in milliseconds
// fixture frequency special case => TODO


