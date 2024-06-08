import { gql } from "@apollo/client";

export const AUTOCOMPLETE_QUERY = gql`
  query AutoCompletePlayers($query: String!) {
  autoCompletePlayer(query: $query) {
    id
    league
    name
    team
  }
}
`