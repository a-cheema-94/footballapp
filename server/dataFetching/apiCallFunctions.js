import axios from "axios";
import * as dotenv from "dotenv";
import {
  clearMongoCollection,
  manipulateAndInputData,
} from "./handleDatabaseFunctions.js";
import Fixture from "../models/fixtures/FixtureModel.js";
import chalk from "chalk";
dotenv.config({ path: "../.env" });

const footballApiKey = process.env.FOOTBALL_API_KEY;
const newsApiKey = process.env.NEWS_API_KEY;

// fixtures, { team: teamId, league: leagueId, season: 2024 }, league

// function used for calling live fixtures directly from api
export async function callFootballApi(endpoint , params) {
  const footballApiClient = axios.create();

  let apiRes;

  try {
    apiRes = await footballApiClient.get(
      `https://v3.football.api-sports.io/${endpoint}`,
      {
        params,
        headers: {
          "x-apisports-key": footballApiKey,
        },
      }
    );
    console.log(chalk.bgBlueBright("finished api call from api sports"));
  } catch (error) {
    console.error(`Error fetching data from football api: ${error}`);
  }

  const dataRes = apiRes.data.response;
  return dataRes
}


export async function makeFootballApiCall(endpoint, params, league = null) {
  const footballApiClient = axios.create();

  let apiRes;

  try {
    apiRes = await footballApiClient.get(
      `https://v3.football.api-sports.io/${endpoint}`,
      {
        params,
        headers: {
          "x-apisports-key": footballApiKey,
        },
      }
    );
    console.log(chalk.bgBlueBright("finished api call from api sports"));
  } catch (error) {
    console.error(`Error fetching data from football api: ${error}`);
  }

  const dataRes = apiRes.data.response;

  
  if(endpoint === 'fixtures' && Array.isArray(dataRes) && dataRes.length === 0) {
    console.log('triggered')
      await clearMongoCollection(Fixture, { live: true })
  }
  try {
    await manipulateAndInputData(dataRes, endpoint, league);
  } catch (error) {
    console.error(`Error sorting and putting data in database: ${error}`);
  }
    
}

export async function makeNewsApiCall() {
  const newsApiClient = axios.create();
  let newsApiRes;
  try {
    newsApiRes = await newsApiClient.get(
      `https://newsapi.org/v2/top-headlines?sources=four-four-two`,
      {
        headers: {
          "X-Api-Key": newsApiKey,
        },
      }
    );
    console.log(chalk.bgGreenBright(newsApiRes.data.totalResults));
  } catch (error) {
    console.error(`Error fetching news articles.`);
  }

  try {
    await manipulateAndInputData(newsApiRes.data.articles, "news");
  } catch (error) {
    console.error(`Error sorting and putting data in database: ${error}`);
  }
}
