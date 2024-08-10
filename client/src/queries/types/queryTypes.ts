// TYPE: SQUADMEMBER

type SquadMemberType = {
  id: number;
  name: string;
  age: number;
  number: number;
  position: string;
  team: string;
  league: string;
};

// TYPE: PLAYER

type GeneralPlayerType = {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  nationality: string;
  height: string;
  weight: string;
};

type PlayerStatisticsType = {
  team: {
    id: number;
    name: string;
  };
  games: {
    appearances: number;
    minutes: number;
    position: string;
    captain: boolean;
  };
  substitutions: {
    in: number;
    out: number;
  };
  shots: {
    total: number;
    on: number;
  };
  goals: {
    total: number;
    conceded: number;
    assists: number;
    saves: number;
  };
  passes: {
    total: number;
    key: number;
    accuracy: number;
  };
  tackles: {
    total: number;
    blocks: number;
    interceptions: number;
  };
  duels: {
    won: number;
  };
  dribbles: {
    attempts: number;
    success: number;
    past: number;
  };
  fouls: {
    drawn: number;
    committed: number;
  };
  cards: {
    yellow: number;
    red: number;
  };
  penalty: {
    scored: number;
    missed: number;
    saved: number;
  };
};

type PlayerType = {
  league: string;
  general: GeneralPlayerType;
  statistics: PlayerStatisticsType;
};

// TYPE: TEAMSTATS

type TeamType = {
  id: number;
  name: string;
};

type TeamStatsFixturesType = {
  played: {
    total: number;
  };
  wins: {
    total: number;
  };
  draws: {
    total: number;
  };
  loses: {
    total: number;
  };
};

type TeamStatsGoalsType = {
  for: {
    total: {
      total: number;
    };
    average: {
      total: string;
    };
  };
  against: {
    total: {
      total: number;
    };
    average: {
      total: string;
    };
  };
};

type TeamStatsBiggestType = {
  streak: {
    wins: number;
    draws: number;
    loses: number;
  };
  wins: {
    home: string;
    away: string;
  };
  loses: {
    home: string;
    away: string;
  };
};

type TeamStatsPenaltyType = {
  scored: {
    total: number;
    percentage: string;
  };
  missed: {
    total: number;
    percentage: string;
  };
  total: number;
};

type TeamStatsType = {
  league: string;
  team: TeamType;
  form: string;
  fixtures: TeamStatsFixturesType;
  goals: TeamStatsGoalsType;
  biggest: TeamStatsBiggestType;
  clean_sheet: {
    home: number;
    away: number;
    total: number;
  };
  penalty: TeamStatsPenaltyType;
  lineups: {
    formation: string;
    played: number;
  };
};

// TYPE: TEAMSTANDING

type TableStatsType = {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: {
    for: number;
    against: number;
  };
};

type TeamStandingType = {
  league: string;
  rank: number;
  team: TeamType;
  points: number;
  goalsDiff: number;
  form: string;
  all: TableStatsType;
};

// TYPE: NEWS

type NewsType = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

// TYPE: FIXTURE

type FixtureTeamType = {
  id: number;
  name: string;
  winner: boolean;
};

type FixtureTeamStatsType = {
  team: {
    id: number;
    name: string;
  };
  statistics: {
    type: string;
    value: string;
  };
};

type EventInfoType = {
  id: number;
  name: string;
};

type FixtureEventType = {
  time: {
    elapsed: number;
    extra: number;
  };
  team: EventInfoType;
  player: EventInfoType;
  assist: EventInfoType;
  type: string;
  detail: string;
  comments: string;
};

type PlayerColorsType = {
  primary: string;
  number: string;
  border: string;
};

type PlayerFixtureType = {
  player: {
    id: number;
    name: string;
    number: number;
    pos: string;
    grid: string;
  };
};

type FixtureLineupType = {
  team: {
    id: number;
    name: string;
    colors: {
      player: PlayerColorsType;
      goalkeeper: PlayerColorsType;
    };
  };
  coach: {
    id: number;
    name: string;
  };
  formation: string;
  startXI: [PlayerFixtureType];
  substitutions: [PlayerFixtureType];
};

type FixtureType = {
  createdAt: {
    type: Date;
  };
  live: {
    type: boolean;
  };
  league: string;
  fixture: {
    id: number;
    referee: string;
    timestamp: string;
    venue: {
      id: number;
      name: string;
      city: string;
    };
    status: {
      long: string;
      short: string;
      elapsed: number;
    };
  };
  teams: {
    home: FixtureTeamType;
    away: FixtureTeamType;
  };
  goals: {
    home: number;
    away: number;
  };
  statistics: [FixtureTeamStatsType?];
  events: [FixtureEventType?];
  lineups: [FixtureLineupType?];
};

// EXPORTS

export type {
  SquadMemberType,
  PlayerType,
  TeamStatsType,
  TeamStandingType,
  NewsType,
  FixtureType,
  FixtureLineupType,
  PlayerFixtureType,
};
