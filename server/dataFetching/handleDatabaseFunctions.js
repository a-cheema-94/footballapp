import { PROPS_TO_FILTER } from "../fixedData/fixedData.js";
import SquadMember from "../models/SquadMemberModel.js";
import TeamStanding from "../models/TeamStandingModel.js";
import TeamStats from "../models/TeamStatsModel.js";
import Player from "../models/TopPlayerModel.js";
import Fixture from "../models/fixtures/FixtureModel.js";
import { filterObj } from "../utils/filterData.js";
import chalk from 'chalk'


export function manipulateData(data, endpoint, league) {
  let final;
  let fixtureId;

  switch(endpoint) {
    case 'players/topscorers':
    case 'players/topassists':
      final = data.map(player => {
        const { player: general, statistics } = player;

        const updatedPlayer = { league, general: filterObj(general, PROPS_TO_FILTER.topPlayers.general), statistics: filterObj(statistics[0], PROPS_TO_FILTER.topPlayers.statistics) };
        return updatedPlayer;
      })
      break
    case 'standings':
      let newData = data[0].league.standings[0];
      final = newData.map(teamInfo => {
        const updatedStanding = { league, ...filterObj(teamInfo, PROPS_TO_FILTER.standings) };
        return updatedStanding
      })
      break
    case 'players/squads':
      let playerRoster = data[0].players;
      let team = data[0].team.name
      final = playerRoster.map(player => {
        const updatedPlayer = { league, team, ...filterObj(player, PROPS_TO_FILTER.squads) };
        return updatedPlayer
      })
      break
    case 'teams/statistics':
      let newLineups = data.lineups[0];
      final = { league, ...filterObj(data, PROPS_TO_FILTER.teamStats), lineups: newLineups }
      break
    case 'players':
      let player = data[0];
      const { player: general, statistics } = player;

      final = { league, general: filterObj(general, PROPS_TO_FILTER.topPlayers.general), statistics: filterObj(statistics[0], PROPS_TO_FILTER.topPlayers.statistics) };
      break
    case 'fixtures':
      if(data.length > 1) {
        final = data.map(liveFixture => {
          const { league: { name }, events } = liveFixture;
          delete liveFixture.events;
          const updatedLiveFixture = { live: true, league: name, ...filterObj(liveFixture, PROPS_TO_FILTER.fixtures.fixture), events, statistics: [], lineups: [] };
          return updatedLiveFixture
        });
      } else {
        let fixture = data[0];
        final = { league, ...filterObj(fixture, PROPS_TO_FILTER.fixtures.fixture), statistics: [], events: [], lineups: [] };
      }
      break
    case 'fixtures/events':
      fixtureId = league.split('.')[1];
      final = data.map(event => filterObj(event, PROPS_TO_FILTER.fixtures.events));
      final.push(fixtureId);
      break
    case 'fixtures/lineups':
      fixtureId = league.split('.')[1];
      final = data.map(({ team, coach, ...rest }) => ({
        team: filterObj(team, PROPS_TO_FILTER.fixtures.lineups),
        coach: filterObj(coach, PROPS_TO_FILTER.fixtures.lineups),
        ...rest
      }))
      final.push(fixtureId);
      break
    case 'fixtures/statistics':
      fixtureId = league.split('.')[1];
      final = data.map(({ team, statistics }) => ({
        team: filterObj(team, PROPS_TO_FILTER.fixtures.statistics),
        statistics: statistics.map(({type, value}) => ({
          type,
          value: !value ? null : value.toString()
        }))
      }));
      final.push(fixtureId);
      break
    }
    
  return final;

}

export async function inputDataInDatabase(data, endpoint) {
  let fixtureId;
  switch(endpoint) {
    case 'players/topscorers':
    case 'players/topassists':
      try {
        for (let player of data) {
          await Player.findOneAndUpdate({ 'general.id': player.general.id }, player, { upsert: true });
        }

        console.log(chalk.bgGreen('players now in database'))
      } catch (error) {
        console.error('Error: unable to insert data: ', error);
      }
      break
    case 'standings':
      try {
        for (let teamStanding of data) {
          await TeamStanding.findOneAndUpdate({ 'team.id': teamStanding.team.id }, teamStanding, { upsert: true });
        }

        console.log(chalk.bgGreen('team standings now in database'))
      } catch (error) {
        console.error('Error: unable to insert data: ', error);
      }
      break
    case 'players/squads':
      try {
        for (let squadMember of data) {
          await SquadMember.findOneAndUpdate({ id: squadMember.id }, squadMember, { upsert: true });
        }

        console.log(chalk.bgGreen('Squad Members now in database'))
      } catch (error) {
        console.error('Error: unable to insert data: ', error);
      }
      break
    case 'teams/statistics':
      try {
        await TeamStats.findOneAndUpdate({ 'team.id': data.team.id }, data, { upsert: true })
        console.log(chalk.bgGreen('Team Stats now in database'))
      } catch (error) {
        console.error('Error: unable to insert data: ', error);
      }
      break
    case 'players':
      try {
        await Player.findOneAndUpdate({ 'general.id': data.general.id }, data, { upsert: true });
        console.log(chalk.bgGreen('Player Stats now in database'))
      } catch (error) {
        console.error('Error: unable to insert data: ', error);
      }
      break
    case 'fixtures':
      // check if data is an array (live fixtures)
      if(Array.isArray(data)) {
        try {
          for(let liveFixture of data) {
            await Fixture.findOneAndUpdate({"fixture.id": liveFixture.fixture.id}, liveFixture, { upsert: true });
          }
          console.log(chalk.bgGreen('Live Fixtures now in database'))
        } catch (error) {
          console.error('Error: unable to insert data: ', error);
        }
      } else {
        try {
          await Fixture.findOneAndUpdate({"fixture.id": data.fixture.id}, data, { upsert: true });
        } catch(error) {
          console.error("Error: Unable to insert data: ", error)
        }
      }
      break
    case 'fixtures/events':
    case 'fixtures/lineups':
    case 'fixtures/statistics':
      fixtureId = data.pop();
      const endpointCategory = endpoint.split('/')[1];
      const dataToEditFixtures = {}
      dataToEditFixtures[endpointCategory] = data
      try {
        await Fixture.findOneAndUpdate({ "fixture.id": fixtureId }, { $set: dataToEditFixtures })
      } catch (error) {
        console.error("Error: Unable to update fixture events: ", error)
      }
      break
      
  }
}

// case 'fixtures/events':
//       fixtureId = data.pop();
//       try {
//         await Fixture.findOneAndUpdate({ "fixture.id": fixtureId }, { $set: { events: data } })
//       } catch (error) {
//         console.error("Error: Unable to update fixture events: ", error)
//       }
//       break
//     case 'fixtures/lineups':
//       fixtureId = data.pop();
//       try {
//         await Fixture.findOneAndUpdate({ "fixture.id": fixtureId }, { $set: { lineups: data } }) 
//       } catch(error) {
//         console.error("Error: Unable to update fixture lineups: ", error)
//       }
//       break
//     case 'fixtures/statistics':
//       fixtureId = data.pop();
//       try {
//         await Fixture.findOneAndUpdate({ "fixture.id": fixtureId }, { $set: { statistics: data } }) 
//       } catch(error) {
//         console.error("Error: Unable to update fixture statistics: ", error)
//       }
//       break


export async function clearMongoCollection(mongoModel, deleteParams = {}) {
  try {
    const output = await mongoModel.deleteMany(deleteParams);
    console.log(chalk.bgGreen('successfully cleared collection', mongoModel))
  } catch (error) {
    console.error(`unable to clear collection: ${error}`);
  }
}