import { useQuery } from "@apollo/client";
import { LIVE_SCORES_QUERY } from "../../../../queries/liveScoresQuery";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FixtureType } from "../../../../queries/types/queryTypes";
import MatchEvent from "./MatchEvent";
import { Button } from "react-bootstrap";
import { FaRegCircleDot } from "react-icons/fa6";
import { FixtureInfo, FixtureNameAndLogo } from "../../Homepage/LiveScores/LiveFixture";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeProvider";
import useMediaQuery from "../../../reusable/customHooks/useMediaQuery";

type Props = {};

//  const sampleFixture: FixtureType = {
//   createdAt: {
//     type: new Date(),
//   },
//   live: {
//     type: false,
//   },
//   league: "Premier League",
//   fixture: {
//     id: 1001,
//     referee: "Michael Oliver",
//     timestamp: new Date().toISOString(),
//     venue: {
//       id: 301,
//       name: "Old Trafford",
//       city: "Manchester",
//     },
//     status: {
//       long: "Match Finished",
//       short: "FT",
//       elapsed: 90,
//     },
//   },
//   teams: {
//     home: {
//       id: 1,
//       name: "Manchester United",
//       winner: true,
//     },
//     away: {
//       id: 2,
//       name: "Chelsea",
//       winner: false,
//     },
//   },
//   goals: {
//     home: 2,
//     away: 1,
//   },


//   events: [
//     {
//       time: {
//         elapsed: 12,
//         extra: 0,
//       },
//       team: {
//         id: 2,
//         name: "Chelsea",
//       },
//       player: {
//         id: 201,
//         name: "Raheem Sterling",
//       },
//       assist: {
//         id: 202,
//         name: "Reece James",
//       },
//       type: "Goal",
//       detail: "Normal Goal",
//       comments: "Fast break goal from the right wing",
//     },
//     {
//       time: {
//         elapsed: 23,
//         extra: 0,
//       },
//       team: {
//         id: 1,
//         name: "Manchester United",
//       },
//       player: {
//         id: 101,
//         name: "Bruno Fernandes",
//       },
//       assist: {
//         id: 102,
//         name: "Marcus Rashford",
//       },
//       type: "Goal",
//       detail: "Normal Goal",
//       comments: "Left footed shot from the center of the box",
//     },
//     {
//       time: {
//         elapsed: 45,
//         extra: 1,
//       },
//       team: {
//         id: 1,
//         name: "Manchester United",
//       },
//       player: {
//         id: 103,
//         name: "Casemiro",
//       },
//       assist: {
//         id: 0,
//         name: "",
//       },
//       type: "Card",
//       detail: "Yellow Card",
//       comments: "Late tackle on midfield",
//     },
//     {
//       time: {
//         elapsed: 67,
//         extra: 0,
//       },
//       team: {
//         id: 1,
//         name: "Manchester United",
//       },
//       player: {
//         id: 104,
//         name: "Anthony Martial",
//       },
//       assist: {
//         id: 105,
//         name: "Luke Shaw",
//       },
//       type: "Goal",
//       detail: "Header",
//       comments: "Header from a corner kick",
//     },
//     {
//       time: {
//         elapsed: 78,
//         extra: 0,
//       },
//       team: {
//         id: 2,
//         name: "Chelsea",
//       },
//       player: {
//         id: 203,
//         name: "Thiago Silva",
//       },
//       assist: {
//         id: 0,
//         name: "",
//       },
//       type: "Card",
//       detail: "Red Card",
//       comments: "Professional foul as last man",
//     },
//     {
//       time: {
//         elapsed: 80,
//         extra: 0,
//       },
//       team: {
//         id: 1,
//         name: "Manchester United",
//       },
//       player: {
//         id: 106,
//         name: "Christian Eriksen",
//       },
//       assist: {
//         id: 0,
//         name: "",
//       },
//       type: "Substitution",
//       detail: "Substitution  In",
//       comments: "Tactical substitution",
//     },
//   ],
//   statistics: [],
//   lineups: [],
// };


const LiveMatchStats = (props: Props) => {
    const { theme } = useContext(ThemeContext);

  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state)
    return (
      <div>
        Page not found, return to <Link to="/">Home Page.</Link>
      </div>
    );

  const fixture: FixtureType = state.fixture;
  // const fixture: FixtureType = sampleFixture;
  const date = new Date().toLocaleDateString("en-GB");
  const flexColumnClass = "d-flex flex-column";
  const isScreenSmall = useMediaQuery("(min-width: 600px)");

  return (
    <div className={`${flexColumnClass} gap-3 ${theme === "light" ? "text-dark" : "text-light"}`}>
      <div className={`${flexColumnClass} m-1 justify-content-between`}>
        {/* back button and (date and team) */}
        <div className="d-flex justify-content-between mx-2 mt-1">
          <Button
            className="bg-teal-600 border-0 h-100 align-self-center text-nowrap"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        {/* team 1 and logo with score - team 2 and logo with score */}
          <div className="d-flex align-items-center">
            <FixtureInfo fixture={fixture}/>
          </div>


          {isScreenSmall && <div className="d-flex">
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
          </div>}
        </div>

      </div>

      {/* events */}
      <div className={`${flexColumnClass} align-items-center gap-3 m-2`}>
        {[...fixture.events].reverse().map((event, index) => (
          <MatchEvent key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default LiveMatchStats;
