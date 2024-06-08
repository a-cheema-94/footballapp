import { useQuery } from "@apollo/client"
import { LIVE_SCORES_QUERY } from "../../../queries/liveScoresQuery"

type Props = {}

// Extra notes: polling => querying graph ql server after a specified interval, refetching => refetching data after user action i.e. button click => can have a loading state for refetching: networkStatus === NetworkStatus.refetch
// can use useLazyQuery instead of useQuery if you want to query server based off events and not on render:
// const [queryFunction, { loading, error, data }] = useLazyQuery(GRAPHQL_QUERY)
// when calling: queryFunction({ variables: { inputs } })

const LiveScores = (props: Props) => {
  const { data, loading, error } = useQuery(LIVE_SCORES_QUERY, { variables: { leagues: [ "Premier League", "Bundesliga", "Serie A", "La Liga" ] } });

  if(error) return <div>An Error occurred: {error.message}</div>
  if(loading) return <p>Loading ...</p>


  return (
    <>
      {data.liveFixtures.length === 0 ? <div>No current live fixtures</div> : 
      
      data.liveFixtures.map((fixture: any, index: number) => (
        <div key={index}>
          <p>{fixture.teams.home.name}</p>
          <p>{fixture.goals.home}, {fixture.goals.away}</p>
        </div>
      ))}
    </>
  )
}

export default LiveScores