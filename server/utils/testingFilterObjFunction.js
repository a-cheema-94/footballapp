// test

import { PROPS_TO_FILTER } from "../fixedData/fixedData.js";
import TeamStanding from "../models/TeamStandingModel.js";
import { filterObj } from "./filterData.js";

// endpoint: goals and assists

const goalsAndAssistsTests = {
obj1: {
  name: 'robert',
  age: 29,
  status: 'injured',
  goals: {
    home: 2,
    away: 3,
    total: 5
  },
  total: 3435,
  away: 343,
  games: {
    appearances: 45,
    minutes: 115,
    position: 'Striker',
    captain: true
  },
},

propsToFilter: [ 'age', 'goals.away', 'goals.total', 'games.appearances', 'games.minutes' ],

obj1: {
    team: {
      id: 50,
      name: "Manchester City",
      logo: "https://media.api-sports.io/football/teams/50.png"
    },
    league: {
      id: 39,
      name: "Premier League",
      country: "England",
      logo: "https://media.api-sports.io/football/leagues/39.png",
      flag: "https://media.api-sports.io/flags/gb.svg",
      season: 2023,
    },
    games: {
      appearences: 24,
      lineups: 23,
      minutes: 2016,
      number: null,
      position: "Attacker",
      rating: "7.287500",
      captain: false,
    },
    substitutes: {
      in: 1,
      out: 5,
      bench: 1,
    },
    shots: {
      total: 75,
      on: 44,
    },
    goals: {
      total: 18,
      conceded: 0,
      assists: 5,
      saves: null,
    },
    passes: {
      total: 273,
      key: 25,
      accuracy: 8,
    },
    tackles: {
      total: 5,
      blocks: 1,
      interceptions: 1,
    },
    duels: {
      total: 131,
      won: 62,
    },
    dribbles: {
      attempts: 20,
      success: 10,
      past: null,
    },
    fouls: {
      drawn: 20,
      committed: 14,
    },
    cards: {
      yellow: 1,
      yellowred: 0,
      red: 0,
    },
    penalty: {
      won: null,
      commited: null,
      scored: 3,
      missed: 1,
      saved: null,
    },
  }

  // const propsToFilter = [ 'birth', 'injured', 'photo' ]
  // const propsToFilter = [ 'team.logo', 'league', 'games.lineups', 'games.number', 'games.rating', 'substitutions.bench', 'duels.total', 'cards.yellowred', 'penalty.won', 'penalty.commited' ]

// console.log(filterObj(obj1, propsToFilter))
}

// endpoint: standings

const standingsTests = {
  standing1: {
    rank: 1,
    team: {
    id: 42,
    name: "Arsenal",
    logo: "https://media.api-sports.io/football/teams/42.png",
    },
    points: 71,
    goalsDiff: 51,
    group: "Premier League",
    form: "WWDWW",
    status: "same",
    description: "Promotion - Champions League (Group Stage: )",
    all: {
    played: 31,
    win: 22,
    draw: 5,
    lose: 4,
    goals: {
    for: 75,
    against: 24
    },
    },
    home: {
    played: 15,
    win: 12,
    draw: 2,
    lose: 1,
    goals: {
    for: 38,
    against: 13
    },
    },
    away: {
    played: 16,
    win: 10,
    draw: 3,
    lose: 3,
    goals: {
    for: 37,
    against: 11,
    },
    },
    update: "2024-04-07T00:00:00+00:00"
    },
    propsToFilter: ["team.logo", "group", "status", "description", "home", "away", "update"],
  
    Con: () => console.log(filterObj(standing1, propsToFilter))
  
  // GET standings array out of data response.
  // const data = [{ league: { calis: [1, 2, 3, 4, 5] } }];
  
  // const newData = data[0].league.calis;
  // console.log(newData)

}

// endpoint: players/squads

const playerSquads = {}

const playerSquad = {
    id: 280,
    name: "Alisson Becker",
    age: 31,
    number: 1,
    position: "Goalkeeper",
    photo: "https://media.api-sports.io/football/players/280.png"
  }

console.log(filterObj(playerSquad, PROPS_TO_FILTER.squads))