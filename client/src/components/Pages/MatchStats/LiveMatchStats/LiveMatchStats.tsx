import { useQuery } from "@apollo/client"
import { LIVE_SCORES_QUERY } from "../../../../queries/liveScoresQuery"

type Props = {}

const LiveMatchStats = (props: Props) => {
  const { data, loading, error } = useQuery(LIVE_SCORES_QUERY, { variables: { leagues: 'Premier League' } });

  if(error) return <div>An Error occurred: {error.message}</div>
  if(loading) return <p>Loading ...</p>

  console.log(data)

  return (
    <div>
      {data.liveFixtures.length === 0 ? (
        <p>No live fixtures currently</p>
      ) : 'need to update, since live fixtures in progress'}
    </div>
  )
}

export default LiveMatchStats