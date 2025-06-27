import { Link, useLocation } from "react-router-dom";
import { FixtureType } from "../../../../queries/types/queryTypes";
import MatchEvent from "./MatchEvent";
import { Button } from "react-bootstrap";
import { FaRegCircleDot } from "react-icons/fa6";
import {
  FixtureInfo,
  FixtureNameAndLogo,
} from "../../Homepage/LiveScores/LiveFixture";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeProvider";
import useMediaQuery from "../../../reusable/customHooks/useMediaQuery";

type Props = {};

const sampleFixture: FixtureType = {
  createdAt: {
    type: new Date(),
  },
  live: {
    type: false,
  },
  league: "Premier League",
  fixture: {
    id: 1001,
    referee: "Michael Oliver",
    timestamp: 1746466416214,
    venue: {
      id: 301,
      name: "Old Trafford",
      city: "Manchester",
    },
    status: {
      long: "Match Finished",
      short: "FT",
      elapsed: 90,
    },
  },
  teams: {
    home: {
      id: 33,
      name: "Manchester United",
      winner: true,
    },
    away: {
      id: 49,
      name: "Chelsea",
      winner: false,
    },
  },
  goals: {
    home: 2,
    away: 1,
  },

  events: [
    {
      time: {
        elapsed: 12,
        extra: 0,
      },
      team: {
        id: 49,
        name: "Chelsea",
      },
      player: {
        id: 201,
        name: "Raheem Sterling",
      },
      assist: {
        id: 202,
        name: "Reece James",
      },
      type: "Goal",
      detail: "Normal Goal",
      comments: "Fast break goal from the right wing",
    },
    {
      time: {
        elapsed: 23,
        extra: 0,
      },
      team: {
        id: 33,
        name: "Manchester United",
      },
      player: {
        id: 101,
        name: "Bruno Fernandes",
      },
      assist: {
        id: 102,
        name: "Marcus Rashford",
      },
      type: "Goal",
      detail: "Normal Goal",
      comments: "Left footed shot from the center of the box",
    },
    {
      time: {
        elapsed: 45,
        extra: 1,
      },
      team: {
        id: 33,
        name: "Manchester United",
      },
      player: {
        id: 103,
        name: "Casemiro",
      },
      assist: {
        id: null,
        name: null,
      },
      type: "Card",
      detail: "Yellow Card",
      comments: "Late tackle on midfield",
    },
    {
      time: {
        elapsed: 67,
        extra: 0,
      },
      team: {
        id: 33,
        name: "Manchester United",
      },
      player: {
        id: 104,
        name: "Anthony Martial",
      },
      assist: {
        id: 105,
        name: "Luke Shaw",
      },
      type: "Goal",
      detail: "Normal Goal",
      comments: "Header from a corner kick",
    },
    {
      time: {
        elapsed: 70,
        extra: 0,
      },
      team: {
        id: 33,
        name: "Manchester United",
      },
      player: {
        id: 104,
        name: "Anthony Martial",
      },
      assist: {
        id: null,
        name: null,
      },
      type: "Var",
      detail: "Penalty confirmed",
      comments: null,
    },
    {
      time: {
        elapsed: 78,
        extra: 0,
      },
      team: {
        id: 49,
        name: "Chelsea",
      },
      player: {
        id: 203,
        name: "Thiago Silva",
      },
      assist: {
        id: null,
        name: null,
      },
      type: "Card",
      detail: "Red Card",
      comments: "Professional foul as last man",
    },
    {
      time: {
        elapsed: 80,
        extra: 0,
      },
      team: {
        id: 33,
        name: "Manchester United",
      },
      player: {
        id: 106,
        name: "Christian Eriksen",
      },
      assist: {
        id: 0,
        name: "Mason Mount",
      },
      type: "subst",
      detail: "Substitution 1",
      comments: "Tactical substitution",
    },
  ],
  statistics: [],
  lineups: [],
};

const LiveMatchStats = (props: Props) => {
  const { theme } = useContext(ThemeContext);

  const { state } = useLocation();

  if (!state)
    return (
      <div>
        Page not found, return to <Link to="/">Home Page.</Link>
      </div>
    );

  const fixture: FixtureType = state.fixture;
  // const fixture: FixtureType = sampleFixture;
  const date = new Date(fixture.fixture.timestamp * 1000).toLocaleDateString(
    "en-GB"
  );
  const isScreenSmall = useMediaQuery("(min-width: 600px)");
  return (
    <header
      className={`position-relative ${
        theme === "light" ? "text-dark" : "text-light"
      }`}
      style={{ minHeight: "100dvh" }}
    >
      <div className="d-flex mb-5">
        <Button className="position-absolute start-0 ms-2 bg-teal-400 border-0 ">
          <Link className="text-decoration-none text-light" to="/">
            Go Back
          </Link>
        </Button>
        <div className="text-red-500 position-absolute top-0 end-0 me-2">
          <FaRegCircleDot />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        <div
          className="d-flex align-items-center rounded p-3 mx-auto"
          style={{ maxWidth: "400px", fontSize: ".9rem" }}
        >
          <FixtureInfo fixture={fixture} />
        </div>

        <div
          className={`mt-3 lh-1 d-flex ${
            isScreenSmall
              ? "flex-column"
              : "flex-row justify-content-center column-gap-3"
          } flex-wrap me-5`}
          style={{ fontSize: ".9rem" }}
        >
          <p className="fw-semibold">
            Date: <span className="fw-light">{date}</span>
          </p>
          <p className="fw-semibold">
            Competition: <span className="fw-light">{fixture.league}</span>
          </p>
          <p className="fw-semibold">
            Referee:{" "}
            <span className="fw-light">{fixture.fixture.referee ?? "n/a"}</span>
          </p>
          <p className="fw-semibold">
            Venue:{" "}
            <span className="fw-light">{fixture.fixture.venue.name}</span>
          </p>
        </div>
      </div>

      {fixture.events.length > 0 ? (
        <div className={`d-flex flex-column align-items-center gap-2`}>
          {[...fixture.events].reverse().map((event, index) => (
            <MatchEvent key={index} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center">No Events recorded yet</p>
      )}
    </header>
  );
};

export default LiveMatchStats;
