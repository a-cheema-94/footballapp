import { Stack } from "react-bootstrap";
import { getLogosAndImages } from "../../../../functions/logoFunction";
import { SquadMemberType } from "../../../../queries/types/queryTypes";

type Props = {
  player: SquadMemberType;
};

const PlayerSearchResult = ({ player }: Props) => {
  return (
    <Stack
      className="align-items-center border rounded bg-hover-red-800 shadow"
      role="button"
      style={{
        maxWidth: "12rem",
        minWidth: "10rem",
      }}
    >
      <img
        src={getLogosAndImages("players", player.id)}
        alt=""
        style={{ width: "100%" }}
      />

      <div className="d-flex justify-content-center align-items-center w-100 gap-4 pt-2">
        {/* Number */}
        <p className="playfair-display-400 " style={{ fontSize: "3rem" }}>
          {player.number}
        </p>
        {/* info */}
        <div className="info">
          <p className="fw-bolder">{player.name}</p>
          <p className="">{player.position}</p>
        </div>
      </div>
    </Stack>
  );
};

export default PlayerSearchResult;
