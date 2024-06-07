import { gql } from "@apollo/client";

export const LEAGUE_TABLE_QUERY = gql`
  query LeagueTable($league: String!) {
  leagueStandings(league: $league) {
    team {
      name
      id
    }
    points
    form
    goalsDiff
    rank
    all {
      draw
      lose
      win
      played
      goals {
        for
        against
      }

    }
  }
}
`