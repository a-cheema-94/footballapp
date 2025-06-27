import { useContext } from "react";
import { FixtureType } from "../../../../queries/types/queryTypes";
import LiveFixtureSlider from "./LIveFixtureSlider";
import { LeagueNames, LEAGUES } from "../../../../functions/fixedData";
import { ThemeContext } from "../../../../context/ThemeProvider";
import LogoOrPlayerImage from "../../../reusable/LogoOrPlayerImage";

type Props = {
  liveFixtures: FixtureType[];
  leagueName: LeagueNames;
};

const LiveMatchesByLeague = ({ liveFixtures, leagueName }: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {liveFixtures.length > 0 && (
        <div
          id={leagueName}
          className="d-flex flex-column align-items-center mb-4"
        >
          {/* slider here */}

          {/* todo: make link to competition home page */}

          <div className="d-flex align-items-center justify-content-center gap-2 rounded py-3">
            <LogoOrPlayerImage
              category="leagues"
              dimension="25%"
              id={LEAGUES[leagueName]}
              optionalClasses={`w-25 ${
                theme === "light" ? "bg-teal-200" : "bg-teal-400"
              }  rounded p-2 border`}
              smallLoadingSpinner={false}
            />

            <p className="fw-semibold fs-5 my-2">{leagueName}</p>
          </div>

          <LiveFixtureSlider liveFixtures={liveFixtures} />
        </div>
      )}
    </>
  );
};

export default LiveMatchesByLeague;
