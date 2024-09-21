import { Card } from "react-bootstrap";
import { NewsType } from "../../../../queries/types/queryTypes";

type Props = {
  story: NewsType
};

const FootballNewsStory = ({ story }: Props) => {
  return (
    <p>news story</p>
  );
};

export default FootballNewsStory;
