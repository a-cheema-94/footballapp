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
    
    goals {
      home
      away
    }

    fixture {
      venue {
        name
      }
    }
  }
}
`