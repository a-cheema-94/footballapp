import { useQuery } from "@apollo/client";
import { TOP_NEWS_QUERY } from "../../../../queries/topNewsQuery";
import FootballNewsStory from "./FootballNewsStory";
import { NewsType } from "../../../../queries/types/queryTypes";
import { Col, Container, Row, Stack } from "react-bootstrap";
import useMediaQuery from "../../../reusable/customHooks/useMediaQuery";
import { partArray } from "../../../../functions/partArray";

type Props = {};

// TODO => integrate news data in football news story component

// todo => custom function for this case. Part array in half, then isolate first or last item (depending on which layout) and render accordingly.
const ConfigOne = ({ newsStories }: { newsStories: NewsType[] }) => {
  const sortNewsStories = (newsStories: NewsType[]) => {
    return [
      newsStories[0],
      newsStories.slice(1, 5),
      newsStories.slice(5, 9),
      newsStories[newsStories.length - 1],
    ];
  };

  console.log(sortNewsStories(newsStories));

  return (
    <>
      <Row className="border border-black">
        <Col>Item 1</Col>
        <Col>
          <Row>
            <Col>Item 2</Col>
          </Row>
          <Row>
            <Col>Item 3</Col>
          </Row>
          <Row>
            <Col>Item 4</Col>
          </Row>
          <Row>
            <Col>Item 5</Col>
          </Row>
        </Col>
      </Row>
      <Row className="border border-black">
        <Col>
          <Row>
            <Col>Item 6</Col>
          </Row>
          <Row>
            <Col>Item 7</Col>
          </Row>
          <Row>
            <Col>Item 8</Col>
          </Row>
          <Row>
            <Col>Item 9</Col>
          </Row>
        </Col>
        <Col>Item 10</Col>
      </Row>
    </>
  );
};

const TopFootballStories = (props: Props) => {
  const isScreenLarge = useMediaQuery("(min-width: 1000px)");

  const { data, loading, error } = useQuery(TOP_NEWS_QUERY);

  const newsStories: NewsType[] = data ? data["topFootballStories"] : [];

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>An Error occurred: {error.message}</p>;

  return (
    <Container className="">
      {isScreenLarge ? (
        <ConfigOne newsStories={newsStories} />
      ) : (
        <div className="d-flex flex-wrap justify-content-center mt-4 gap-2">
          {newsStories.map((story, index) => (
            <FootballNewsStory key={index} story={story} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default TopFootballStories;
