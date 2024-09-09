import { Tab, Tabs } from "react-bootstrap";
import LiveScores from "./LiveScores/LiveScores";
import TopFootballStories from "./NewsStories/TopFootballStories";
import TopPlayerData from "./TopPlayerData/TopPlayerData";
import { useState } from "react";

type Props = {
};

const Homepage = ({ }: Props) => {
  const [tabKey, setTabKey] = useState<string | number>("live-scores");

  const handleTab = (key: string | number | null): void => {
    if (key !== null) setTabKey(key);
  };

  return (
    <div>
      <Tabs activeKey={tabKey} onSelect={handleTab} fill className="customTabs">
        <Tab eventKey="live-scores" title="Live Scores">
          <LiveScores />
        </Tab>
        <Tab
          eventKey="top-scorers-and-assists"
          title="Top Scorers/ Top Assists"
          >
          Top Scorers / Assists
          <TopPlayerData />
        </Tab>
        <Tab eventKey="football-news" title="Latest News">
          {/* <TopFootballStories /> */}
          Football Stories
        </Tab>
      </Tabs>
    </div>
  );
};

export default Homepage;
