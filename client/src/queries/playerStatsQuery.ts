import { gql } from "@apollo/client";

export const PLAYER_STATS_QUERY = gql`
  query PlayerStats($player: String!, $team: String!, $league: String!) {
  playerStats(player: $player, team: $team, league: $league) {
    general {
      name
      firstname
      lastname
      id
      height
      nationality
      weight
    }
    league
   statistics {
    cards {
      red
      yellow
    }
    dribbles {
      attempts
      past
      success
    }
    duels {
      won
    }
    fouls {
      committed
      drawn
    }
    game {
      appearances
      captain
      minutes
      position    
    }
    goals {
      assists
      conceded
      saves
      total
    }
    passes {
      accuracy
      key
      total
    }
    penalty {
      missed
      saved
      scored
    }
    shots {
      on
      total
    }
    substitutions {
      in
      out
    }
    tackles {
      blocks
      interceptions
      total
    }
    team {
      id
      name
    }
   }
  }
}
`