import { gql } from "@apollo/client";

export const TEAM_STATS_QUERY = gql`
  query TeamStats($team: String!, $league: String!) {
  teamStats(team: $team, league: $league) {
    biggest {
      wins {
        home
        away
      }
      loses {
        home
        away
      }
      streak {
        wins
      }
    }
    clean_sheet {
      total
    }
    fixtures {
      wins {
        total
      }
      draws {
        total
      }
      loses {
        total
      }
      played {
        total
      }
    }

    form
    goals {
      against {
        total {
          total
        }
      }
      for {
        total {
          total
        }
      }      
    }

    league
    lineups {
      formation
      played
    }
    penalty {
      missed {
        percentage
        total
      }
      scored {
        percentage
        total
      }
      total
    }

    team {
      name
      id
    }
  }
}
`