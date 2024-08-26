import { Container, Stack } from "react-bootstrap";
import { FixtureType } from "../../../../queries/types/queryTypes";
import { getLogosAndImages } from "../../../../functions/logoFunction";
import { FaRegCircleDot } from "react-icons/fa6";

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
  return (
    <div className="border border-black rounded p-4 d-flex align-items-center gap-3 m-2">
      {/* home */}
      <FixtureNameAndLogo
        teamId={fixture?.teams.home.id}
        teamName={fixture?.teams.home.name}
      />

      {/* score */}
      <div className="score d-flex  gap-2 fw-semibold fs-2">
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
        <div className="live-fixture-icon align-self-start text-red-500 scale-up">
          <FaRegCircleDot />
        </div>
      )}
    </div>
  );
};

const FixtureNameAndLogo = ({ teamId, teamName }: FixtureNameAndLogoProps) => {
  return (
    <div className="away d-flex flex-column align-items-center gap-2 ">
      {/* logo */}
      <div className="logo" style={{ width: "50px" }}>
        <img className="w-100" src={getLogosAndImages("teams", teamId ?? 40)} />
      </div>
      {/* Team name */}
      <p style={{ width: "100px" }} className="text-center">
        {teamName}
      </p>
    </div>
  );
};

export default LiveFixture;
