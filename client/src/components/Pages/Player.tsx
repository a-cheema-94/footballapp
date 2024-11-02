import { useQuery } from "@apollo/client"
import { PLAYER_STATS_QUERY } from "../../queries/playerStatsQuery"

type Props = {}

const Player = (props: Props) => {
  const { data, loading, error } = useQuery(PLAYER_STATS_QUERY, { variables: {
    player: "J. Gomez",
    team: "Liverpool",
    league: "Premier League"
  } })

  if(error) return <div>An Error occurred: {error.message}</div>
  if(loading) return <p>Loading ...</p>

  // console.log(data)

  const { general, league, statistics } = data.playerStats;

  return (
    <div className="">
      {/* general stats */}
      <div className="d-flex gap-2">
        
        <div>
          <p>{general.name}</p>
          <p>{general.firstname}</p>
          <p>{general.lastname}</p>
          <p>{general.nationality}</p>
          <p>{general.height}</p>
          <p>{general.weight}</p>
        </div>

        {/* main stats */}
        <div className="">
          <p>{statistics.cards.red}</p>
          <p>{statistics.cards.yellow}</p>
          <p>{statistics.goals.conceded}</p>
          <p>{statistics.goals.assists}</p>
        </div>
      </div>

      
    </div>
  )
}

export default Player