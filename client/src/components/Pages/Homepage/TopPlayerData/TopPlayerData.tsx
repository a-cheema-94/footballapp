import { useQuery } from "@apollo/client";
import { TOP_PLAYER_QUERY } from "../../../../queries/topPlayerQueries";
import TopPlayerInfo from "./TopPlayerInfo";
import { SquadMemberType } from "../../../../queries/types/queryTypes";
import LeagueSelector from "../../../reusable/leagueSelector";
import { useState } from "react";
import { LeagueNames } from "../../../../functions/fixedData";
import { Button, Table } from "react-bootstrap";

type Props = {};

const TopPlayerData = (props: Props) => {
  const [league, setLeague] = useState<LeagueNames>('Premier League');
  const [goalsOrAssists, setGoalsOrAssists] = useState<string>('goals');

  const { data, error, loading } = useQuery(TOP_PLAYER_QUERY, {
    variables: {
      league,
      sortBy: goalsOrAssists,
    },
  });

  if (error) return <div>An Error occurred: {error.message}</div>;
  if (loading) return <p>Loading ...</p>;

  const handlePlayerLeague = (league: LeagueNames) => setLeague(league)

  // TODO => see if can simplify.
  return (
    <div>
      <div className="d-flex gap-2 justify-content-center m-2">
        <Button onClick={() => setGoalsOrAssists('goals')} className={`border-0 ${goalsOrAssists === 'goals' ? 'bg-orange-600 text-white' : 'bg-white text-black'}`}>Top Goals</Button>
        <Button onClick={() => setGoalsOrAssists('assists')} className={`border-0 ${goalsOrAssists === 'assists' ? 'bg-orange-600 text-white' : 'bg-white text-black'}`}>Top Assists</Button>
        <LeagueSelector setPlayerLeague={handlePlayerLeague} league={league}/>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Successful Dribbles</th>
            <th>Appearances</th>
            <th>Passes (Total / Accuracy)</th>
            <th>Shots (Total / On Target)</th>
          </tr>
        </thead>
        <tbody>

          {data.topPlayers.map((player: SquadMemberType, index: number) => (
            <TopPlayerInfo key={index} player={player} />
          ))}
        </tbody>
      </Table>
      
    </div>
  );
};

export default TopPlayerData;
