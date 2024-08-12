import { Stack } from "react-bootstrap";
import { FixtureType } from "../../../../queries/types/queryTypes";
import { getLogosAndImages } from "../../../../functions/logoFunction";

type Props = {
  fixture: FixtureType;
};

const flexAndAlign = 'd-flex align-items-center'

// flex-column  gap-2

const LiveFixture = ({ fixture }: Props) => {
  return (
    <Stack
      direction="horizontal"
      className="border border-black rounded gap-4 p-2"
    >
      <div className={`${flexAndAlign}`}>
        <div className={`${flexAndAlign } flex-column gap-2`}>
          <img
            src={getLogosAndImages("teams", fixture.teams.home.id)}
            style={{ width: "5em" }}
          />
          <p className="text-center">{fixture.teams.home.name}</p>
        </div>
      </div>

      <span className="p-2 text-nowrap" >{fixture.goals.home} - {fixture.goals.away}</span>

      <div className={`${flexAndAlign}`}>
        <div className={`${flexAndAlign } flex-column gap-2`}>
          <img
            src={getLogosAndImages("teams", fixture.teams.away.id)}
            style={{ width: "5em" }}
          />
          <p className="text-center">{fixture.teams.away.name}</p>
        </div>
      </div>
    </Stack>
  );
};

export default LiveFixture;
