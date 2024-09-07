import React from "react";
import { FixtureType } from "../../../../queries/types/queryTypes";
import LiveFixture from "./LiveFixture";
import LiveFixtureSlider from "./LIveFixtureSlider";
import { getLogosAndImages } from "../../../../functions/logoFunction";
import { LEAGUES } from "../../../../functions/fixedData";

type Props = {
  liveFixtures: FixtureType[];
  leagueName: "Premier League" | "Serie A" | "Bundesliga" | "La Liga";
};

// TODO: Slider implementation and dropdown

const LiveMatchesByLeague = ({ liveFixtures, leagueName }: Props) => {
  return (
    <div
      id={leagueName}
      className="d-flex flex-column justify-content-center align-items-center my-3"
    >
      {/* slider here */}
      <div className="d-flex align-items-center justify-content-center gap-2">
        <img
          className="w-25"
          src={getLogosAndImages("leagues", LEAGUES[leagueName])}
        />
        <p className="fw-semibold fs-5">{leagueName}</p>
      </div>
      <LiveFixtureSlider liveFixtures={liveFixtures} />
    </div>
  );
};

export default LiveMatchesByLeague;
