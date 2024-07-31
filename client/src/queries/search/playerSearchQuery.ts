import { gql } from "@apollo/client";

export const PLAYER_SEARCH_QUERY = gql`
  query PlayerSearch(
    $query: String!
    $league: String!
    $team: String
    $range: String
    $position: String
  ) {
    playerSearch(
      query: $query
      league: $league
      team: $team
      range: $range
      position: $position
    ) {
      age
      league
      id
      name
      number
      position
      team
    }
  }
`;
