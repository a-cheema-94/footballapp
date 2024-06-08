import { useQuery } from "@apollo/client"
import { TOP_PLAYER_QUERY } from "../../../../queries/topPlayerQueries"
import TopPlayerInfo from "./TopPlayerInfo";

type Props = {}

const TopPlayerData = (props: Props) => {
  const { data, error, loading } = useQuery(TOP_PLAYER_QUERY, { variables: {
    league: 'Premier League',
    sortBy: "goals"
  } });

  if(error) return <div>An Error occurred: {error.message}</div>
  if(loading) return <p>Loading ...</p>

  return (
    <div>
      {data.topPlayers.map((player: any, index: number) => (
        <TopPlayerInfo key={index} player={player}/>
      ))}
    </div>
  )
}

export default TopPlayerData