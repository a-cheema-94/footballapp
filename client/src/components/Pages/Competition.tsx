import { useQuery } from "@apollo/client"
import { LEAGUE_TABLE_QUERY } from "../../queries/leagueTableQuery"
import TopPlayerData from "./Homepage/TopPlayerData/TopPlayerData"

type Props = {}

const Competition = (props: Props) => {
  const {data, loading, error} = useQuery(LEAGUE_TABLE_QUERY, { variables: {
    league: "Premier League"
  } })

  if(error) return <div>An Error occurred: {error.message}</div>
  if(loading) return <p>Loading ...</p>


  return (
    <div>
      {data.leagueStandings.map((team: any, index: number) => (
        <div className="d-flex gap-2" key={index}>
          <div>{team.team.name}</div>
          <div>{team.points}</div>
          <div>{team.rank}</div>
        </div>
      ))}

      <TopPlayerData />
    </div>
  )
}

export default Competition