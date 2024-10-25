// // test

// import { PROPS_TO_FILTER } from "../fixedData/fixedData.js";
// import TeamStanding from "../models/TeamStandingModel.js";
// import { filterObj } from "./filterData.js";

// // endpoint teamStats

// // const liverpoolTeamStats = {
// //   league: {
// //   id: 39,
// //   name: "Premier League",
// //   country: "England",
// //   logo: "https://media.api-sports.io/football/leagues/39.png",
// //   flag: "https://media.api-sports.io/flags/gb-eng.svg",
// //   season: 2024,
// //   },
// //   team: {
// //   id: 40,
// //   name: "Liverpool",
// //   logo: "https://media.api-sports.io/football/teams/40.png",
// //   },
// //   form: "WWWLWWWW",
// //   fixtures: {
// //   played: {
// //   home: 4,
// //   away: 4,
// //   total: 8,
// //   },
// //   wins: {
// //   home: 3,
// //   away: 4,
// //   total: 7,
// //   },
// //   draws: {
// //   home: 0,
// //   away: 0,
// //   total: 0,
// //   },
// //   loses: {
// //   home: 1,
// //   away: 0,
// //   total: 1,
// //   },
// //   },
// //   goals: {
// //   for: {
// //   total: {
// //   home: 7,
// //   away: 8,
// //   total: 15,
// //   },
// //   average: {
// //   home: "1.8",
// //   away: "2.0",
// //   total: "1.9",
// //   },
// //   minute: {
// //   "0-15": {
// //   total: 2,
// //   percentage: "13.33%",
// //   },
// //   "16-30": {
// //   total: 3,
// //   percentage: "20.00%",
// //   },
// //   "31-45": {
// //   total: 3,
// //   percentage: "20.00%",
// //   },
// //   "46-60": {
// //   total: 4,
// //   percentage: "26.67%",
// //   },
// //   "61-75": {
// //   total: 3,
// //   percentage: "20.00%",
// //   },
// //   "76-90": {
// //   total: null,
// //   percentage: null,
// //   },
// //   "91-105": {
// //   total: null,
// //   percentage: null,
// //   },
// //   "106-120": {
// //   total: null,
// //   percentage: null,
// //   },
// //   },
// //   "under_over": {
// //   0.5: {
// //   over: 7,
// //   under: 1,
// //   },
// //   1.5: {
// //   over: 6,
// //   under: 2,
// //   },
// //   2.5: {
// //   over: 2,
// //   under: 6,
// //   },
// //   3.5: {
// //   over: 0,
// //   under: 8,
// //   },
// //   4.5: {
// //   over: 0,
// //   under: 8,
// //   },
// //   },
// //   },
// //   against: {
// //   total: {
// //   home: 2,
// //   away: 1,
// //   total: 3,
// //   },
// //   average: {
// //   home: "0.5",
// //   away: "0.3",
// //   total: "0.4",
// //   },
// //   minute: {
// //   "0-15": {
// //   total: null,
// //   percentage: null,
// //   },
// //   "16-30": {
// //   total: null,
// //   percentage: null,
// //   },
// //   "31-45": {
// //   total: null,
// //   percentage: null,
// //   },
// //   "46-60": {
// //   total: 2,
// //   percentage: "66.67%",
// //   },
// //   "61-75": {
// //   total: 1,
// //   percentage: "33.33%",
// //   },
// //   "76-90": {
// //   total: null,
// //   percentage: null,
// //   },
// //   "91-105": {
// //   total: null,
// //   percentage: null,
// //   },
// //   "106-120": {
// //   total: null,
// //   percentage: null,
// //   },
// //   },
// //   "under_over": {
// //   0.5: {
// //   over: 3,
// //   under: 5,
// //   },
// //   1.5: {
// //   over: 0,
// //   under: 8,
// //   },
// //   2.5: {
// //   over: 0,
// //   under: 8,
// //   },
// //   3.5: {
// //   over: 0,
// //   under: 8,
// //   },
// //   4.5: {
// //   over: 0,
// //   under: 8,
// //   },
// //   },
// //   },
// //   },
// //   biggest: {
// //   streak: {
// //   wins: 3,
// //   draws: 0,
// //   loses: 1,
// //   },
// //   wins: {
// //   home: "3-0",
// //   away: "0-3",
// //   },
// //   loses: {
// //   home: "0-1",
// //   away: null,
// //   },
// //   goals: {
// //   for: {
// //   home: 3,
// //   away: 3,
// //   },
// //   against: {
// //   home: 1,
// //   away: 1,
// //   },
// //   },
// //   },
// //   clean_sheet: {
// //   home: 2,
// //   away: 3,
// //   total: 5,
// //   },
// //   failed_to_score: {
// //   home: 1,
// //   away: 0,
// //   total: 1,
// //   },
// //   penalty: {
// //   scored: {
// //   total: 2,
// //   percentage: "100.00%",
// //   },
// //   missed: {
// //   total: 0,
// //   percentage: "0%",
// //   },
// //   total: 2,
// //   },
// //   lineups: [
// //   {
// //   formation: "4-2-3-1",
// //   played: 8,
// //   },
// //   ],
// //   cards: {
// //   yellow: {
// //   "0-15": {
// //   total: 1,
// //   percentage: "5.56%",
// //   },
// //   "16-30": {
// //   total: 1,
// //   percentage: "5.56%",
// //   },
// //   "31-45": {
// //   total: 4,
// //   percentage: "22.22%",
// //   },
// //   "46-60": {
// //   total: 3,
// //   percentage: "16.67%",
// //   },
// //   "61-75": {
// //   total: 3,
// //   percentage: "16.67%",
// //   },
// //   "76-90": {
// //   total: 3,
// //   percentage: "16.67%",
// //   },
// //   "91-105": {
// //   total: 3,
// //   percentage: "16.67%",
// //   },
// //   "106-120": {
// //   total: null,
// //   percentage: null,
// //   },
// //   },
// //   red: {
// //   "0-15": {
// //   total: null,
// //   percentage: null,
// //   },
// //   "16-30": {
// //   total: null,
// //   percentage: null,
// //   },
// //   "31-45": {
// //   total: null,
// //   percentage: null,
// //   },
// //   "46-60": {
// //   total: null,
// //   percentage: null,
// //   },
// //   "61-75": {
// //   total: null,
// //   percentage: null,
// //   },
// //   "76-90": {
// //   total: null,
// //   percentage: null,
// //   },
// //   "91-105": {
// //   total: null,
// //   percentage: null,
// //   },
// //   "106-120": {
// //   total: null,
// //   percentage: null,
// //   },
// //   },
// //   },
// //   }

