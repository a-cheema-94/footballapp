import { Tab, Tabs } from "react-bootstrap";
import LiveScores from "./LiveScores/LiveScores";
import TopFootballStories from "./NewsStories/TopFootballStories";
import TopPlayerData from "./TopPlayerData/TopPlayerData";
import { useState } from "react";

type Props = {};

const Homepage = (props: Props) => {
  const [tabKey, setTabKey] = useState<string | number>("football-news");

  const handleTab = (key: string | number | null): void => {
    if (key !== null) setTabKey(key);
  };

  return (

    <div className="">
      <LiveScores />
      <Tabs activeKey={tabKey} onSelect={handleTab} fill 
        className='customTabs mt-2'
      >
        <Tab eventKey="football-news" title="Latest News">
          {/* <TopFootballStories /> */}
          Football Stories
        </Tab>
        <Tab eventKey="top-scorers-and-assists" title="Top Scorers/ Top Assists">
          {/* <TopPlayerData /> */}
          Top Scorers / Assists
        </Tab>
      </Tabs>
    </div>
  );
};

export default Homepage;
