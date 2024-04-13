// filter Objects => 3rd party API to database schema.

export const filterObj = (obj1, arr1) => {
  const filteredObj = {};
  const filteredSet = new Set(arr1);

  for(let key in obj1) {
    if(typeof obj1[key] === 'object' && obj1[key] !== null) {
      // Check if current key should be filtered
      if(filteredSet.has(key)) continue
      const nestedPropsToFilter = [...filteredSet].filter(prop => {
        const splitProp = prop.split('.');
        // console.log(splitProp)
        if(splitProp.length > 1 && splitProp[0] === key) {
          return true
        } else {
          return false
        }
      });

      if(nestedPropsToFilter.length > 0) {
        // extract nested property name
        const nestedProp = nestedPropsToFilter.map(prop => prop.split('.').slice(1).join('.'));
        // recursively call function to handle all of the nested props
        filteredObj[key] = filterObj(obj1[key], nestedProp);
      } else {
        filteredObj[key] = filterObj(obj1[key], filteredSet);
      }

    } else {
      if(!filteredSet.has(key)) {
        filteredObj[key] = obj1[key]
      }
    }
  }

  return filteredObj
}

// Testing multiple nesting
// const example = {
//   name: 'calis',
//   job: {
//     overseas: {
//       london: {
//         southall: 'ok',
//         harrow: 'nowowow',
//       },
//       southAfrica: {
//         capeTown: 'ok'
//       }
//     },
//     home: {
//       losAngeles: 'ok',
//       washington: 'saldkfj'
//     }
//   }
// }

// const filteredObject = filterObj(example, [ 'job.home.washington' ]);
// console.log(filteredObject)

// const exampleData = {
//   league: {
//   id: 39,
//   name: "Premier League",
//   country: "England",
//   logo: "https://media.api-sports.io/football/leagues/39.png",
//   flag: "https://media.api-sports.io/flags/gb.svg",
//   season: 2023,
//   },
//   team: {
//   id: 40,
//   name: "Liverpool",
//   logo: "https://media.api-sports.io/football/teams/40.png",
//   },
//   form: "DWWWWWLDWWDWDWWWDDWWWWLWWWWDWWD",
//   fixtures: {
//   played: {
//   home: 16,
//   away: 15,
//   total: 31,
//   },
//   wins: {
//   home: 13,
//   away: 8,
//   total: 21,
//   },
//   draws: {
//   home: 3,
//   away: 5,
//   total: 8,
//   },
//   loses: {
//   home: 0,
//   away: 2,
//   total: 2,
//   },
//   },
//   goals: {
//   for: {
//   total: {
//   home: 43,
//   away: 29,
//   total: 72,
//   },
//   average: {
//   home: "2.7",
//   away: "1.9",
//   total: "2.3",
//   },
//   minute: {
//   "0-15": {
//   total: 2,
//   percentage: "2.86%",
//   },
//   "16-30": {
//   total: 8,
//   percentage: "11.43%",
//   },
//   "31-45": {
//   total: 10,
//   percentage: "14.29%",
//   },
//   "46-60": {
//   total: 13,
//   percentage: "18.57%"
//   },
//   "61-75": {
//   total: 10,
//   percentage: "14.29%",
//   },
//   "76-90": {
//   total: 19,
//   percentage: "27.14%",
//   },
//   "91-105": {
//   total: 8,
//   percentage: "11.43%",
//   },
//   "106-120": {
//   total: null,
//   percentage: null,
//   },
//   },
//   },
//   against: {
//   total: {
//   home: 14,
//   away: 16,
//   total: 30,
//   },
//   average: {
//   home: "0.9",
//   away: "1.1",
//   total: "1.0",
//   },
//   minute: {
//   "0-15": {
//   total: 6,
//   percentage: "18.75%",
//   },
//   "16-30": {
//   total: 7,
//   percentage: "21.88%",
//   },
//   "31-45": {
//   total: 4,
//   percentage: "12.50%",
//   },
//   "46-60": {
//   total: 5,
//   percentage: "15.63%",
//   },
//   "61-75": {
//   total: 4,
//   percentage: "12.50%",
//   },
//   "76-90": {
//   total: 4,
//   percentage: "12.50%",
//   },
//   "91-105": {
//   total: 2,
//   percentage: "6.25%",
//   },
//   "106-120": {
//   total: null,
//   percentage: null,
//   },
//   },
//   },
//   },
//   biggest: {
//   streak: {
//   wins: 5,
//   draws: 2,
//   loses: 1,
//   },
//   wins: {
//   home: "4-1",
//   away: "0-4",
//   },
//   loses: {
//   home: null,
//   away: "3-1",
//   },
//   goals: {
//   for: {
//   home: 4,
//   away: 4,
//   },
//   against: {
//   home: 3,
//   away: 3,
//   },
//   },
//   },
//   clean_sheet: {
//   home: 5,
//   away: 4,
//   total: 9,
//   },
//   failed_to_score: {
//   home: 1,
//   away: 0,
//   total: 1,
//   },
//   penalty: {
//   scored: {
//   total: 6,
//   percentage: "100.00%",
//   },
//   missed: {
//   total: 0,
//   percentage: "0%",
//   },
//   total: 6,
//   },
//   lineups: [
//   {
//   formation: "4-3-3",
//   played: 31,
//   },
//   ],
//   cards: {
//   yellow: {
//   "0-15": {
//   total: 5,
//   percentage: "8.33%",
//   },
//   "16-30": {
//   total: 4,
//   percentage: "6.67%",
//   },
//   "31-45": {
//   total: 6,
//   percentage: "10.00%",
//   },
//   "46-60": {
//   total: 11,
//   percentage: "18.33%"
//   },
//   "61-75": {
//   total: 11,
//   percentage: "18.33%"
//   },
//   "76-90": {
//   total: 15,
//   percentage: "25.00%",
//   },
//   "91-105": {
//   total: 8,
//   percentage: "13.33%",
//   },
//   "106-120": {
//   total: null,
//   percentage: null,
//   },
//   },
//   red: {
//   "0-15": {
//   total: null,
//   percentage: null,
//   },
//   "16-30": {
//   total: 2,
//   percentage: "40.00%",
//   },
//   "31-45": {
//   total: null,
//   percentage: null,
//   },
//   "46-60": {
//   total: 1,
//   percentage: "20.00%",
//   },
//   "61-75": {
//   total: 1,
//   percentage: "20.00%",
//   },
//   "76-90": {
//   total: 1,
//   percentage: "20.00%",
//   },
//   "91-105": {
//   total: null,
//   percentage: null,
//   },
//   "106-120": {
//   total: null,
//   percentage: null,
//   },
//   },
//   },
//   }

// const finalData = filterObj(exampleData, ["league", "team.logo", "fixtures.played.home", "fixtures.played.away", "fixtures.wins.home", "fixtures.wins.away", "fixtures.draws.home", "fixtures.draws.away", "fixtures.loses.home" , "fixtures.loses.away", "goals.for.total.home", "goals.for.total.away", "goals.for.average.home", "goals.for.average.away", "goals.for.minute", "goals.against.total.home", "goals.against.total.away", "goals.against.average.home", "goals.against.average.away", "goals.against.minute", "biggest.goals", "failed_to_score", "cards"])
// console.log(finalData)