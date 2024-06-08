import { useQuery } from "@apollo/client"
import { LAST_FIXTURE_QUERY } from "../../../queries/fixtures/lastFixtureQuery"

type Props = {}

const LastFixtureComponent = (props: Props) => {
  const {data, loading, error} = useQuery(LAST_FIXTURE_QUERY, { variables: {
    team: "Barcelona",
    league: "La Liga",
    type: "last"
  } });

  if(error) return <div>An Error occurred: {error.message}</div>
  if(loading) return <p>Loading ...</p>

  const { goals, teams  } = data.getLastOrNextFixture;


  return (
    <div>
      <p>{teams.home.name} vs {teams.away.name}</p>
      <p>{goals.home} - {goals.away}</p>
    </div>
  )
}

export default LastFixtureComponent