// // console.time('testing speed of filterObj function')
// // console.log(filterObj(liverpoolTeamStats, PROPS_TO_FILTER.teamStats))
// // console.timeEnd('testing speed of filterObj function')

// // endpoint fixtures

// [ "fixture.timezone", "fixture.date", "fixture.periods", "league", "teams.home.logo", "teams.away.logo", "score" ]

// const fixtureEx = {
//   fixture: {
//     id: 1035461,
//     referee: 'M. Salisbury',
//     timezone: 'UTC',
//     date: '2024-04-24T19:00:00+00:00',
//     timestamp: 1713985200,
//     periods: { first: null, second: null },
//     venue: { id: 556, name: 'Old Trafford', city: 'Manchester' },
//     status: { long: 'Not Started', short: 'NS', elapsed: null }
//   },
//   league: {
//     id: 39,
//     name: 'Premier League',
//     country: 'England',
//     logo: 'https://media.api-sports.io/football/leagues/39.png',
//     flag: 'https://media.api-sports.io/flags/gb.svg',
//     season: 2023,
//     round: 'Regular Season - 29'
//   },
//   teams: {
//     home: {
//       id: 33,
//       name: 'Manchester United',
//       logo: 'https://media.api-sports.io/football/teams/33.png',
//       winner: null
//     },
//     away: {
//       id: 62,
//       name: 'Sheffield Utd',
//       logo: 'https://media.api-sports.io/football/teams/62.png',
//       winner: null
//     }
//   },
//   goals: { home: null, away: null },
//   score: {
//     halftime: { home: null, away: null },
//     fulltime: { home: null, away: null },
//     extratime: { home: null, away: null },
//     penalty: { home: null, away: null }
//   },
//   events: [
//       {
//         time: {
//         elapsed: 29,
//         extra: null,
//         },
//         team: {
//         id: 1483,
//         name: "NK Varazdin",
//         logo: "https://media.api-sports.io/football/teams/1483.png",
//         },
//         player: {
//         id: 14457,
//         name: "I. Postonjski",
//         },
//         assist: {
//         id: null,
//         name: null,
//         },
//         type: "Goal",
//         detail: "Normal Goal",
//         comments: null,
//       },
//       {
//         time: {
//         elapsed: 31,
//         extra: null,
//         },
//         team: {
//         id: 1483,
//         name: "NK Varazdin",
//         logo: "https://media.api-sports.io/football/teams/1483.png",
//         },
//         player: {
//         id: 14370,
//         name: "M. Marina",
//         },
//         assist: {
//         id: null,
//         name: null,
//         },
//         type: "Card",
//         detail: "Yellow Card",
//         comments: null,
//       },
//     ]
// }


