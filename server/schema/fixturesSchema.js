export const fixturesTypeDefs = `
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
    value: String
  }

  type FixtureTeamStatsInfo {
    team: FixtureTeamStatGeneralInfo,
    statistics: [FixtureIndividualStatInfo]
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

  type PlayerColorsInfo {
    primary: String,
    number: String,
    border: String
  }

  type TeamColorsInfo {
    player: PlayerColorsInfo
    goalkeeper: PlayerColorsInfo
  }

  type CoachInfo {
    id: Int,
    name: String
  }

  type FixturePlayerProps {
    id: Int,
    name: String,
    number: Int,
    pos: String,
    grid: String
  }

  type FixturePlayerInfo {
    player: FixturePlayerProps
  }

  type FixtureTeamLineupInfo {
    id: Int,
    name: String,
    colors: TeamColorsInfo,
  }

  type FixtureLineupInfo {
    team: FixtureTeamLineupInfo
    coach: CoachInfo
    formation: String,
    startXI: [FixturePlayerInfo],
    substitutions: [FixturePlayerInfo]
  }

  type Fixture {
    live: Boolean
    league: String!
    fixture: FixtureGeneralInfo,
    teams: FixtureTeamsInfo,
    goals: FixtureGoalsInfo,
    statistics: [FixtureTeamStatsInfo],
    events: [FixtureEventsInfo],
    lineups: [FixtureLineupInfo],
  }
`