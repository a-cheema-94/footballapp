import { propsToFilter } from "../fixedData/fixedData.js";
import TopPlayer from "../models/TopPlayerModel.js";
import { filterObj } from "../utils/filterData.js";

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

        const updatedPlayer = { league, general: filterObj(general, propsToFilter.topPlayers.general), statistics: filterObj(statistics[0], propsToFilter.topPlayers.statistics) };
        return updatedPlayer;
      })
    }
    
  return final;

}
// final.forEach(player => {
//   const newPlayer = new TopPlayer(player);
//   newPlayer.save((error, footballer) => {
//     if(error) {
//       console.log(error)
//     } else {
//       console.log(`${footballer} successfully added to database`)
//     }
//   })
// })

export function inputDataInDatabase(data, endpoint) {
  switch(endpoint) {
    case 'player/topscorers':
    case 'player/topassists':
      const newPlayer = new TopPlayer(data);
      newPlayer.save()
    default:
      throw new Error('invalid endpoint');
  }
}

// export function getDataFromDatabase(endpoint) {}