// console.time('testing speed of filterObj function')
// console.log(filterObj(fixtureEx, PROPS_TO_FILTER.fixtures.fixture))
// console.timeEnd('testing speed of filterObj function')

// // // endpoint: goals and assists

// // const goalsAndAssistsTests = {
// // obj1: {
// //   name: 'robert',
// //   age: 29,
// //   status: 'injured',
// //   goals: {
// //     home: 2,
// //     away: 3,
// //     total: 5
// //   },
// //   total: 3435,
// //   away: 343,
// //   games: {
// //     appearances: 45,
// //     minutes: 115,
// //     position: 'Striker',
// //     captain: true
// //   },
// // },

// // propsToFilter: [ 'age', 'goals.away', 'goals.total', 'games.appearances', 'games.minutes' ],

// // obj1: {
// //     team: {
// //       id: 50,
// //       name: "Manchester City",
// //       logo: "https://media.api-sports.io/football/teams/50.png"
// //     },
// //     league: {
// //       id: 39,
// //       name: "Premier League",
// //       country: "England",
// //       logo: "https://media.api-sports.io/football/leagues/39.png",
// //       flag: "https://media.api-sports.io/flags/gb.svg",
// //       season: 2023,
// //     },
// //     games: {
// //       appearences: 24,
// //       lineups: 23,
// //       minutes: 2016,
// //       number: null,
// //       position: "Attacker",
// //       rating: "7.287500",
// //       captain: false,
// //     },
// //     substitutes: {
// //       in: 1,
// //       out: 5,
// //       bench: 1,
// //     },
// //     shots: {
// //       total: 75,
// //       on: 44,
// //     },
// //     goals: {
// //       total: 18,
// //       conceded: 0,
// //       assists: 5,
// //       saves: null,
// //     },
// //     passes: {
// //       total: 273,
// //       key: 25,
// //       accuracy: 8,
// //     },
// //     tackles: {
// //       total: 5,
// //       blocks: 1,
// //       interceptions: 1,
// //     },
// //     duels: {
// //       total: 131,
// //       won: 62,
// //     },
// //     dribbles: {
// //       attempts: 20,
// //       success: 10,
// //       past: null,
// //     },
// //     fouls: {
// //       drawn: 20,
// //       committed: 14,
// //     },
// //     cards: {
// //       yellow: 1,
// //       yellowred: 0,
// //       red: 0,
// //     },
// //     penalty: {
// //       won: null,
// //       commited: null,
// //       scored: 3,
// //       missed: 1,
// //       saved: null,
// //     },
// //   }

// //   // const propsToFilter = [ 'birth', 'injured', 'photo' ]
// //   // const propsToFilter = [ 'team.logo', 'league', 'games.lineups', 'games.number', 'games.rating', 'substitutions.bench', 'duels.total', 'cards.yellowred', 'penalty.won', 'penalty.commited' ]

// // // console.log(filterObj(obj1, propsToFilter))
// // }

// // // endpoint: standings

