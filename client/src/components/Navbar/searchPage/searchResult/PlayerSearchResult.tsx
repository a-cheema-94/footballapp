import { Stack } from "react-bootstrap";
import { getLogosAndImages } from "../../../../functions/logoFunction";
import { SquadMemberType } from "../../../../queries/types/queryTypes";

type Props = {
  player: SquadMemberType;
};

const PlayerSearchResult = ({ player }: Props) => {
  return (
    <Stack
      className="align-items-center border rounded gap-3 m-2 p-2 bg-hover-teal-100 shadow"
      role="button"
      style={{
        maxWidth: '12rem'
      }}
    >
      <img
        src={getLogosAndImages("players", player.id)}
        alt=""
        style={{ width: "150px", height: "150px" }}
        
      />

      <div className="d-flex flex-column gap-2 m-3 ">
        <p className="">Name: {player.name}</p>
        <p>Age: {player.age}</p>
        <p>Position: {player.position}</p>
      </div>
    </Stack>
  );
};

export default PlayerSearchResult;
