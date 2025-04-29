import { PROPS_TO_FILTER } from "../fixedData/fixedData.js";
import News from "../models/NewsModel.js";
import SquadMember from "../models/SquadMemberModel.js";
import TeamStanding from "../models/TeamStandingModel.js";
import TeamStats from "../models/TeamStatsModel.js";
import Player from "../models/TopPlayerModel.js";
import Fixture from "../models/fixtures/FixtureModel.js";
import { filterObj } from "../utils/filterData.js";
import chalk from "chalk";

const IN_PLAY_STATUS_CODES = ["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"];

export async function manipulateAndInputData(data, endpoint, league = null) {
  let final;
  // todo => handle no data case.
  if(Array.isArray(data) && data.length === 0) return final
  switch (endpoint) {
    case "players/topscorers":
    case "players/topassists":
      final = data.map((player) => {
        const { player: general, statistics } = player;

        const updatedPlayer = {
          league,
          general: filterObj(general, PROPS_TO_FILTER.topPlayers.general),
          statistics: filterObj(
            statistics[0],
            PROPS_TO_FILTER.topPlayers.statistics
          ),
        };
        return updatedPlayer;
      });
      try {
        await inputDataInDatabase(final, Player, "general");
      } catch (error) {
        console.error(
          "An error occurred putting data in database: ",
          error,
          " for endpoint: ",
          endpoint
        );
      }
      break;
    case "standings":
      let newData = data[0].league.standings[0];
      final = newData.map((teamInfo) => {
        const updatedStanding = {
          league,
          ...filterObj(teamInfo, PROPS_TO_FILTER.standings),
        };
        return updatedStanding;
      });
      try {
        await inputDataInDatabase(final, TeamStanding, "team");
      } catch (error) {
        console.error(
          "An error occurred putting data in database: ",
          error,
          " for endpoint: ",
          endpoint
        );
      }
      break;
    case "players/squads":
      let playerRoster = data[0].players;
      let team = data[0].team.name;
      final = playerRoster.map((player) => {
        const updatedPlayer = {
          league,
          team,
          ...filterObj(player, PROPS_TO_FILTER.squads),
        };
        return updatedPlayer;
      });
      try {
        await inputDataInDatabase(final, SquadMember);
      } catch (error) {
        console.error(
          "An error occurred putting data in database: ",
          error,
          " for endpoint: ",
          endpoint
        );
      }
      break;
    case "teams/statistics":
      let newLineups = data.lineups[0];
      final = {
        league,
        ...filterObj(data, PROPS_TO_FILTER.teamStats),
        lineups: newLineups,
      };
      try {
        await inputDataInDatabase(final, TeamStats, "team");
      } catch (error) {
        console.error(
          "An error occurred putting data in database: ",
          error,
          " for endpoint: ",
          endpoint
        );
      }
      break;
    case "players":
      let player = data[0];
      if (!player) console.log(chalk.bgRed("No player found!!"));
      const { player: general, statistics } = player;

      final = {
        league,
        general: filterObj(general, PROPS_TO_FILTER.topPlayers.general),
        statistics: filterObj(
          statistics[0],
          PROPS_TO_FILTER.topPlayers.statistics
        ),
      };
      try {
        await inputDataInDatabase(final, Player, "general");
      } catch (error) {
        console.error(
          "An error occurred putting data in database: ",
          error,
          " for endpoint: ",
          endpoint
        );
      }
      break;

    // NO live field. Need a better way to tell if fixture is live or not since there could be only one current live match and the below approach doesn't account for this.
    // todo => design a system that handles all cases of live fixtures => when there is only one live fixture and there are no fixtures to display.
    // ? use 


    case "fixtures":

        let live = false;
        let events = [];
        final = data.map((fixture) => {
          if(IN_PLAY_STATUS_CODES.includes(fixture.fixture.status.short)) live = true

          const {
            league: { name },
          } = fixture;

          if(fixture.events) events = fixture.events
          const updatedFixture = {
            live,
            league: name,
            ...filterObj(fixture, PROPS_TO_FILTER.fixtures.fixture),
            events,
            statistics: [],
            lineups: [],
          };
          console.log(updatedFixture)
          return updatedFixture;
        });

      try {
        await inputDataInDatabase(final, Fixture, "fixture");
      } catch (error) {
        console.error(
          "An error occurred putting data in database: ",
          error,
          " for endpoint: ",
          endpoint
        );
      }
      break;


    case "fixtures/events":
      final = data.map((event) =>
        filterObj(event, PROPS_TO_FILTER.fixtures.events)
      );
      try {
        await inputFixtureInfo(endpoint, league, final);
      } catch (error) {
        console.error(
          "An error occurred putting data in database: ",
          error,
          " for endpoint: ",
          endpoint
        );
      }
      break;
    case "fixtures/lineups":
      final = data.map(({ team, coach, ...rest }) => ({
        team: filterObj(team, PROPS_TO_FILTER.fixtures.lineups),
        coach: filterObj(coach, PROPS_TO_FILTER.fixtures.lineups),
        ...rest,
      }));
      try {
        await inputFixtureInfo(endpoint, league, final);
      } catch (error) {
        console.error(
          "An error occurred putting data in database: ",
          error,
          " for endpoint: ",
          endpoint
        );
      }
      break;
    case "fixtures/statistics":
      final = data.map(({ team, statistics }) => ({
        team: filterObj(team, PROPS_TO_FILTER.fixtures.statistics),
        statistics: statistics.map(({ type, value }) => ({
          type,
          value: !value ? null : value.toString(),
        })),
      }));
      try {
        await inputFixtureInfo(endpoint, league, final);
      } catch (error) {
        console.error(
          "An error occurred putting data in database: ",
          error,
          " for endpoint: ",
          endpoint
        );
      }
      break;
    case "news":
      try {
        for (let article of data) {
          await News.findOneAndUpdate({ title: article.title }, article, {
            upsert: true,
          });
          // { upsert: true } => either updates an existing document that matches the query or inserts a new one if no matching document to the query is found.
          // todo => may need to implement bulk writes here.
        }

        console.log(chalk.bgGreen("news articles now in database"));
      } catch (error) {
        console.error("Error: unable to insert data: ", error);
      }

      break;
  }

  console.log(
    chalk.bgGreen.bold.black("data for ", endpoint, " now in database")
  );
  // console.log("FINAL!!!: ", final)
  return final;
}