// // const standingsTests = {
// //   standing1: {
// //     rank: 1,
// //     team: {
// //     id: 42,
// //     name: "Arsenal",
// //     logo: "https://media.api-sports.io/football/teams/42.png",
// //     },
// //     points: 71,
// //     goalsDiff: 51,
// //     group: "Premier League",
// //     form: "WWDWW",
// //     status: "same",
// //     description: "Promotion - Champions League (Group Stage: )",
// //     all: {
// //     played: 31,
// //     win: 22,
// //     draw: 5,
// //     lose: 4,
// //     goals: {
// //     for: 75,
// //     against: 24
// //     },
// //     },
// //     home: {
// //     played: 15,
// //     win: 12,
// //     draw: 2,
// //     lose: 1,
// //     goals: {
// //     for: 38,
// //     against: 13
// //     },
// //     },
// //     away: {
// //     played: 16,
// //     win: 10,
// //     draw: 3,
// //     lose: 3,
// //     goals: {
// //     for: 37,
// //     against: 11,
// //     },
// //     },
// //     update: "2024-04-07T00:00:00+00:00"
// //     },
// //     propsToFilter: ["team.logo", "group", "status", "description", "home", "away", "update"],
  
// //     Con: () => console.log(filterObj(standing1, propsToFilter))
  
// //   // GET standings array out of data response.
// //   // const data = [{ league: { calis: [1, 2, 3, 4, 5] } }];
  
// //   // const newData = data[0].league.calis;
// //   // console.log(newData)

// // }

// // // endpoint: players/squads

// // const playerSquads = {
// //   playerSquad: {
// //       id: 280,
// //       name: "Alisson Becker",
// //       age: 31,
// //       number: 1,
// //       position: "Goalkeeper",
// //       photo: "https://media.api-sports.io/football/players/280.png"
// //     }
// //     // console.log(filterObj(playerSquad, PROPS_TO_FILTER.squads))

// // }

// // // endpoint: fixtures

// // const fixtures = {

// // }
// // // fixture (last or next)
// // // const fixtureEx = {
// // //   fixture: {
// // //   id: 1035508,
// // //   referee: null,
// // //   timezone: "UTC",
// // //   date: "2024-04-21T15:30:00+00:00",
// // //   timestamp: 1713713400,
// // //   periods: {
// // //   first: null,
// // //   second: null,
// // //   },
// // //   venue: {
// // //   id: 535,
// // //   name: "Craven Cottage",
// // //   city: "London",
// // //   },
// // //   status: {
// // //   long: "Not Started",
// // //   short: "NS",
// // //   elapsed: null,
// // //   },
// // //   },
// // //   league: {
// // //   id: 39,
// // //   name: "Premier League",
// // //   country: "England",
// // //   logo: "https://media.api-sports.io/football/leagues/39.png",
// // //   flag: "https://media.api-sports.io/flags/gb.svg",
// // //   season: 2023,
// // //   round: "Regular Season - 34",
// // //   },
// // //   teams: {
// // //   home: {
// // //   id: 36,
// // //   name: "Fulham",
// // //   logo: "https://media.api-sports.io/football/teams/36.png",
// // //   winner: null,
// // //   },
// // //   away: {
// // //   id: 40,
// // //   name: "Liverpool",
// // //   logo: "https://media.api-sports.io/football/teams/40.png",
// // //   winner: null,
// // //   },
// // //   },
// // //   goals: {
// // //   home: null,
// // //   away: null,
// // //   },
// // //   score: {
// // //   halftime: {
// // //   home: null,
// // //   away: null,
// // //   },
// // //   fulltime: {
// // //   home: null,
// // //   away: null,
// // //   },
// // //   extratime: {
// // //   home: null,
// // //   away: null,
// // //   },
// // //   penalty: {
// // //   home: null,
// // //   away: null,
// // //   },
// // //   },
// // //   }


// // // const { events } = fixtureEx;
// // // delete fixtureEx.events;
// // // const newFixture = { ...filterObj(fixtureEx, PROPS_TO_FILTER.fixtures.fixture), events };
// // // console.log(newFixture)

// // const { fixture: { id } } = fixtureEx;
// // console.log(id)

// // // console.log(filterObj(fixtureEx, PROPS_TO_FILTER.fixtures.fixture))

