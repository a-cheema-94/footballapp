import axios from "axios";
import * as dotenv  from 'dotenv'
import { inputDataInDatabase, manipulateData } from "./handleDatabaseFunctions.js";
dotenv.config({ path: '../.env' })

const footballApiKey = process.env.FOOTBALL_API_KEY;

export async function makeApiCall(endpoint, params, league) {
  // console.log(endpoint)
  // console.log(params)
  const footballApiClient = axios.create(); // create axios instance
  footballApiClient.interceptors.request.use(options => {
    const headers = options.headers;
    const neededHeaders = ["x-apisports-key"];
    
    // remove unnecessary headers
    for(let header in headers) {
      if(!neededHeaders.includes(header)) {
        delete headers[header]
      }
    }

    return options;
  })

  let apiRes;

  try {
    apiRes = await footballApiClient.get(`https://v3.football.api-sports.io/${endpoint}`, {
      params,
      headers: {
        "x-apisports-key": footballApiKey
      }
    })
    // console.log(apiRes.data.response)
    
  } catch (error) {
    console.error(`Error fetching data from football api: ${error}`)
  }

  const sortedData = manipulateData(apiRes.data.response, endpoint, league);
  console.log('-------------')
  console.log(sortedData)
  try {
    await inputDataInDatabase(sortedData, endpoint)

  } catch (error) {
    console.error(`Error sorting and putting data in database: ${error}`)
  }

}



// url = "https://v3.football.api-sports.io/"

const params = {
  league: 39,
  season: 2023
}

// makeApiCall('players/topscorers', params, 'Premier League')