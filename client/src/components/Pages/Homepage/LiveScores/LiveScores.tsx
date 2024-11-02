import { sampleFixtures } from "./sampleLiveScoreData";
import { useContext, useEffect, useState } from "react";
import { LiveFixtures, sortLiveFixturesByLeague } from "./liveScoreFunctions";
import LiveMatchesByLeague from "./LiveMatchesByLeague";
import { LeagueNames, LEAGUES } from "../../../../functions/fixedData";
import { Breadcrumb } from "react-bootstrap";
import { ThemeContext } from "../../../../context/ThemeProvider";

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

  const {theme} = useContext(ThemeContext);

  // TODO: integrate api with live fixture component
  // const { data, loading, error } = useQuery(LIVE_SCORES_QUERY, {
  //   variables: {
  //     leagues: ["Premier League", "Bundesliga", "Serie A", "La Liga"],
  //   },
  // });
  // if (error) return <div>An Error occurred: {error.message}</div>;
  // if (loading) return <p>Loading ...</p>;

  useEffect(() => {
    setLiveMatches(sortLiveFixturesByLeague(sampleFixtures));
  }, []);

  const noLiveMatches = Object.values(liveMatches).every(league => league.length === 0);

  return (
    <div style={{ minHeight: '100dvh' }}>
      {noLiveMatches ? (
        <div>No current live fixtures</div>
      ) : (
        <div className="d-flex flex-column gap-3 my-2 ">
          <Breadcrumb className="align-self-end me-3 mt-3">
            {Object.keys(LEAGUES).map((leagueName, index) => (
              <Breadcrumb.Item  key={index} href={`#${leagueName}`}>
                <span className={`${theme === 'light' ? 'text-dark bg-hover-teal-300' : 'text-light bg-hover-teal-700'}  rounded px-2 py-1`}>{leagueName}</span>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>

          {Object.values(liveMatches).map((liveFixturesByLeague, index) => (
            <LiveMatchesByLeague
              key={index}
              liveFixtures={liveFixturesByLeague}
              leagueName={Object.keys(LEAGUES)[index] as LeagueNames}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveScores;
