export const standingsTypeDefs = `
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
    isRelegated: Boolean,
    isChampion: Boolean,
  }
`;
