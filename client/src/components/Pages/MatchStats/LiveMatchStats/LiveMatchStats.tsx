import { useQuery } from "@apollo/client";
import { LIVE_SCORES_QUERY } from "../../../../queries/liveScoresQuery";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FixtureType } from "../../../../queries/types/queryTypes";
import MatchEvent from "./MatchEvent";
import { Button } from "react-bootstrap";
import { FaRegCircleDot } from "react-icons/fa6";
import { FixtureInfo, FixtureNameAndLogo } from "../../Homepage/LiveScores/LiveFixture";

type Props = {};

const LiveMatchStats = (props: Props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state)
    return (
      <div>
        Page not found, return to <Link to="/">Home Page.</Link>
      </div>
    );

  const fixture: FixtureType = state.fixture;
  const date = new Date().toLocaleDateString("en-GB");
  const flexColumnClass = "d-flex flex-column";

  return (
    <div className={`${flexColumnClass}`}>
      <div className={`${flexColumnClass}`}>
        {/* back button and (date and team) */}
        <div className="d-flex justify-content-between mx-2 mt-1">
          <Button
            className="bg-teal-600 border-0 h-100 align-self-center"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        {/* team 1 and logo with score - team 2 and logo with score */}
        <div className="d-flex align-items-center">
          <FixtureInfo fixture={fixture}/>
        </div>


          <div className="d-flex">
            <div className={flexColumnClass}>
              <p style={{ fontSize: ".9rem" }} className="lh-0 fw-light">
                <span className="fw-normal">Date: </span>
                {date}
              </p>
              <p style={{ fontSize: ".9rem" }} className="lh-0 fw-light">
                <span className="fw-normal">Competition: </span>
                {fixture.league}
              </p>
            </div>
            <div className="text-red-500">
              <FaRegCircleDot />
            </div>
          </div>
        </div>

        <p>{state.fixture.teams.home.name}</p>
        <p>{state.fixture.teams.away.name}</p>
      </div>

      {/* events */}
      <div className={`${flexColumnClass}`}>
        {[...fixture.events].reverse().map((event, index) => (
          <MatchEvent key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default LiveMatchStats;
