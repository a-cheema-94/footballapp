import { Stack } from "react-bootstrap";
import { getLogosAndImages } from "../../../../functions/logoFunction";
import {
  SquadMemberType,
  TeamStandingType,
} from "../../../../queries/types/queryTypes";

type Props = {
  player: SquadMemberType;
  team: TeamStandingType[];
};

const PlayerSearchResult = ({ player, team }: Props) => {
  const teamId = team.find((team) => team.team.name === player.team)?.team.id;

  return (
    <Stack
      className="align-items-center border rounded bg-hover-teal-600 shadow position-relative"
      role="button"
      style={{
        maxWidth: "12rem",
        minWidth: "10rem",
      }}
    >
      <img
        src={getLogosAndImages("players", player.id)}
        alt=""
        className=""
        style={{ width: "100%" }}
      />

      <img
        src={getLogosAndImages("teams", teamId ?? 44)}
        alt=""
        className="bg-transparent position-absolute top-0 mt-1 ms-1 start-0 object-fit-contain"
        width={40}
        height={40}
      />

      <div className="d-flex justify-content-center align-items-center w-100 gap-4 pt-1 px-2">
        {/* Number */}
        <p className="playfair-display-400 mb-4" style={{ fontSize: "3rem" }}>
          {player.number}
        </p>
        {/* info */}
        <div className="">
          <p className="fw-bolder mb-2">{player.name}</p>
          <p className="">{player.position}</p>
        </div>
      </div>
    </Stack>
  );
};

export default PlayerSearchResult;