// // // events
// // // const eventEx = {
// // //   time: {
// // //   elapsed: 14,
// // //   extra: null,
// // //   },
// // //   team: {
// // //   id: 52,
// // //   name: "Crystal Palace",
// // //   logo: "https://media.api-sports.io/football/teams/52.png",
// // //   },
// // //   player: {
// // //   id: 19586,
// // //   name: "E. Eze",
// // //   },
// // //   assist: {
// // //   id: 182201,
// // //   name: "T. Mitchell",
// // //   },
// // //   type: "Goal",
// // //   detail: "Normal Goal",
// // //   comments: null,
// // //   }

// // //   console.log(filterObj(eventEx, PROPS_TO_FILTER.fixtures.events))

// // // lineups

// // // const lineupEx = {
// // //     team: {
// // //       id: 40,
// // //       name: "Liverpool",
// // //       logo: "https://media.api-sports.io/football/teams/40.png",
// // //       colors: {
// // //         player: {
// // //         primary: "e41e2c",
// // //         number: "ffffff",
// // //         border: "e41e2c",
// // //         },
// // //         goalkeeper: {
// // //         primary: "23262b",
// // //         number: "f3f5f0",
// // //         border: "23262b",
// // //         },
// // //       },
// // //     },
// // //     coach: {
// // //     id: 1,
// // //     name: "J. Klopp",
// // //     photo: "https://media.api-sports.io/football/coachs/1.png",
// // //     },
// // //     formation: "4-3-3",
// // //     startXI: [ { random: 'nonsense' }, { random: 'nonsense' }, { random: 'nonsense' } ],
// // //     substitutes: [ { random: 'nonsense' }, { random: 'nonsense' }, { random: 'nonsense' } ],
// // //   }

// // //   const lineupArray = [lineupEx]

// // //   console.log(lineupArray.map(({ team, coach, ...rest }) => ({
// // //     team: filterObj(team, PROPS_TO_FILTER.fixtures.lineups),
// // //     coach: filterObj(coach, PROPS_TO_FILTER.fixtures.lineups),
// // //     ...rest
// // //   })))

// //   // {
// //   //   team: { id: 48, name: 'West Ham', colors: [Object] },
// //   //   coach: { id: 5662, name: 'D. Moyes' },
// //   //   formation: '4-2-3-1',
// //   //   startXI: {
// //   //     '0': [Object],
// //   //     '1': [Object],
// //   //     '2': [Object],
// //   //     '3': [Object],
// //   //     '4': [Object],
// //   //     '5': [Object],
// //   //     '6': [Object],
// //   //     '7': [Object],
// //   //     '8': [Object],
// //   //     '9': [Object],
// //   //     '10': [Object]
// //   //   },
// //   //   substitutes: {
// //   //     '0': [Object],
// //   //     '1': [Object],
// //   //     '2': [Object],
// //   //     '3': [Object],
// //   //     '4': [Object],
// //   //     '5': [Object],
// //   //     '6': [Object],
// //   //     '7': [Object],
// //   //     '8': [Object]
// //   //   }
// //   // }


// // // statistics 

// // // const statisticEx = [
// // //   {
// // //     team: {
// // //       id: 40,
// // //       name: 'Liverpool',
// // //       logo: 'https://media.api-sports.io/football/teams/40.png'
// // //     },
// // //     statistics: [
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }
// // //     ]
// // //   },
// // //   {
// // //     team: {
// // //       id: 52,
// // //       name: 'Crystal Palace',
// // //       logo: 'https://media.api-sports.io/football/teams/52.png'
// // //     },
// // //     statistics: [
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }, { type: 'Shot On Goal', value: 6 },
// // //       { type: 'Shot On Goal', value: 6 }
// // //     ]
// // //   }
// // // ]

// // // const finalStats = statisticEx.map(({ team, statistics }) => ({
// // //   team: filterObj(team, PROPS_TO_FILTER.fixtures.statistics),
// // //   statistics: statistics.map(({ type, value }) => ({
// // //     type,
// // //     value: value.toString()
// // //   }))
// // // }))

// // // console.log(finalStats[0].statistics)

