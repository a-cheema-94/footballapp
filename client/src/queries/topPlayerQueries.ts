import { gql } from '@apollo/client'

export const TOP_PLAYER_QUERY = gql`
  query TopPlayers($league: String!, $sortBy: String!) {
  topPlayers(league: $league, sortBy: $sortBy) {
    general {
      id
      age
      firstname
      lastname
    }
    statistics {
      team {
        id
        name
      }
      goals {
        total
        assists
      }
    }
  }
}
`