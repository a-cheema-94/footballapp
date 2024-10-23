import { PROPS_TO_FILTER } from "../fixedData/fixedData.js";
import News from "../models/NewsModel.js";
import SquadMember from "../models/SquadMemberModel.js";
import TeamStanding from "../models/TeamStandingModel.js";
import TeamStats from "../models/TeamStatsModel.js";
import Player from "../models/TopPlayerModel.js";
import Fixture from "../models/fixtures/FixtureModel.js";
import { filterObj } from "../utils/filterData.js";
import chalk from 'chalk'

export async function manipulateAndInputData(data, endpoint, league = null) {
  let final;

  switch(endpoint) {
    case 'players/topscorers':
    case 'players/topassists':
      final = data.map(player => {
        const { player: general, statistics } = player;
        
        const updatedPlayer = { league, general: filterObj(general, PROPS_TO_FILTER.topPlayers.general), statistics: filterObj(statistics[0], PROPS_TO_FILTER.topPlayers.statistics) };
        return updatedPlayer;
      })
      try {
        await inputDataInDatabase(final, Player, 'general')
      } catch (error) {
        console.error("An error occurred putting data in database: ", error, " for endpoint: ", endpoint);
      }
      break
    case 'standings':
      let newData = data[0].league.standings[0];
      final = newData.map(teamInfo => {
        const updatedStanding = { league, ...filterObj(teamInfo, PROPS_TO_FILTER.standings) };
        return updatedStanding
      })
      try {
        await inputDataInDatabase(final, TeamStanding, 'team')
      } catch (error) {
        console.error("An error occurred putting data in database: ", error, " for endpoint: ", endpoint);
      }
      break
    case 'players/squads':
      let playerRoster = data[0].players;
      let team = data[0].team.name
      final = playerRoster.map(player => {
        const updatedPlayer = { league, team, ...filterObj(player, PROPS_TO_FILTER.squads) };
        return updatedPlayer
      })
      try {
        await inputDataInDatabase(final, SquadMember)
      } catch (error) {
        console.error("An error occurred putting data in database: ", error, " for endpoint: ", endpoint);
      }
      break
    case 'teams/statistics':
      let newLineups = data.lineups[0];
      final = { league, ...filterObj(data, PROPS_TO_FILTER.teamStats), lineups: newLineups }
      try {
        await inputDataInDatabase(final, TeamStats, 'team')
      } catch (error) {
        console.error("An error occurred putting data in database: ", error, " for endpoint: ", endpoint);
      }
      break
    case 'players':
      let player = data[0];
      if(!player) console.log(chalk.bgRed("No player found!!"))
      const { player: general, statistics } = player;

      final = { league, general: filterObj(general, PROPS_TO_FILTER.topPlayers.general), statistics: filterObj(statistics[0], PROPS_TO_FILTER.topPlayers.statistics) };
      console.log(final)
      try {
        await inputDataInDatabase(final, Player, 'general')
      } catch (error) {
        console.error("An error occurred putting data in database: ", error, " for endpoint: ", endpoint);
      }
      break
    case 'fixtures':
      if(data.length > 1) {
        final = data.map(liveFixture => {
          const { league: { name }, events } = liveFixture;
          delete liveFixture.events; // needed for the filterObj, moving events since that is how model is created.
          const updatedLiveFixture = { live: true, league: name, ...filterObj(liveFixture, PROPS_TO_FILTER.fixtures.fixture), events, statistics: [], lineups: [] };
          return updatedLiveFixture
        });
      } else {
        let fixture = data[0];
        final = { league, ...filterObj(fixture, PROPS_TO_FILTER.fixtures.fixture), statistics: [], events: [], lineups: [] };
      }
      try {
        await inputDataInDatabase(final, Fixture, 'fixture')
      } catch (error) {
        console.error("An error occurred putting data in database: ", error, " for endpoint: ", endpoint);
      }
      break
      
    case 'fixtures/events':
      final = data.map(event => filterObj(event, PROPS_TO_FILTER.fixtures.events));
      try {
        await inputFixtureInfo(endpoint, league, final)
      } catch (error) {
        console.error("An error occurred putting data in database: ", error, " for endpoint: ", endpoint)
      }
      break
    case 'fixtures/lineups':
      final = data.map(({ team, coach, ...rest }) => ({
        team: filterObj(team, PROPS_TO_FILTER.fixtures.lineups),
        coach: filterObj(coach, PROPS_TO_FILTER.fixtures.lineups),
        ...rest
      }))
      try {
        await inputFixtureInfo(endpoint, league, final)
      } catch (error) {
        console.error("An error occurred putting data in database: ", error, " for endpoint: ", endpoint)
      }
      break
    case 'fixtures/statistics':
      final = data.map(({ team, statistics }) => ({
        team: filterObj(team, PROPS_TO_FILTER.fixtures.statistics),
        statistics: statistics.map(({type, value}) => ({
          type,
          value: !value ? null : value.toString()
        }))
      }));
      try {
        await inputFixtureInfo(endpoint, league, final)
      } catch (error) {
        console.error("An error occurred putting data in database: ", error, " for endpoint: ", endpoint)
      }
      break
    case 'news':
      try {
        for (let article of data) {
          await News.findOneAndUpdate({ 'title': article.title }, article, { upsert: true });
          // { upsert: true } => either updates an existing document that matches the query or inserts a new one if no matching document to the query is found.
        }

        console.log(chalk.bgGreen('news articles now in database'))
      } catch (error) {
        console.error('Error: unable to insert data: ', error);
      }
      
      break
    } 
  
  console.log(chalk.bgGreen.bold.black("data for ", endpoint, " now in database"))
  
  return final;

}

// inputting into database functions.
async function processSingleMongooseQuery(data, Model, queryParam = null) {
  let query = {};
  if(!queryParam) {
    query.id = data.id
  } else {
    query[queryParam + '.id'] = data[queryParam].id;
  }
  
  try {
    await Model.findOneAndUpdate(query, data, { upsert: true })
  } catch (error) {
    console.error("Error in processSingleMongooseQuery function: ", error);
  }
}

// todo => looping through array and inputting in DB is slowing down performance. Use bulkWrite to run the DB inserts in parallel. Understand then implement.
async function inputDataInDatabase(data, Model, queryParam) {
  try {
    if(Array.isArray(data)) {
      for(let item of data) {
        console.time(`testing sorting and filtering of data of ${item}`)
        await processSingleMongooseQuery(item, Model, queryParam);
        console.timeEnd(`testing sorting and filtering of data of ${item}`)
      }
    } else {
      await processSingleMongooseQuery(data, Model, queryParam);
    }
  } catch (error) {
    console.error("Error in inputDataInDatabase function: ", error)
  }
}

async function inputFixtureInfo(endpoint, league, data) {
  let fixtureId = league.split('.')[1];
  const endpointCategory = endpoint.split('/')[1];
  const dataToEditFixtures = {}
  dataToEditFixtures[endpointCategory] = data
  try {
    await Fixture.findOneAndUpdate({ "fixture.id": fixtureId }, { $set: dataToEditFixtures })
  } catch (error) {
    console.error("Error: Unable to update fixture events: ", error)
  }
}

// delete collections function
export async function clearMongoCollection(mongoModel, deleteParams = {}) {
  try {
    const output = await mongoModel.deleteMany(deleteParams);
    console.log(chalk.bgGreen('successfully cleared collection', mongoModel))
  } catch (error) {
    console.error("unable to clear collection: ", error);
  }
}