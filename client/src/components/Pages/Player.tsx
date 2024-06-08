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

  console.log(data)

  // const { general, league, statistics } = data.playerStats;

  return (
    <div>Player</div>
  )
}

export default Player