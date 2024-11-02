import { useQuery } from "@apollo/client";
import { TOP_PLAYER_QUERY } from "../../../../queries/topPlayerQueries";
import TopPlayerInfo from "./TopPlayerInfo";
import {
  PlayerType,
  SquadMemberType,
} from "../../../../queries/types/queryTypes";
import LeagueSelector from "../../../reusable/leagueSelector";
import { useContext, useState } from "react";
import { LeagueNames } from "../../../../functions/fixedData";
import { Button, Container, Table } from "react-bootstrap";
import { ThemeContext } from "../../../../context/ThemeProvider";

type Props = {};

const TopPlayerData = (props: Props) => {
  const [league, setLeague] = useState<LeagueNames>("Premier League");
  const [goalsOrAssists, setGoalsOrAssists] = useState<string>("goals");

  const {theme} = useContext(ThemeContext);

  const { data, error, loading } = useQuery(TOP_PLAYER_QUERY, {
    variables: {
      league,
      sortBy: goalsOrAssists,
    },
  });

  if (error) return <div>An Error occurred: {error.message}</div>;
  if (loading) return <p>Loading ...</p>;

  const handlePlayerLeague = (league: LeagueNames) => setLeague(league);

  return (
    <div
      className="pt-2 rounded d-block mx-4 mt-2 "
    >
      <div className="d-flex gap-2 justify-content-center m-2">
        
        <LeagueSelector setPlayerLeague={handlePlayerLeague} league={league} />

        {/* top goals and assist buttons */}
        {["goals", "assists"].map((dataType, index) => (
          <Button
            key={index}
            onClick={() => setGoalsOrAssists(`${dataType}`)}
            className={`${
              goalsOrAssists === dataType
                ? "bg-teal-600 border-0"
                : theme === 'light' ? 'bg-gray-200 text-dark border-dark' : 'bg-dark-lighter-1 text-light border-light'
            }`}
          >
            Top {dataType}
          </Button>
        ))}
      </div>

      <Table striped hover responsive="md">
        <thead className="fw-bold">
          <tr className="text-center">
            <th></th>

            <th>Goals</th>

            <th>Assists</th>
            <th>Successful Dribbles</th>
            <th>Appearances</th>
            <th>Total Attempted Passes/ Successful passes per 90 mins</th>
            <th>Shots (Total / On Target)</th>
          </tr>
        </thead>
        <tbody>
          {data.topPlayers.map((player: PlayerType, index: number) => (
            <TopPlayerInfo key={index} player={player} />
          ))}
        </tbody>
      </Table>
      {/* </Container> */}
    </div>
  );
};

export default TopPlayerData;
