import { Stack } from "react-bootstrap";
import {
  SquadMemberType,
  TeamStandingType,
} from "../../../../queries/types/queryTypes";
import LogoOrPlayerImage from "../../../reusable/LogoOrPlayerImage";
import { ThemeContext } from "../../../../context/ThemeProvider";
import { useContext } from "react";

type Props = {
  player: SquadMemberType;
  team: TeamStandingType[];
};

const PlayerSearchResult = ({ player, team }: Props) => {
  const {theme} = useContext(ThemeContext);
  
  const teamId = team.find((team) => team.team.name === player.team)?.team.id;

  return (
    <Stack
      className={`align-items-center border rounded ${theme === 'light' ? 'bg-hover-gray-200' : 'bg-hover-dark-lighter-1'} shadow position-relative`}
      role="button"
      style={{
        maxWidth: "12rem",
        minWidth: "10rem",
      }}
    >
      <LogoOrPlayerImage category="players" dimension="100%" id={player.id}/>

      <LogoOrPlayerImage category="teams" dimension="40px" id={teamId ?? 44} optionalClasses="bg-transparent position-absolute top-0 mt-1 ms-1 start-0"/>

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
