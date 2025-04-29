import { Tab, Tabs } from "react-bootstrap";
import LiveScores from "./LiveScores/LiveScores";
import TopFootballStories from "./NewsStories/TopFootballStories";
import TopPlayerData from "./TopPlayerData/TopPlayerData";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeProvider";
import { FaRegCircleDot } from "react-icons/fa6";

type Props = {};

const Homepage = ({}: Props) => {
  const [tabKey, setTabKey] = useState<string | number>("top-scorers-and-assists");
  const [live, setLive] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  const handleTab = (key: string | number | null): void => {
    if (key !== null) setTabKey(key);
  };

  const handleFixturesLive = (): void => setLive(true);
  const handleFixturesNotLive = (): void => setLive(false);

  return (
    <div
      className={`${
        theme === "light" ? "bg-light text-dark" : "bg-dark text-light"
      }`}
    >
      {live && <div className="ms-2 mt-2 z-2 text-red-500 scale-up  position-absolute">
        <FaRegCircleDot />
      </div>}

      <Tabs
        activeKey={tabKey}
        onSelect={handleTab}
        fill
        justify
        className={`shadow text-truncate customTabs ${
          theme === "light" ? "light" : "dark"
        }`}
      >
        <Tab eventKey="live-scores" title="Live Scores">
          <LiveScores isLive={handleFixturesLive} isNotLive={handleFixturesNotLive}/>
        </Tab>
        <Tab
          eventKey="top-scorers-and-assists"
          title="Top Scorers/ Top Assists"
        >
          <TopPlayerData />
        </Tab>
        <Tab eventKey="football-news" title="Latest News">
          <TopFootballStories />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Homepage;
