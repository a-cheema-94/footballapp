import { gql } from "@apollo/client";

export const LIVE_SCORES_QUERY = gql`
  query LiveFixtures($leagues: [String!]!) {
  liveFixtures(leagues: $leagues) {
    teams {
      home {
        name
        id
      }
      away {
        name
        id
      }
    }
    league
    live
    events {
      assist {
        name
      }
      comments
      detail
      player {
        name
      }

      team {
        name
        id
      }

      time {
        elapsed
      }
      type
      
    }
    
    goals {
      home
      away
    }

    fixture {
      id
      venue {
        name
      }
      status {
        elapsed
      }
    }
  }
}
`