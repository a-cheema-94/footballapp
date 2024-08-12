import { FixtureType } from "../../../../queries/types/queryTypes";

export const sampleFixtures: FixtureType[] = [
  // Premier League Fixtures
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "Premier League",
    fixture: {
      id: 101,
      referee: "Michael Oliver",
      timestamp: "2024-08-10T14:00:00Z",
      venue: {
        id: 1,
        name: "Old Trafford",
        city: "Manchester",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 1,
        name: "Manchester United",
        winner: true,
      },
      away: {
        id: 2,
        name: "Chelsea",
        winner: false,
      },
    },
    goals: {
      home: 2,
      away: 0,
    },
    statistics: [],
    events: [],
    lineups: [],
  },
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "Premier League",
    fixture: {
      id: 102,
      referee: "Martin Atkinson",
      timestamp: "2024-08-11T15:00:00Z",
      venue: {
        id: 2,
        name: "Anfield",
        city: "Liverpool",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 40,
        name: "Liverpool",
        winner: true,
      },
      away: {
        id: 4,
        name: "Arsenal",
        winner: false,
      },
    },
    goals: {
      home: 3,
      away: 1,
    },
    statistics: [],
    events: [],
    lineups: [],
  },
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "Premier League",
    fixture: {
      id: 103,
      referee: "Anthony Taylor",
      timestamp: "2024-08-12T16:00:00Z",
      venue: {
        id: 3,
        name: "Etihad Stadium",
        city: "Manchester",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 5,
        name: "Manchester City",
        winner: true,
      },
      away: {
        id: 6,
        name: "Tottenham Hotspur",
        winner: false,
      },
    },
    goals: {
      home: 2,
      away: 1,
    },
    statistics: [],
    events: [],
    lineups: [],
  },
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "Premier League",
    fixture: {
      id: 104,
      referee: "Craig Pawson",
      timestamp: "2024-08-13T17:30:00Z",
      venue: {
        id: 4,
        name: "Stamford Bridge",
        city: "London",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 2,
        name: "Chelsea",
        winner: true,
      },
      away: {
        id: 7,
        name: "Leicester City",
        winner: false,
      },
    },
    goals: {
      home: 1,
      away: 0,
    },
    statistics: [],
    events: [],
    lineups: [],
  },

  // Bundesliga Fixtures
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "Bundesliga",
    fixture: {
      id: 201,
      referee: "Felix Zwayer",
      timestamp: "2024-08-10T14:30:00Z",
      venue: {
        id: 5,
        name: "Allianz Arena",
        city: "Munich",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 8,
        name: "Bayern Munich",
        winner: true,
      },
      away: {
        id: 9,
        name: "Borussia Dortmund",
        winner: false,
      },
    },
    goals: {
      home: 3,
      away: 1,
    },
    statistics: [],
    events: [],
    lineups: [],
  },
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "Bundesliga",
    fixture: {
      id: 202,
      referee: "Manuel Gräfe",
      timestamp: "2024-08-11T14:30:00Z",
      venue: {
        id: 6,
        name: "Signal Iduna Park",
        city: "Dortmund",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 9,
        name: "Borussia Dortmund",
        winner: true,
      },
      away: {
        id: 10,
        name: "RB Leipzig",
        winner: false,
      },
    },
    goals: {
      home: 2,
      away: 0,
    },
    statistics: [],
    events: [],
    lineups: [],
  },
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "Bundesliga",
    fixture: {
      id: 203,
      referee: "Daniel Siebert",
      timestamp: "2024-08-12T14:30:00Z",
      venue: {
        id: 7,
        name: "BayArena",
        city: "Leverkusen",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 11,
        name: "Bayer Leverkusen",
        winner: true,
      },
      away: {
        id: 12,
        name: "Schalke 04",
        winner: false,
      },
    },
    goals: {
      home: 1,
      away: 0,
    },
    statistics: [],
    events: [],
    lineups: [],
  },
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "Bundesliga",
    fixture: {
      id: 204,
      referee: "Sascha Stegemann",
      timestamp: "2024-08-13T14:30:00Z",
      venue: {
        id: 8,
        name: "Volksparkstadion",
        city: "Hamburg",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 13,
        name: "Hamburger SV",
        winner: false,
      },
      away: {
        id: 14,
        name: "Hertha Berlin",
        winner: true,
      },
    },
    goals: {
      home: 0,
      away: 2,
    },
    statistics: [],
    events: [],
    lineups: [],
  },

  // La Liga Fixtures
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "La Liga",
    fixture: {
      id: 301,
      referee: "Antonio Mateu Lahoz",
      timestamp: "2024-08-10T20:00:00Z",
      venue: {
        id: 9,
        name: "Camp Nou",
        city: "Barcelona",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 5,
        name: "Barcelona",
        winner: true,
      },
      away: {
        id: 6,
        name: "Real Madrid",
        winner: false,
      },
    },
    goals: {
      home: 1,
      away: 0,
    },
    statistics: [],
    events: [],
    lineups: [],
  },
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "La Liga",
    fixture: {
      id: 302,
      referee: "Jesús Gil Manzano",
      timestamp: "2024-08-11T20:00:00Z",
      venue: {
        id: 10,
        name: "Wanda Metropolitano",
        city: "Madrid",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 15,
        name: "Atletico Madrid",
        winner: true,
      },
      away: {
        id: 16,
        name: "Sevilla",
        winner: false,
      },
    },
    goals: {
      home: 2,
      away: 1,
    },
    statistics: [],
    events: [],
    lineups: [],
  },
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "La Liga",
    fixture: {
      id: 303,
      referee: "Alejandro Hernández",
      timestamp: "2024-08-12T20:00:00Z",
      venue: {
        id: 11,
        name: "San Mamés",
        city: "Bilbao",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 17,
        name: "Athletic Bilbao",
        winner: true,
      },
      away: {
        id: 18,
        name: "Valencia",
        winner: false,
      },
    },
    goals: {
      home: 2,
      away: 0,
    },
    statistics: [],
    events: [],
    lineups: [],
  },
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "La Liga",
    fixture: {
      id: 304,
      referee: "Juan Martínez Munuera",
      timestamp: "2024-08-13T20:00:00Z",
      venue: {
        id: 12,
        name: "Estadio de la Cerámica",
        city: "Villarreal",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 19,
        name: "Villarreal",
        winner: false,
      },
      away: {
        id: 20,
        name: "Real Betis",
        winner: true,
      },
    },
    goals: {
      home: 1,
      away: 2,
    },
    statistics: [],
    events: [],
    lineups: [],
  },

  // Serie A Fixtures
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "Serie A",
    fixture: {
      id: 401,
      referee: "Daniele Orsato",
      timestamp: "2024-08-10T19:45:00Z",
      venue: {
        id: 13,
        name: "San Siro",
        city: "Milan",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 7,
        name: "AC Milan",
        winner: false,
      },
      away: {
        id: 8,
        name: "Inter Milan",
        winner: true,
      },
    },
    goals: {
      home: 0,
      away: 2,
    },
    statistics: [],
    events: [],
    lineups: [],
  },
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "Serie A",
    fixture: {
      id: 402,
      referee: "Paolo Valeri",
      timestamp: "2024-08-11T19:45:00Z",
      venue: {
        id: 14,
        name: "Stadio Olimpico",
        city: "Rome",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 21,
        name: "AS Roma",
        winner: true,
      },
      away: {
        id: 22,
        name: "Napoli",
        winner: false,
      },
    },
    goals: {
      home: 3,
      away: 1,
    },
    statistics: [],
    events: [],
    lineups: [],
  },
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "Serie A",
    fixture: {
      id: 403,
      referee: "Gianluca Rocchi",
      timestamp: "2024-08-12T19:45:00Z",
      venue: {
        id: 15,
        name: "Stadio San Paolo",
        city: "Naples",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 22,
        name: "Napoli",
        winner: false,
      },
      away: {
        id: 23,
        name: "Juventus",
        winner: true,
      },
    },
    goals: {
      home: 1,
      away: 2,
    },
    statistics: [],
    events: [],
    lineups: [],
  },
  {
    createdAt: {
      type: new Date(),
    },
    live: {
      type: false,
    },
    league: "Serie A",
    fixture: {
      id: 404,
      referee: "Luca Banti",
      timestamp: "2024-08-13T19:45:00Z",
      venue: {
        id: 16,
        name: "Stadio Artemio Franchi",
        city: "Florence",
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 24,
        name: "Fiorentina",
        winner: true,
      },
      away: {
        id: 25,
        name: "Lazio",
        winner: false,
      },
    },
    goals: {
      home: 2,
      away: 0,
    },
    statistics: [],
    events: [],
    lineups: [],
  },
];
