import { FixtureEventType } from "../../../../queries/types/queryTypes";
import LogoOrPlayerImage from "../../../reusable/LogoOrPlayerImage";

type Props = {
  event: FixtureEventType | undefined;
};

const MatchEvent = ({ event }: Props) => {
  return (
    <div className="d-flex gap-2 gap-4 justify-content-around border border-red-400">
      <span>{event?.time.elapsed} </span>
          <p>{event?.detail}</p>
          <p className="fs-6">{event?.team.name}</p>
            <LogoOrPlayerImage
              category="teams"
              dimension="2rem"
              id={event?.team.id ?? 40}
            />
        <div className="fs-6 fw-light">{event?.player.name}</div>
        {event?.assist.name != null && (
          <div className="fs-6 fw-light"> assisted by <span>{event?.assist.name}</span>
          </div>
        )}

    </div>
  );
};

export default MatchEvent;
