import { gql } from "@apollo/client";

export const LAST_FIXTURE_QUERY = gql`
  query LastOrNextFixture($team: String!, $league: String!, $type: String!) {
  getLastOrNextFixture(team: $team, league: $league, type: $type) {
    fixture {
      id
    }

    goals {
      home
      away
    }
    teams {
      home {
        name
        id
        winner
      }
      away {
        id
        name
        winner
      }
    }
  }
}
`