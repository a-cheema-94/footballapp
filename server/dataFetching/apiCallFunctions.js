import axios from "axios";
import * as dotenv  from 'dotenv'
import { clearMongoCollection, manipulateAndInputData } from "./handleDatabaseFunctions.js";
import Fixture from "../models/fixtures/FixtureModel.js";
import chalk from "chalk";
dotenv.config({ path: '../.env' })

const footballApiKey = process.env.FOOTBALL_API_KEY;
const newsApiKey = process.env.NEWS_API_KEY;


export async function makeFootballApiCall(endpoint, params, league = null) {
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

  try {
    await manipulateAndInputData(apiRes.data.response, endpoint, league)
  } catch (error) {
    console.error(`Error sorting and putting data in database: ${error}`)
  }

}

export async function makeNewsApiCall(query = null) {
  const newsApiClient = axios.create();
  let newsApiRes;
  try {
    newsApiRes = await newsApiClient.get(`https://newsapi.org/v2/top-headlines?sources=four-four-two`, { 
      headers: {
        "X-Api-Key": newsApiKey
      }
     })
     console.log(chalk.bgGreenBright(newsApiRes.data.totalResults))
  } catch (error) {
    console.error(`Error fetching news articles.`)
  }

  try {
    await manipulateAndInputData(newsApiRes.data.articles, 'news')

  } catch (error) {
    console.error(`Error sorting and putting data in database: ${error}`)
  }
}