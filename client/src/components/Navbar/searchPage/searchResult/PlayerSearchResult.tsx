import { Stack } from "react-bootstrap";
import {
  SquadMemberType,
  TeamStandingType,
} from "../../../../queries/types/queryTypes";
import LogoOrPlayerImage from "../../../reusable/LogoOrPlayerImage";
import { ThemeContext } from "../../../../context/ThemeProvider";
import { useContext } from "react";
import { removeAposHTMLCharacter } from "../../../../functions/removeApos";

type Props = {
  player: SquadMemberType;
  team: TeamStandingType[];
};

const PlayerSearchResult = ({ player, team }: Props) => {
  const {theme} = useContext(ThemeContext);
  
  const teamId = team.find((team) => team.team.name === player.team)?.team.id;

  return (
    <Stack
      className={`align-items-center border pt-3 rounded ${theme === 'light' ? 'bg-hover-gray-200' : 'bg-hover-dark-lighter-1'} shadow position-relative`}
      role="button"
      style={{
        maxWidth: "12rem",
        minWidth: "10rem",
      }}
    >
      <LogoOrPlayerImage category="players" dimension="70%" id={player.id} optionalClasses=""/>

      <LogoOrPlayerImage category="teams" dimension="40px" id={teamId ?? 44} optionalClasses="bg-transparent position-absolute top-0 start-0 mt-1"/>

      <div className="d-flex justify-content-center align-items-center w-100 gap-4 pt-1 px-2">
        {/* Number */}
        <p className="playfair-display-400 mb-4" style={{ fontSize: "3rem" }}>
          {player.number}
        </p>
        {/* info */}
        <div className="">
          <p className="fw-bolder mb-2">{removeAposHTMLCharacter(player.name ?? '')}</p>
          <p className="">{player.position}</p>
        </div>
      </div>
    </Stack>
  );
};

export default PlayerSearchResult;
