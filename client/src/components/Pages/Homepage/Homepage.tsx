import { Tab, Tabs } from "react-bootstrap";
import LiveScores from "./LiveScores/LiveScores";
import TopFootballStories from "./NewsStories/TopFootballStories";
import TopPlayerData from "./TopPlayerData/TopPlayerData";
import { useContext, useState } from "react";
import CustomSvgs from '../../../svg/customSvgs';
import { ThemeContext } from "../../../context/ThemeProvider";

type Props = {};

const Homepage = ({}: Props) => {
  const [tabKey, setTabKey] = useState<string | number>("live-scores");
  const {theme} = useContext(ThemeContext);

  const handleTab = (key: string | number | null): void => {
    if (key !== null) setTabKey(key);
  };

  return (
    // todo: darkmode styling
    <div className={`${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`}>
      <Tabs
        activeKey={tabKey}
        onSelect={handleTab}
        fill
        justify
        className={`customTabs ${theme === 'light' ? 'light' : 'dark'}`}
      >
        <Tab eventKey="live-scores" title="Live Scores">
          <LiveScores />
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
