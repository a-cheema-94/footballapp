import { useQuery } from "@apollo/client"
import { TEAM_STATS_QUERY } from "../../../queries/teamStatsQuery"

type Props = {}

const TeamStats = (props: Props) => {
  const {data, loading, error} = useQuery(TEAM_STATS_QUERY, { variables: {
    team: "Liverpool",
    league: "Premier League"
  } })

  if(error) return <div>An Error occurred: {error.message}</div>
  if(loading) return <p>Loading ...</p>


  const { biggest, clean_sheet, form, team } = data.teamStats

  return (
    <div>
      <p>Team: {team.name}</p>
      <p>Biggest Home wins: {biggest.wins.home}</p>
      <p>Total Clean Sheets: {clean_sheet.total}</p>
      <p>form: {form}</p>

    </div>
  )
}

export default TeamStats