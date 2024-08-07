import { Stack } from "react-bootstrap";
import { getLogosAndImages } from "../../../../functions/logoFunction";
import { SquadMemberType } from "../../../../queries/types/queryTypes";

type Props = {
  player: SquadMemberType;
};

const PlayerSearchResult = ({ player }: Props) => {
  return (
    <Stack direction="horizontal" className="gap-3 m-2">
      <img
        src={getLogosAndImages("players", player.id)}
        alt=""
        style={{ width: "150px", height: "150px" }}
      />

      <div className="d-flex flex-column gap-2">
        <p>Name: {player.name}</p>
        <p>Position: {player.position}</p>
      </div>
    </Stack>
  );
};

export default PlayerSearchResult;
