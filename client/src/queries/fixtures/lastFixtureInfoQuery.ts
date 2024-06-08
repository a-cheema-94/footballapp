import { gql } from "@apollo/client";

export const LAST_FIXTURE_INFO_QUERY = gql`
  query LastFixtureInfo($team: String!, $league: String!) {
  getLastFixtureInfo(team: $team, league: $league) {
    events {
      comments
      assist {
        name
        id
      }
      detail
      player {
        id
        name
      }
      team {
        id
        name
      }
      time {
        elapsed
        extra
      }
      type

    }
    
    fixture {
      id
      referee
      status {
        short
      }
      venue {
        city
        name
      }
      timestamp

    }

    goals {
      away
      home
    }

    league
    lineups {
      coach {
        id
        name
      }
      formation
      startXI {
        player {
          grid
          id
          name
          number
          pos
        }
      }
      substitutions {
        player {
          grid
          id
          name
          number
          pos 
        }
      }

      team {
        colors {
          goalkeeper {
            border
            number
            primary
          }
          player {
            border
            number
            primary
          }

        }
        id
        name
      }
      
    }
  }
}
`