import { useQuery } from "@apollo/client";
import { SQUAD_MEMBER_QUERY } from "../../../../queries/squadMemberQuery";
import { SquadMemberType } from "../../../../queries/types/queryTypes";

type Props = {};

const PlayerTiles = (props: Props) => {
  // const { data, loading, error } = useQuery(SQUAD_MEMBER_QUERY, {
  //   variables: {
  //     team: "Liverpool",
  //     league: "Premier League",
  //   },
  // });

  // if (error) return <div>An Error occurred: {error.message}</div>;
  // if (loading) return <p>Loading ...</p>;

  return (
    <div className="d-flex flex-wrap gap-3">
      {/* {data.playerSquads.map((player: SquadMemberType, index: number) => (
        <PlayerCard key={index} player={player} />
      ))} */}
      data unavailable for now
    </div>
  );
};

export default PlayerTiles;
