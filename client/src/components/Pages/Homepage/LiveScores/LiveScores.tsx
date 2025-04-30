import { useContext, useEffect } from "react";
import { LiveFixtures, sortLiveFixturesByLeague, toCamelCase } from "./liveScoreFunctions";
import LiveMatchesByLeague from "./LiveMatchesByLeague";
import { LeagueNames, LEAGUES } from "../../../../functions/fixedData";
import { Breadcrumb } from "react-bootstrap";
import { ThemeContext } from "../../../../context/ThemeProvider";
import { useQuery } from "@apollo/client";
import { LIVE_SCORES_QUERY } from "../../../../queries/liveScoresQuery";

type Props = {
  isLive: () => void
  isNotLive: () => void
};

// Extra notes: polling => querying graph ql server after a specified interval, refetching => refetching data after user action i.e. button click => can have a loading state for refetching: networkStatus === NetworkStatus.refetch

const LiveScores = ({ isLive, isNotLive }: Props) => {
  
  const { data: liveFixturesData, loading, error } = useQuery(LIVE_SCORES_QUERY, {
    variables: {
      leagues: ["Premier League", "Bundesliga", "La Liga", "Serie A"],
    },
    // pollInterval: 5000
  });
  
  const liveMatches = sortLiveFixturesByLeague(liveFixturesData?.liveFixtures);
  
  const noLiveMatches = !liveMatches || Object.values(liveMatches).every(league => league.length === 0);
  
  useEffect(() => {
    console.log('rendered')
    if(noLiveMatches) {
      isNotLive() 
    } else {
      isLive()
    }

    return () => isNotLive()
  }, [liveMatches])
  const {theme} = useContext(ThemeContext);


  if (error) return <div>An Error occurred: {error.message}</div>;
  if (loading) return <p>Loading ...</p>;


  return (
    <div style={{ minHeight: '100dvh' }}>
      {noLiveMatches ? (
        <div>No current live fixtures</div>
      ) : (
        <div className="d-flex flex-column gap-3 my-2 ">
          <Breadcrumb className="align-self-end me-3 mt-3">
            {Object.keys(LEAGUES).map((leagueName, index) => {
              
              if(liveMatches[`${toCamelCase(leagueName) as keyof LiveFixtures}`].length > 0){
                return (
                  <Breadcrumb.Item  key={index} href={`#${leagueName}`}>
                    <span className={`${theme === 'light' ? 'text-dark bg-hover-teal-300' : 'text-light bg-hover-teal-700'}  rounded px-2 py-1`}>{leagueName}</span>
                  </Breadcrumb.Item>
                )
              }
              
              }
            
            )}
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
