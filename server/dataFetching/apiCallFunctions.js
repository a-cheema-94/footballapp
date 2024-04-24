import axios from "axios";
import * as dotenv  from 'dotenv'
import { clearMongoCollection, inputDataInDatabase, manipulateData } from "./handleDatabaseFunctions.js";
import Fixture from "../models/fixtures/FixtureModel.js";
dotenv.config({ path: '../.env' })

const footballApiKey = process.env.FOOTBALL_API_KEY;

export async function makeApiCall(endpoint, params, league = null) {
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
    
  } catch (error) {
    console.error(`Error fetching data from football api: ${error}`)
  }

  // delete live fixtures once all live fixtures are finished for that gameweek across all leagues.
  if(endpoint === 'fixtures' && league === null && apiRes.data.response.length === 0) {
    // clear live fixtures from database
    clearMongoCollection(Fixture, { live: true })
    return;
  }

  const sortedData = manipulateData(apiRes.data.response, endpoint, league);
  try {
    await inputDataInDatabase(sortedData, endpoint)

  } catch (error) {
    console.error(`Error sorting and putting data in database: ${error}`)
  }

}