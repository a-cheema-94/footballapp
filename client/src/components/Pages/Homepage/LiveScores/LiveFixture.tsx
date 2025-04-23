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
      className={`position-relative rounded border flex-grow-1 ratio ratio-16x9 p-2 w-100 ${
        theme === "light"
          ? "bg-gray-200 bg-hover-gray-300 shadow"
          : "bg-dark-lighter-1 bg-hover-dark-lighter-2"
      }   shadow`}
      style={{
        maxWidth: "280px",
      }}
    >
      <div className="d-flex justify-content-center align-items-center">
        {/* home */}
        <FixtureNameAndLogo
          teamId={fixture?.teams.home.id}
          teamName={fixture?.teams.home.name}
        />

        {/* score */}
        <div className="d-flex gap-2 fs-5">
          {/* home score */}
          <div className="fw-semibold">{fixture?.goals.home}</div>
          <p className="">-</p>
          {/* away score */}
          <div className="fw-semibold">{fixture?.goals.away}</div>
        </div>

        {/* away */}
        <FixtureNameAndLogo
          teamId={fixture?.teams.away.id}
          teamName={fixture?.teams.away.name}
        />

        {fixture?.live && (
          <div className="text-red-500 scale-up position-absolute top-0 end-0">
            <FaRegCircleDot />
          </div>
        )}
      </div>
    </div>
  );
};

const FixtureNameAndLogo = ({ teamId, teamName }: FixtureNameAndLogoProps) => {
  return (
    <div className="away d-flex justify-content-center align-items-center flex-column gap-1 w-50">
      {/* logo */}
      <LogoOrPlayerImage category="teams" dimension="60%" id={teamId ?? 40}/>
      {/* Team name */}
      <p className="">{teamName}</p>
    </div>
  );
};

export default LiveFixture;
