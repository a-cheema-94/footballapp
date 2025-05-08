import { FixtureEventType } from "../../../../queries/types/queryTypes";
import LogoOrPlayerImage from "../../../reusable/LogoOrPlayerImage";
import useMediaQuery from "../../../reusable/customHooks/useMediaQuery";

type Props = {
  event: FixtureEventType | undefined;
};

const MatchEvent = ({ event }: Props) => {
  const ifScreenTooSmall = useMediaQuery("(max-width: 600px)");

  const matchEventWidth = ifScreenTooSmall ? "100%" : "75%";

  const getEventHeadingAndIcon = (event: FixtureEventType | undefined): string[] => {
    let finalEventDetail: string = "";
    let iconName: string = "";
    let comment: string = ""
    // types and details
    if(event?.type === 'Goal' && event?.detail === "Normal Goal") {
      finalEventDetail = "GOAL!!!";
      iconName = "goal"
    } else if (event?.type === 'Goal' && event?.detail === "Own Goal") {
      finalEventDetail = "OWN GOAL!!!";
      iconName = "own goal"
    } else if (event?.type === 'Goal' && event?.detail === "penalty") {
      finalEventDetail = "GOAL!!!, PENALTY";
      iconName = "goal"
    } else if (event?.type === 'Card' && event?.detail === "Yellow Card") {
      finalEventDetail = "Yellow Card";
      iconName = "yellow card"
      comment = event.comments
    } else if (event?.type === 'Card' && event?.detail === "Red Card") {
      finalEventDetail = "Red Card";
      iconName = "red card"
      comment = event.comments
    } else if (event?.type === 'subst' && event?.detail.split(' ')[0] === "Substitution") {
      finalEventDetail = "Substitution";
      iconName = "subs"
    } else if (event?.type === 'Var' && event?.detail) {
      finalEventDetail = `VAR: ${event.detail}`;
      iconName = "var"
    } 

    return [finalEventDetail, iconName, comment];
  };
  return (
    <div
      className="d-flex justify-content-between align-items-center gap-4 border border-red-400 rounded p-2 cursor-pointer"
      style={{ width: `${matchEventWidth}` }}
    >
      <div>
        {/* event logo here */}
        <span>{event?.time.elapsed} </span>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="event-detail-and-team d-flex fs-4">
          <p>{getEventHeadingAndIcon(event)[0]}</p>
          {/* <p>{event?.detail}</p> */}
        </div>
        <div className="d-flex flex-column align-items-center">
          <div className="fs-6">{event?.player.name}</div>
          {event?.assist.name != null && (
            <div className="d-flex  gap-2 fw-light" style={{ fontSize: ".95rem" }}>
              <p>{event.type === "subst" ? "<->" : "assist"}</p> <span>{event?.assist.name}</span>
            </div>
          )}
        </div>
      </div>

      <LogoOrPlayerImage
        category="teams"
        dimension="5%"
        id={event?.team.id ?? 40}
      />
    </div>
  );
};

export default MatchEvent;
