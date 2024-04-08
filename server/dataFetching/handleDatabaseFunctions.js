import { PROPS_TO_FILTER } from "../fixedData/fixedData.js";
import TeamStanding from "../models/TeamStandingModel.js";
import TopPlayer from "../models/TopPlayerModel.js";
import { filterObj } from "../utils/filterData.js";
import chalk from 'chalk'

// RENAMING OBJECT KEYS

// const myObject = { oldKey: 'value' };  

// const { oldKey: newKey, ...rest } = myObject; 
// const updatedObject = { newKey, ...rest };

// console.log(updatedObject); // { newKey: 'value' }

// TODO: adapt functions for new endpoint: Standings

export function manipulateData(data, endpoint, league) {
  let final;
  // console.log(data[0].league.standings)
  console.log(endpoint)

  switch(endpoint) {
    case 'players/topscorers':
    case 'players/topassists':
      final = data.map(player => {
        const { player: general, statistics } = player;

        const updatedPlayer = { league, general: filterObj(general, PROPS_TO_FILTER.topPlayers.general), statistics: filterObj(statistics[0], PROPS_TO_FILTER.topPlayers.statistics) };
        return updatedPlayer;
      })
    case 'standings':
      let newData = data[0].league.standings[0];
      // console.log(newData[0])
      final = newData.map(teamInfo => {
        const updatedStanding = { league, ...filterObj(teamInfo, PROPS_TO_FILTER.standings) };
        // console.log(updatedStanding)
        return updatedStanding
      })
    }
    
  
  return final;

}

export async function inputDataInDatabase(data, endpoint) {
  switch(endpoint) {
    case 'players/topscorers':
    case 'players/topassists':
      try {
        for (let player of data) {
          await TopPlayer.findOneAndUpdate({ 'general.id': player.general.id }, player, { upsert: true });
        }

        console.log(chalk.bgGreen('players now in database'))
      } catch (error) {
        console.error('Error: unable to insert data: ', error);
      }
      case 'standings':
        try {
          for (let teamStanding of data) {
            // console.log(teamStanding)
            // TODO: put each 'team' in Team collection
            await TeamStanding.findOneAndUpdate({ 'team.id': teamStanding.team.id }, teamStanding, { upsert: true });
          }
  
          console.log(chalk.bgGreen('team standings now in database'))
        } catch (error) {
          console.error('Error: unable to insert data: ', error);
        }
  }
}

// await TopPlayer.findOneAndUpdate('query criteria', player, { upsert: true, new: true });
// export function getDataFromDatabase(endpoint) {}

export async function clearMongoCollection(mongoModel) {
  try {
    const output = await mongoModel.deleteMany({});
    console.log(chalk.bgGreen('successfully cleared collection', mongoModel))
  } catch (error) {
    console.error(`unable to clear collection: ${error}`);
  }
}