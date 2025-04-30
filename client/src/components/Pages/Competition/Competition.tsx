import { useLazyQuery } from "@apollo/client";
import { LEAGUE_TABLE_QUERY } from "../../../queries/leagueTableQuery";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LeagueSelector from "../../reusable/leagueSelector";
import { LeagueNames } from "../../../functions/fixedData";
import { ThemeContext } from "../../../context/ThemeProvider";
import CompetitionTable from "./CompetitionTable";

type Props = {};

// todo => implement champion / relegation states.
  // todo => add isChampion and isRelegated fields to Team Standing type
  // todo => add logic to take in whole final array of teams and change 1st, 18th, 19th or 20th if necessary

const Competition = (props: Props) => {

  const { state } = useLocation();
  const { theme } = useContext(ThemeContext);

  const [teamsFromDB, { data: teamData, loading, error }] = useLazyQuery(
    LEAGUE_TABLE_QUERY);
  
  useEffect(() => {
    teamsFromDB({variables: { league: state.league }})
  }, [state]);
  
  const handlePlayerLeague = (league: LeagueNames): void => {
    state.league = league
    teamsFromDB({variables: { league }})

  };

  if (error) return <div>An Error occurred: {error.message}</div>;
  if (loading) return <p>Loading ...</p>;

  return (
    <div className="d-flex flex-column gap-4 align-items-center">
      {/* league name and league selector */}
      <div className="d-flex gap-3 align-items-center mt-3">
        <LeagueSelector
          league={state.league}
          setPlayerLeague={handlePlayerLeague}
        />
        <h5 className={`${theme === "light" ? "text-black" : "text-white"}`}>
          {state.league}
        </h5>
      </div>
      {/* table */}
      <CompetitionTable leagueTable={teamData?.leagueStandings}/>
      
    </div>
  );
};

export default Competition;