// // // const team1 =  {
// // //   id: 52,
// // //   name: 'Crystal Palace',
// // //   logo: 'https://media.api-sports.io/football/teams/52.png'
// // // }

// // // console.log(filterObj(team1, PROPS_TO_FILTER.fixtures.statistics))


// // export const filterObj = (obj1, arr1) => {
// //   const filteredObj = {};
// //   const filteredSet = new Set(arr1); // Set of props to filter

// //   // iterate over all keys in data object
// //   for (let key in obj1) {
// //     // doesn't
// //     if (obj1[key] !== null && typeof obj1[key] === "object") {
// //       if (filteredSet.has(key)) continue;

// //       // filter out all props that are not needed, i.e. do not match the current key.
// //       // could have an array of props to filter that have multiple entries for the same field. I.e. games.lineups and games.number => both have nested fields inside games.
// //       const nestedPropsToFilter = [...filteredSet].filter((prop) => {
// //         const splitProp = prop.split("."); // could be an array of just one or many different props.

// //         if (splitProp.length > 1 && splitProp[0] === key) {
// //           return true;
// //         } else {
// //           return false;
// //         }
// //       });

// //       if (nestedPropsToFilter.length > 0) {
// //         // extract nested property name
// //         const nestedProp = nestedPropsToFilter.map((prop) =>
// //           prop.split(".").slice(1).join(".")
// //         );
// //         // recursively call function to handle all of the nested props
// //         filteredObj[key] = filterObj(obj1[key], nestedProp);
// //       } else {
// //         filteredObj[key] = filterObj(obj1[key], filteredSet);
// //       }
// //     } else {
// //       // if this condition is NOT met then the key is filtered out, by not inputting it into the filteredObj.
// //       if (!filteredSet.has(key)) {
// //         // if the current key is not in the filtered set of 'props to filter' then we just copy the key value pair to the new filtered object, otherwise this prop is skipped and filtered out of the object.
// //         filteredObj[key] = obj1[key];
// //       }
// //     }
// //   }

// //   return filteredObj;
// // };

// // const sampleObject = {
// //   prop1: "value1",
// //   prop2: {
// //     nestedProp1: "value2-1",
// //     nestedProp2: "value2-2",
// //   },
// //   prop3: "value3",
// //   prop4: {
// //     nestedProp1: "value4-1",
// //     nestedProp2: {
// //       nestedProp3: "value4-3",
// //       nestedProp4: "value4-4",
// //     },
// //   },
// //   prop5: "value5"
// // };

// // const propsToFilter = [
// //   'prop1',
// //   'prop2.nestedProp1',
// //   'prop3',
// //   'prop4.nestedProp2.nestedProp3'
// // ];

// // // const result = filterObj(sampleObject, propsToFilter);
// // // console.log(result)

// // // function filterObject2(object, propsToFilter) {
// // //   const newObj = JSON.parse(JSON.stringify(object)); // Deep clone the object

// // //   propsToFilter.forEach(path => {
// // //     const keys = path.split('.');
// // //     let current = newObj;

// // //     for (let i = 0; i < keys.length; i++) {
// // //       const key = keys[i];

// // //       // If we are at the last key, delete the property
// // //       if (i === keys.length - 1) {
// // //         delete current[key];
// // //       } else if (current[key]) {
// // //         current = current[key]; // Move deeper into the object
// // //       }
// // //     }
// // //   });

// // //   return newObj;
// // // }

// // // const result2 = filterObject2(sampleObject, propsToFilter);
// // // console.log(result2)

// // const largeSampleObject = {
// //   prop1: {
// //     nestedProp1: {
// //       nestedProp2: {
// //         nestedProp3: "value1-3",
// //         nestedProp4: "value1-4",
// //       },
// //       nestedProp5: "value1-5",
// //     },
// //     nestedProp6: "value1-6",
// //   },
// //   prop2: {
// //     nestedProp1: {
// //       nestedProp2: "value2-2",
// //       nestedProp3: "value2-3",
// //     },
// //     nestedProp4: "value2-4",
// //   },
// //   prop3: "value3",
// //   prop4: {
// //     nestedProp1: {
// //       nestedProp2: {
// //         nestedProp3: {
// //           nestedProp4: "value4-4",
// //           nestedProp5: "value4-5",
// //         },
// //         nestedProp6: "value4-6",
// //       }
// //     }
// //   },
// //   prop5: "value5",
// // };

