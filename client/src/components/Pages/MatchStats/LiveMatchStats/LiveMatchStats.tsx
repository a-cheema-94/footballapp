import { useQuery } from "@apollo/client";
import { LIVE_SCORES_QUERY } from "../../../../queries/liveScoresQuery";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

const LiveMatchStats = (props: Props) => {
  // const { data, loading, error } = useQuery(LIVE_SCORES_QUERY, { variables: { leagues: 'Premier League' } });

  // if(error) return <div>An Error occurred: {error.message}</div>
  // if(loading) return <p>Loading ...</p>

  // console.log(data)
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state)
  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <p>{state.fixture.teams.home.name}</p>
      <p>{state.fixture.teams.away.name}</p>
    </div>
  );
};

export default LiveMatchStats;
