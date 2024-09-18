import { gql } from '@apollo/client'

export const TOP_PLAYER_QUERY = gql`
  query TopPlayers($league: String!, $sortBy: String!) {
  topPlayers(league: $league, sortBy: $sortBy) {
    general {
      id
      age
      firstname
      lastname
      name
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
      goals {
        total
        assists
      }
      dribbles {
        success
      }
      games {
        appearences
        minutes
      }
      passes {
        accuracy
        total
      }
      penalty {
        scored
      }
      shots {
        total
        on
      }
    }
  }
}
`

 /* <th>Name</th>
<th>Club</th>
<th>Goals</th>
<th>Assists</th>
<th>Successful Dribbles</th>
<th>Appearances</th>
<th>Passes (Total / Accuracy)</th>
<th>Shots (Total / On Target)</th>
</tr> */