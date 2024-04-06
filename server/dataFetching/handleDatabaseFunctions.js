import { PROPS_TO_FILTER } from "../fixedData/fixedData.js";
import TopPlayer from "../models/TopPlayerModel.js";
import { filterObj } from "../utils/filterData.js";
import chalk from 'chalk'

// RENAMING OBJECT KEYS

// const myObject = { oldKey: 'value' };  

// const { oldKey: newKey, ...rest } = myObject; 
// const updatedObject = { newKey, ...rest };

// console.log(updatedObject); // { newKey: 'value' }

export function manipulateData(data, endpoint, league) {
  let final;

  switch(endpoint) {
    case 'players/topscorers':
    case 'players/topassists':
      final = data.map(player => {
        const { player: general, statistics } = player;

        const updatedPlayer = { league, general: filterObj(general, PROPS_TO_FILTER.topPlayers.general), statistics: filterObj(statistics[0], PROPS_TO_FILTER.topPlayers.statistics) };
        return updatedPlayer;
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
          // todo: sort out league!!!
          await TopPlayer.findOneAndUpdate({ 'general.id': player.general.id }, player, { upsert: true });
        }

        console.log(chalk.bgGreen('players now in database'))
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