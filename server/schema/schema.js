export const typeDefs = `#graphql
  #Top Player types

  type PlayerData {
    league: String!
    general: GeneralPlayerInfo!
    statistics: PlayerStatistics!
  }

  type GeneralPlayerInfo {
    id: Int!
    name: String!
    firstname: String!
    lastname: String!
    age: Int!
    nationality: String!
    height: String!
    weight: String!
  }

  type PlayerStatistics {
    team: Team!
    game: GameInfo!
    substitutions: Substitutions!
    shots: Shots!
    goals: Goals!
    passes: Passes!
    tackles: Tackles!
    duels: Duels!
    dribbles: Dribbles!
    fouls: Fouls!
    cards: Cards!
    penalty: Penalty!
  }

  type Team {
    id: Int!
    name: String!
  }
  
  type GameInfo {
    appearances: Int
    minutes: Int
    position: String
    captain: Boolean
  }
  
  type Substitutions {
    in: Int
    out: Int
  }
  
  type Shots {
    total: Int
    on: Int
  }
  
  type Goals {
    total: Int
    conceded: Int
    assists: Int
    saves: Int
  }
  
  type Passes {
    total: Int
    key: Int
    accuracy: Int
  }
  
  type Tackles {
    total: Int
    blocks: Int
    interceptions: Int
  }
  
  type Duels {
    won: Int
  }
  
  type Dribbles {
    attempts: Int
    success: Int
    past: Int
  }
  
  type Fouls {
    drawn: Int
    committed: Int
  }
  
  type Cards {
    yellow: Int
    red: Int
  }
  
  type Penalty {
    scored: Int
    missed: Int
    saved: Int
  }

  #Standings Types

  type TableStatGoals {
    for: Int
    against: Int
  }

  type TableStats {
    played: Int
    win: Int
    draw: Int
    lose: Int
    goals: TableStatGoals
  }

  type TeamStanding {
    league: String!
    rank: Int
    team: Team
    points: Int
    goalsDiff: Int
    form: String
    all: TableStats
  }

  #Squad member types

  type SquadMember {
    id: Int,
    name: String,
    age: Int,
    number: Int,
    position: String,
    team: String,
    league: String
  }

  # Team Stats types
  
  type TeamInfo {
    id: Int,
    name: String
  }
  
  type FixtureInfo {
    played: FixtureTotalInfo
    wins: FixtureTotalInfo
    draws: FixtureTotalInfo
    loses: FixtureTotalInfo
  }

  type FixtureTotalInfo {
    total: Int
  }
  
  type TeamGoalsInfo {
    for: GoalStats,
    against: GoalStats
  }

  type GoalStats {
    total: GoalStat,
    average: GoalStat
  }

  type GoalStat {
    total: Int
  }

  
  type BiggestInfo {
    streak: StreakInfo,
    wins: BiggestGamesInfo,
    loses: BiggestGamesInfo
  }

  type StreakInfo {
    wins: Int
    draws: Int
    loses: Int
  }
  
  type BiggestGamesInfo {
    home: String
    away: String
  }
  
  
  type CleanSheetInfo {
    home: Int
    away: Int
    total: Int
  }
  
  
  type TeamPenaltyInfo {
    scored: PenaltyGoalsInfo
    missed: PenaltyGoalsInfo
    total: Int
  }
  
  type PenaltyGoalsInfo {
    total: Int
    percentage: String
  }
  
  
  type TeamLineupsInfo {
    formation: String
    played: Int
  }
  
  type TeamStats {
    league: String,
    team: TeamInfo,
    form: String,
    fixtures: FixtureInfo,
    goals: TeamGoalsInfo,
    biggest: BiggestInfo,
    clean_sheet: CleanSheetInfo,
    penalty: TeamPenaltyInfo,
    lineups: TeamLineupsInfo
  }

  #Fixtures endpoint

  type FixtureVenueInfo {
    id: Int,
    name: String,
    city: String
  }

  type FixtureStatusInfo {
    long: String,
    short: String,
    elapsed: Int
  }

  type FixtureGeneralInfo {
    id: Int,
    referee: String,
    timestamp: String,
    venue: FixtureVenueInfo,
    status: FixtureStatusInfo
  }

  type FixtureTeamInfo {
    id: Int,
    name: String,
    winner: Boolean
  }

  type FixtureTeamsInfo {
    home: FixtureTeamInfo,
    away: FixtureTeamInfo
  }

  type FixtureGoalsInfo {
    home: Int,
    away: Int
  }

  type FixtureTeamStatGeneralInfo {
    id: Int,
    name: String
  }

  type FixtureIndividualStatInfo {
    type: String,
    value: Int
  }

  type FixtureTeamStatsInfo {
    team: FixtureTeamStatGeneralInfo,
    statistics: [FixtureIndividualStatInfo]
  }

  type FixtureStatsInfo {
    home: FixtureTeamStatsInfo,
    away: FixtureTeamStatsInfo
  }

  type FixtureEventTimeInfo {
    elapsed: Int,
    extra: Int
  }

  type FixtureEventInfo {
    id: Int,
    name: String
  }

  type FixtureEventsInfo {
    time: FixtureEventTimeInfo,
    team: FixtureEventInfo,
    player: FixtureEventInfo,
    assist: FixtureEventInfo,
    type: String,
    detail: String,
    comments: String
  }

  type TeamColorsInfo {
    primary: String,
    number: String,
    border: String
  }

  type CoachInfo {
    id: Int,
    name: String
  }

  type FixturePlayerInfo {
    id: Int,
    name: String,
    number: Int,
    pos: String,
    grid: String
  }

  type FixtureTeamLineupInfo {
    id: Int,
    name: String,
    colors: TeamColorsInfo,
    coach: CoachInfo
    formation: String,
    startXI: [FixturePlayerInfo],
    substitutions: [FixturePlayerInfo]
  }

  type FixtureLineupInfo {
    team: FixtureTeamLineupInfo
  }

  type FixtureLineupsInfo {
    home: FixtureLineupInfo,
    away: FixtureLineupInfo
  }

  type Fixture {
    league: String!
    fixture: FixtureGeneralInfo,
    teams: FixtureTeamsInfo,
    goals: FixtureGoalsInfo,
    statistics: FixtureStatsInfo,
    events: [FixtureEventsInfo],
    lineups: FixtureLineupsInfo,

  }

  type Query {
    topPlayers(league: String!, limit: Int = 20, sortBy: String!): [PlayerData!]!
    leagueStandings(league: String!, limit: Int = 20): [TeamStanding!]!
    playerSquads(team: String!, league: String!): [SquadMember!]!
    teamStats(team: String!, league: String!): TeamStats!
    playerStats(player: String!, team: String!, league: String!): PlayerData!
    getLastOrNextFixture(team: String!, league: String!, type: String!): Fixture!
    getLastFixtureInfo(team: String!, league: String!): Fixture!
  }
`

// in database there is one collection representing the top scorers and assists from the 4 leagues. Each document represents one player and will have a league field, to base query on.