import { gql } from "@apollo/client";

export const SQUAD_MEMBER_QUERY = gql`
  query SquadByTeam($team: String!, $league: String!) {
  playerSquads(team: $team, league: $league) {
    name
    age
    number
    id
    position
    team
    league
  }
}
`