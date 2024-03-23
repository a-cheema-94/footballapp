import { getDataFromDatabase, inputDataInDatabase } from "./handleDatabaseFunctions";
import { makeApiCall } from "./apiCallFunctions";

const apiCallFrequencies = {
  MINUTE: 60 * 1000,
  DAILY: 24 * 60 * 60 * 1000,
  WEEKLY: 7 * 24 * 60 * 60 * 1000,
  YEARLY: 365 * 24 * 60 * 60 * 1000,
}

const lastApiCallTimes = {};

const fetchData = async (freq, endpoint) => {
  const apiFreq = apiCallFrequencies[freq.toUpperCase()];
  const currentTime = Date.now();

  if(!lastApiCallTimes[endpoint] || currentTime - lastApiCallTimes[endpoint] >= apiFreq) {
    // make api call
    const apiRes = await makeApiCall(endpoint);
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
