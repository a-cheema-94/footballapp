import TopPlayer from "../models/TopPlayerModel";

function manipulateData(data, endpoint) {
  
  switch(endpoint) {
    case 'players/topscorers':
      return 'sorted array of top scorers matching the schemas'
  }
}

export function inputDataInDatabase(data, endpoint) {
  switch(endpoint) {
    case 'player/topscorers':
      const filteredData = manipulateData(data.response, 'player/topscorers');
      const topScorersData = new TopPlayer(filteredData);
      topScorersData.save()
    default:
      throw new Error('invalid endpoint');
  }
}

export function getDataFromDatabase(endpoint) {}

// RENAMING OBJECT KEYS

// const myObject = { oldKey: 'value' };  

// const { oldKey: newKey, ...rest } = myObject; 
// const updatedObject = { newKey, ...rest };

// console.log(updatedObject); // { newKey: 'value' }