// // const propsToFilter2 = [
// //   'prop1.nestedProp1.nestedProp2.nestedProp3',
// //   'prop1.nestedProp1.nestedProp5',
// //   'prop1.nestedProp6',
// //   'prop2.nestedProp1.nestedProp2',
// //   'prop2.nestedProp1.nestedProp3',
// //   'prop2.nestedProp4',
// //   'prop3',
// //   'prop4.nestedProp1.nestedProp2.nestedProp3.nestedProp5',
// //   'prop4.nestedProp1.nestedProp2.nestedProp6',
// //   'prop4.nestedProp1.nestedProp2',
// //   'prop6',
// //   'prop7.nestedProp1.nestedProp2.nestedProp3',
// //   'prop7.nestedProp1.nestedProp2.nestedProp4',
// //   'prop7.nestedProp1.nestedProp5',
// //   'prop7.nestedProp6',
// //   'prop8',
// //   'prop9.nestedProp1',
// //   'prop9.nestedProp2.nestedProp3',
// //   'prop9.nestedProp2.nestedProp4',
// //   'prop10.nestedProp1.nestedProp2',
// //   'prop10.nestedProp3',
// //   'prop11.nestedProp1',
// //   'prop11.nestedProp2.nestedProp3',
// //   'prop12',
// //   'prop13.nestedProp1.nestedProp2',
// //   'prop13.nestedProp3',
// //   'prop14.nestedProp1.nestedProp2.nestedProp3',
// //   'prop14.nestedProp1.nestedProp4',
// //   'prop15',
// //   'prop15.nestedProp1.nestedProp2.nestedProp3.nestedProp5'
// // ];

// // console.log(filterObj(largeSampleObject, propsToFilter2))
// // // console.log(filterObject2(largeSampleObject, propsToFilter2))


// import { PROPS_TO_FILTER } from "../fixedData/fixedData.js";
// // recursion recap

// // fibonacii => each number adds to give next number. Want the
// const fib = (n) => {
//   // base case
//   if (n <= 2) return 1;

//   // recursive call
//   return fib(n - 2) + fib(n - 1);
// };

// // fib1 = 1, fib2 = 1, fib3 = 2, fib4 = 3, fib5 = 5, ...

// // factorial
// // 0! = 1, 1! = 1, 2! = 2*1 = 2, 3! = 3*2*1 = 6, 4! = 4*3*2*1 = 24, 5! = 5*4*3*2*1 = 120,
// const fact = (n) => {
//   // base case
//   if (n <= 1) return 1;

//   // recursive call
//   return n * fact(n - 1);
// };

// // memoize recap

// // we want to cache function calls that have already happened.

// const fibMemo = (n, cache = {}) => {
//   if (n in cache) return cache[n];

//   if (n <= 2) return 1;

//   cache[n] = fibMemo(n - 1, cache) + fibMemo(n - 2, cache);
//   return cache[n];
// };

// const filterObject3 = (objToFilter, propsToFilter) => {
//   const filteredObj = {};

//   for (const key of Object.keys(objToFilter)) {
//     // base case
//     // ex condition: !propsToFilter.map((prop) => prop.split(".")[0]).includes(key)
//     if (!propsToFilter.some(prop => prop.startsWith(key))) {
//       filteredObj[key] = objToFilter[key];
//       continue;
//     }
//     if (propsToFilter.includes(key)) continue;

//     // modify prop to put in recursive call
//     const newPropsToFilter = propsToFilter
//       .filter((prop) => prop.split(".")[0] === key)
//       .map((filteredProp) => filteredProp.split(".").slice(1).join("."));

//     // recursive call, while also ensuring only objects get passed to function.
//     filteredObj[key] =
//       typeof objToFilter[key] === "object"
//          filterObject3(objToFilter[key], newPropsToFilter)
//         : objToFilter[key];
//   }

//   return filteredObj;
// };