// inputting into database functions.

const sortQueryParam = (queryParam, data) => {
  let query = {};
  if (!queryParam) {
    query.id = data.id;
  } else {
    query[queryParam + ".id"] = data[queryParam].id;
  }
  return query;
};

// bulk write => can execute db operations in parallel from an array of queries.

async function inputDataInDatabase(data, Model, queryParam = null) {
  // sort out query param into right query => have to do this for every data entry.

  if (Array.isArray(data)) {
    const bulkWriteOperations = data.map((item) => {
      const query = sortQueryParam(queryParam, item);

      return {
        updateOne: {
          filter: query,
          update: item,
          upsert: true,
        },
      };
    });

    try {
      await Model.bulkWrite(bulkWriteOperations);
    } catch (error) {
      console.error(
        "Error in updating and inserting array of data in database"
      );
    }
  } else {
    const query = sortQueryParam(queryParam, data);
    try {
      await Model.findOneAndUpdate(query, data, { upsert: true });
    } catch (error) {
      console.error(
        "Error in updating and inserting single data object in database"
      );
    }
  }
}

async function inputFixtureInfo(endpoint, league, data) {
  let fixtureId = league.split(".")[1];
  const endpointCategory = endpoint.split("/")[1];
  const dataToEditFixtures = {};
  dataToEditFixtures[endpointCategory] = data;
  try {
    await Fixture.findOneAndUpdate(
      { "fixture.id": fixtureId },
      { $set: dataToEditFixtures }
    );
  } catch (error) {
    console.error("Error: Unable to update fixture events: ", error);
  }
}

// delete collections function
export async function clearMongoCollection(mongoModel, deleteParams = {}) {
  try {
    const output = await mongoModel.deleteMany(deleteParams);
    console.log(chalk.bgGreen("successfully cleared collection", mongoModel));
  } catch (error) {
    console.error("unable to clear collection: ", error);
  }
}
