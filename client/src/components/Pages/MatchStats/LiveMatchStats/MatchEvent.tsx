import { FixtureEventType } from "../../../../queries/types/queryTypes";
import LogoOrPlayerImage from "../../../reusable/LogoOrPlayerImage";
import useMediaQuery from "../../../reusable/customHooks/useMediaQuery";

type Props = {
  event: FixtureEventType | undefined;
};

const MatchEvent = ({ event }: Props) => {
  const ifScreenTooSmall = useMediaQuery("(max-width: 600px)");
  console.log(ifScreenTooSmall)

  const matchEventWidth = ifScreenTooSmall ? "100%" : "75%";
  return (
    <div className="d-flex justify-content-between align-items-center gap-4 border border-red-400 rounded p-2" style={{ width: `${matchEventWidth}` }}>
      <div>
        {/* event logo here */}
        <span>{event?.time.elapsed} </span>
      </div>
        <div className="d-flex flex-column">

          <div className="event-detail-and-team d-flex">
            <p>{event?.detail}</p>
              

          </div>
          <div className="event-player-name">

            <div className="fs-6 fw-light">{event?.player.name}</div>
            {event?.assist.name != null && (
              <div className="fs-6 fw-light"> Assist: <span>{event?.assist.name}</span>
              </div>
            )}
          </div>


          
        </div>
        
        <LogoOrPlayerImage
          category="teams"
          dimension="2rem"
          id={event?.team.id ?? 40}
        />

    </div>
  );
};

export default MatchEvent;
