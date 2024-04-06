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
        if(splitProp.length > 1 && splitProp[0] === key) {
          return true
        } else {
          return false
        }
      });


      if(nestedPropsToFilter.length > 0) {
        // extract nested property name
        const nestedProp = nestedPropsToFilter.map(prop => prop.split('.').slice(1).join(''));
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




// test

// const obj1 = {
//   name: 'robert',
//   age: 29,
//   status: 'injured',
//   goals: {
//     home: 2,
//     away: 3,
//     total: 5
//   },
//   total: 3435,
//   away: 343,
//   games: {
//     appearances: 45,
//     minutes: 115,
//     position: 'Striker',
//     captain: true
//   },
// }

// const propsToFilter = [ 'age', 'goals.away', 'goals.total', 'games.appearances', 'games.minutes' ]

// const obj1 = {
//     team: {
//       id: 50,
//       name: "Manchester City",
//       logo: "https://media.api-sports.io/football/teams/50.png"
//     },
//     league: {
//       id: 39,
//       name: "Premier League",
//       country: "England",
//       logo: "https://media.api-sports.io/football/leagues/39.png",
//       flag: "https://media.api-sports.io/flags/gb.svg",
//       season: 2023,
//     },
//     games: {
//       appearences: 24,
//       lineups: 23,
//       minutes: 2016,
//       number: null,
//       position: "Attacker",
//       rating: "7.287500",
//       captain: false,
//     },
//     substitutes: {
//       in: 1,
//       out: 5,
//       bench: 1,
//     },
//     shots: {
//       total: 75,
//       on: 44,
//     },
//     goals: {
//       total: 18,
//       conceded: 0,
//       assists: 5,
//       saves: null,
//     },
//     passes: {
//       total: 273,
//       key: 25,
//       accuracy: 8,
//     },
//     tackles: {
//       total: 5,
//       blocks: 1,
//       interceptions: 1,
//     },
//     duels: {
//       total: 131,
//       won: 62,
//     },
//     dribbles: {
//       attempts: 20,
//       success: 10,
//       past: null,
//     },
//     fouls: {
//       drawn: 20,
//       committed: 14,
//     },
//     cards: {
//       yellow: 1,
//       yellowred: 0,
//       red: 0,
//     },
//     penalty: {
//       won: null,
//       commited: null,
//       scored: 3,
//       missed: 1,
//       saved: null,
//     },
//   }

//   // const propsToFilter = [ 'birth', 'injured', 'photo' ]
//   const propsToFilter = [ 'team.logo', 'league', 'games.lineups', 'games.number', 'games.rating', 'substitutions.bench', 'duels.total', 'cards.yellowred', 'penalty.won', 'penalty.commited' ]

// // console.log(filterObj(obj1, propsToFilter))