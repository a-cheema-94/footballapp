import chalk from "chalk";
import { shouldMakeApiCall } from "../dataFetching/shouldMakeApiCall.js";
import { makeFootballApiCall } from "../dataFetching/apiCallFunctions.js";
import TeamStanding from "../models/TeamStandingModel.js";
import Player from "../models/TopPlayerModel.js";
import SquadMember from "../models/SquadMemberModel.js";
import { LEAGUES } from "../fixedData/fixedData.js";

// NOTE: collection parameter is purely for console purposes NOT any functionality.
export const makeInitialQuery = async (
  apiCallFrequency,
  endpoint,
  apiCallCategory, // This variable sets the fields inside the LastApiCallTimes documents when created.
  queryParams,
  collection,
  league = null
) => {
  try {
    if (await shouldMakeApiCall(apiCallFrequency, endpoint, apiCallCategory)) {
      console.log(chalk.bold(endpoint));
      console.log(chalk.green("Call Api!!"));
      await makeFootballApiCall(endpoint, queryParams, league);
      console.log("Api Called");
    } else {
      console.log(
        chalk.bold.blueBright(
          `Data is cached and not expired, continue with database query of ${collection}`
        )
      );
    }
  } catch (error) {
    throw new Error(`${collection} failed to fetch: ${error.message}`);
  }
};

export const getTeamOrPlayerId = async (mongooseModel, query) => {
  // mongooseModel is either TeamStanding or Player.
  let model = mongooseModel === TeamStanding ? "Team Standing" : "Player";
  let result;
  try {
    result = await mongooseModel.findOne(query);
  } catch (error) {
    console.error(`An error occured querying the ${model}: ${error}`);
  }

  return model === "Team Standing" ? result?.team.id : result?.id;
};

export const squadMemberAggregateSearch = async (searchQuery, matchFields) => {
  let searchResults;
  try {
    searchResults = await SquadMember.aggregate([
      {
        $search: {
          index: "playerSearch",
          compound: {
            must: [
              {
                text: {
                  query: searchQuery,
                  // use array to limit to three fields and explicitly state each nested field
                  path: ["name"],
                  fuzzy: {
                    maxEdits: 1,
                  },
                },
              },
            ],

            filter: [...matchFields],
          },
        },
      },
      {
        $limit: 10,
      },
    ]);

    console.log(searchResults);
    return searchResults;
  } catch (error) {
    console.error(`Error when searching the database documents: ${error}`);
  }
};

export const getLiveLeagueIds = (leagues) => {
  // need to have ids in this form when calling api: '1-2-3-4'
  let liveLeagueIds = "";
  leagues.forEach((league) => (liveLeagueIds += `${LEAGUES[league]}-`));
  liveLeagueIds = liveLeagueIds.split("-");
  liveLeagueIds.pop(); // get rid of last '-'
  liveLeagueIds = liveLeagueIds.join("-");
  return liveLeagueIds;
};
