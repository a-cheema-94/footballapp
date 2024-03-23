export const typeDefs = `#graphql
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

  type Query {
    topScorers(league: String!, limit: Int = 20, sortBy: String = "totalGoalsScored"): [PlayerData!]!
  }
`

// in database there is one collection representing the top scorers and assists from the 4 leagues. Each document represents one player and will have a league field, to base query on.