import { TbArrowsRightLeft } from "react-icons/tb";
import { FixtureEventType } from "../../../../queries/types/queryTypes";
import LogoOrPlayerImage from "../../../reusable/LogoOrPlayerImage";
import useMediaQuery from "../../../reusable/customHooks/useMediaQuery";
import { IoFootball } from "react-icons/io5";
import { FaTv } from "react-icons/fa6";

type Props = {
  event: FixtureEventType | undefined;
};

const Card = ({ color }: { color: string }) => {
  return <div className={`football-card ${color}`}></div>
}

const MatchEvent = ({ event }: Props) => {
  const ifScreenTooSmall = useMediaQuery("(max-width: 600px)");

  const matchEventWidth = ifScreenTooSmall ? "100%" : "75%";

  const getEventHeadingAndIcon = (event: FixtureEventType | undefined): string[] => {
    let finalEventDetail: string = "";
    let iconName: any = <IoFootball className="fs-1"/>;
    let comment: string | null = ""
    // types and details
    if(event?.type === 'Goal' && event?.detail === "Normal Goal") {
      finalEventDetail = "GOAL!!!";
    } else if (event?.type === 'Goal' && event?.detail === "Own Goal") {
      finalEventDetail = "OWN GOAL!!!";
    } else if (event?.type === 'Goal' && event?.detail === "penalty") {
      finalEventDetail = "GOAL!!!, PENALTY";
    } else if (event?.type === 'Card' && event?.detail === "Yellow Card") {
      finalEventDetail = "Yellow Card";
      iconName = <Card color="yellow"/>
      comment = event.comments
    } else if (event?.type === 'Card' && event?.detail === "Red Card") {
      finalEventDetail = "Red Card";
      iconName = <Card color="red"/>
      comment = event.comments
    } else if (event?.type === 'subst' && event?.detail.split(' ')[0] === "Substitution") {
      finalEventDetail = "Substitution";
      iconName = <TbArrowsRightLeft className="fs-1"/>
    } else if (event?.type === 'Var' && event?.detail) {
      finalEventDetail = `VAR: ${event.detail}`;
      iconName = <FaTv className="fs-1"/>
    } 

    return [finalEventDetail, iconName, comment];
  };

  const matchEventInfo = getEventHeadingAndIcon(event);
  return (
    <div
      className="position-relative d-flex justify-content-between align-items-center gap-4 border border-red-400 rounded p-2 cursor-pointer"
      style={{ width: `${matchEventWidth}` }}
    >
      <div className="">
        {/* event logo here */}
        <span className="position-absolute top-0 start-0 ms-1">{event?.time.elapsed} </span>
        <div className="m-3">{matchEventInfo[1]}</div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="event-detail-and-team d-flex fs-4">
          <p>{matchEventInfo[0]}</p>
          {/* <p>{event?.detail}</p> */}
        </div>
        <div className="d-flex flex-column align-items-center">
          <div className="fs-6">{event?.player.name}</div>
          {event?.assist.name != null && (
            <div className="d-flex  gap-2 fw-light" style={{ fontSize: ".95rem" }}>
              <p>{event.type === "subst" ? <TbArrowsRightLeft className="fs-6"/> : "assist"}</p> <span>{event?.assist.name}</span>
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
