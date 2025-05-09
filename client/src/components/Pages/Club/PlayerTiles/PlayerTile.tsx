import { SquadMemberType } from "../../../../queries/types/queryTypes";
import LogoOrPlayerImage from "../../../reusable/LogoOrPlayerImage";

type Props = {
  player: SquadMemberType
};

const PlayerTile = ({ player }: Props) => {
  return (
    <div
      className="d-flex flex-column align-items-center border border-black"
      style={{ width: "125px" }}
    >
      {/* <LogoOrPlayerImage category="players" dimension="20px" id={player.id}/> */}
      <p>
        {player.name} ({player.age})
      </p>
      <p>{player.number}</p>
      <p>{player.position}</p>
      <p>{player.team}</p>
    </div>
  );
};

export default PlayerTile;
