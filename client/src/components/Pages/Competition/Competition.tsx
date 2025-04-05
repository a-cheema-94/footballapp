import { useLazyQuery } from "@apollo/client";
import { LEAGUE_TABLE_QUERY } from "../../../queries/leagueTableQuery";
import { TeamStandingType } from "../../../queries/types/queryTypes";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import LogoOrPlayerImage from "../../reusable/LogoOrPlayerImage";
import FormGraphic from "./FormGraphic";
import LeagueSelector from "../../reusable/leagueSelector";
import { LeagueNames } from "../../../functions/fixedData";
import { ThemeContext } from "../../../context/ThemeProvider";

type Props = {};

const Competition = (props: Props) => {
  // todo: see if should put id in URL when navigating to team tables, individual teams and players. => router

  const [teams, setTeams] = useState<TeamStandingType[]>();
  const [currentLeague, setCurrentLeague] = useState<string>("Premier League");

  const [teamsFromDB, { data: teamData, loading, error }] = useLazyQuery(
    LEAGUE_TABLE_QUERY,
    {
      onCompleted: (teamData: any) => {
        setTeams(teamData.leagueStandings);
      },
    }
  );

  const { theme } = useContext(ThemeContext);

  const { state } = useLocation();
  const { league: leagueGivenInLink, teams: teamsGivenInLink } = state;

  const fetchTeams = (teamsGivenInLink: any) => {
    if (teamsGivenInLink) {
      setTeams(teamsGivenInLink);
      setCurrentLeague(leagueGivenInLink);
      // click on screen to get rid of side menu
    } else {
      console.log("called: teamsFromDb");
      teamsFromDB({ variables: { league: currentLeague } });
    }
  };

  useEffect(() => {
    fetchTeams(teamsGivenInLink);
  }, [teamsGivenInLink]);

  const handlePlayerLeague = (league: LeagueNames): void => {
    setCurrentLeague(league);
    console.log("called: teamsFromDb");
    teamsFromDB({ variables: { league } });
  };

  if (error) return <div>An Error occurred: {error.message}</div>;
  if (loading) return <p>Loading ...</p>;

  return (
    <div className="d-flex flex-column gap-4 align-items-center">
      {/* league name and league selector */}
      <div className="d-flex gap-3 align-items-center mt-3">
        <LeagueSelector
          league={currentLeague}
          setPlayerLeague={handlePlayerLeague}
        />
        <h5 className={`${theme === "light" ? "text-black" : "text-white"}`}>
          {currentLeague}
        </h5>
      </div>
      {/* table */}
      {teams ? (
        <Container fluid>
        <Table responsive="md" striped hover className="border rounded mw-100 mx-auto">
          <thead>
            <tr>
              <th colSpan={2}>Club</th>
              <th>Pld</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Pts</th>
              <th>Last 5</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team: TeamStandingType, index: number) => (
              <tr className="" key={index}>
                <td>{team.rank}</td>
                <td className="d-flex gap-3">
                  <LogoOrPlayerImage
                    category="teams"
                    dimension="20px"
                    id={team.team.id}
                  />

                  {team.team.name}
                </td>
                <td>{team.all.played}</td>
                <td>{team.all.win}</td>
                <td>{team.all.draw}</td>
                <td>{team.all.lose}</td>
                <td>{team.all.goals.for}</td>
                <td>{team.all.goals.against}</td>
                <td>{team.goalsDiff}</td>
                <td>{team.points}</td>
                <td>
                  <FormGraphic form={team.form} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Container>
      ) : (
        <div>data unavailable for now</div>
      )}
    </div>
  );
};

export default Competition;