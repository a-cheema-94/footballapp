import { Stack } from "react-bootstrap";
import { FixtureType } from "../../../../queries/types/queryTypes";

type Props = {
  fixture: FixtureType;
};

const LiveFixture = ({ fixture }: Props) => {
  return (
    <Stack direction="horizontal" className="border border-black rounded gap-2">
      <div className="d-flex align-items-center gap-2">
        <div className="">{fixture.teams.home.name}</div>
        <span>{fixture.goals.home}</span>
      </div>
      <div>-</div>
      <div className="d-flex align-items-center gap-2">
        <span>{fixture.goals.away}</span>
        <div className="">{fixture.teams.away.name}</div>
      </div>
    </Stack>
  );
};

export default LiveFixture;
