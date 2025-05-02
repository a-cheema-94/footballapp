import { FixtureEventType } from "../../../../queries/types/queryTypes";
import LogoOrPlayerImage from "../../../reusable/LogoOrPlayerImage";

type Props = {
  event: FixtureEventType | undefined;
};

const MatchEvent = ({ event }: Props) => {
  return (
    <div className="d-flex gap-2">
      <span>{event?.time.elapsed} </span>
      
      <div className="d-flex flex-column">
        <div className="fs-5 d-flex gap-3">{event?.detail} <LogoOrPlayerImage category="teams" dimension="40%" id={event?.team.id ?? 40}/> <div>{event?.team.name}</div></div>
      </div>

    </div>
  );
};

export default MatchEvent;
