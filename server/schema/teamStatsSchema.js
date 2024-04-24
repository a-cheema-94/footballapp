export const teamStatsTypeDefs =  `
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
`