import { useQuery } from "@apollo/client";
import { LIVE_SCORES_QUERY } from "../../../../queries/liveScoresQuery";
import { FixtureType } from "../../../../queries/types/queryTypes";
import { sampleFixtures } from "./sampleLiveScoreData";
import { useEffect, useState } from "react";
import { LiveFixtures, sortLiveFixturesByLeague } from "./liveScoreFunctions";
import LiveFixture from "./LiveFixture";

type Props = {};

// Extra notes: polling => querying graph ql server after a specified interval, refetching => refetching data after user action i.e. button click => can have a loading state for refetching: networkStatus === NetworkStatus.refetch
// can use useLazyQuery instead of useQuery if you want to query server based off events and not on render:
// const [queryFunction, { loading, error, data }] = useLazyQuery(GRAPHQL_QUERY)
// when calling: queryFunction({ variables: { inputs } })

const LiveScores = (props: Props) => {
  const [liveMatches, setLiveMatches] = useState<LiveFixtures>({
    premierLeague: [],
    bundesliga: [],
    laLiga: [],
    serieA: [],
  });

  const { data, loading, error } = useQuery(LIVE_SCORES_QUERY, {
    variables: {
      leagues: ["Premier League", "Bundesliga", "Serie A", "La Liga"],
    },
  });

  useEffect(() => {
    setLiveMatches(sortLiveFixturesByLeague(sampleFixtures));
  }, []);

  if (error) return <div>An Error occurred: {error.message}</div>;
  if (loading) return <p>Loading ...</p>;

  return (
    <div className="m-2">
      <h3>Live Scores</h3>
      {sampleFixtures.length === 0 ? (
        <div>No current live fixtures</div>
      ) : (
        <div className="d-flex gap-2">
          {liveMatches.premierLeague.map(
            (fixture: FixtureType, index: number) => (
              <LiveFixture key={index} fixture={fixture} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default LiveScores;
