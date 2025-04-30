import { gql } from "@apollo/client";

export const AUTOCOMPLETE_QUERY = gql`
  query AutoCompletePlayers($query: String!, $league: String!, $team: String, $range: String, $position: String) {
    autoCompletePlayer(query: $query, league: $league, team: $team, range: $range, position: $position) {
      id
      league
      name
      team
    }
  }
`;
