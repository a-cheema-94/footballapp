import { FixtureType } from "../../../../queries/types/queryTypes";
import { FaRegCircleDot } from "react-icons/fa6";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeProvider";
import LogoOrPlayerImage from "../../../reusable/LogoOrPlayerImage";

type Props = {
  fixture: FixtureType;
};

type FixtureNameAndLogoProps = {
  teamId: number;
  teamName: string;
};

// .team[home/away].id
// .team[home/away].name
// .goals[home/away]

const LiveFixture = ({ fixture }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`rounded border flex-grow-1 ratio ratio-16x9 p-2 w-100 ${
        theme === "light"
          ? "bg-gray-200 bg-hover-gray-300 shadow"
          : "bg-dark-lighter-1 bg-hover-dark-lighter-2"
      }   shadow`}
      style={{
        maxWidth: "280px",
      }}
    >
      <div className="d-flex align-items-center">
        {/* home */}
        <FixtureNameAndLogo
          teamId={fixture?.teams.home.id}
          teamName={fixture?.teams.home.name}
        />

        {/* score */}
        <div className="score d-flex gap-2">
          {/* home score */}
          <div className="home-score">{fixture?.goals.home}</div>
          <p className="dash">-</p>
          {/* away score */}
          <div className="away-score">{fixture?.goals.away}</div>
        </div>

        {/* away */}
        <FixtureNameAndLogo
          teamId={fixture?.teams.away.id}
          teamName={fixture?.teams.away.name}
        />

        {fixture?.live.type && (
          <div className="live-fixture-icon text-red-500 scale-up align-self-start me-2">
            <FaRegCircleDot />
          </div>
        )}
      </div>
    </div>
  );
};

const FixtureNameAndLogo = ({ teamId, teamName }: FixtureNameAndLogoProps) => {
  return (
    <div className="away d-flex justify-content-center align-items-center flex-column">
      {/* logo */}
      <LogoOrPlayerImage category="teams" dimension="75%" id={teamId ?? 40}/>
      {/* Team name */}
      <p className="">{teamName}</p>
    </div>
  );
};

export default LiveFixture;
