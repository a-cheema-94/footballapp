import { useQuery } from "@apollo/client";
import { TOP_NEWS_QUERY } from "../../../../queries/topNewsQuery";
import FootballNewsStory from "./FootballNewsStory";
import { NewsType } from "../../../../queries/types/queryTypes";
import { Col, Container, Row } from "react-bootstrap";
import useMediaQuery from "../../../reusable/customHooks/useMediaQuery";

type Props = {};

const ConfigOne = () => {
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
        </Col>
      </Row>
      <Row className="border border-black">
        <Col>
          <Row>
            <Col>Item 5</Col>
          </Row>
          <Row>
            <Col>Item 6</Col>
          </Row>
          <Row>
            <Col>Item 7</Col>
          </Row>
        </Col>
        <Col>Item 8</Col>
      </Row>
      <Row>
        <Col>Item 9</Col>
        <Col>Item 10</Col>
      </Row>
    </>
  );
};

const ConfigTwo = () => {
  return (
    <>
      <Row>
        <Col>Item 1</Col>
        <Col>Item 2</Col>
      </Row>
      <Row>
        <Col>Item 3</Col>
        <Col>Item 4</Col>
      </Row>
      <Row>
        <Col>Item 5</Col>
        <Col>Item 6</Col>
      </Row>
      <Row>
        <Col>Item 7</Col>
        <Col>Item 8</Col>
      </Row>
      <Row>
        <Col>Item 9</Col>
        <Col>Item 10</Col>
      </Row>
    </>
  );
};

const ConfigThree = () => {
  return (
    <>
      <Row>
        <Col>Item 1</Col>
      </Row>
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
      <Row>
        <Col>Item 10</Col>
      </Row>
    </>
  )
}

const TopFootballStories = (props: Props) => {
  const isScreenLarge = useMediaQuery('(min-width: 1200px)');
  const isScreenMedium = useMediaQuery('(max-width: 1199px) and (min-width: 768px)');
  const isScreenSmall = useMediaQuery('(max-width: 767px)');
  
  const { data, loading, error } = useQuery(TOP_NEWS_QUERY);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>An Error occurred: {error.message}</p>;

  return (
    <Container className="bg-orange-200 border border-black">
      {isScreenLarge && <ConfigOne />}
      {isScreenMedium && <ConfigTwo />}
      {isScreenSmall && <ConfigThree />}
    </Container>
  );
};

export default TopFootballStories;

// TODO => integrate this in football news story component
{
  /* {data.topFootballStories.map((story: NewsType, index: number) => (
          <Col key={index} xs={6}>
            <FootballNewsStory story={story}/>      
          </Col>
        ))} */
}
