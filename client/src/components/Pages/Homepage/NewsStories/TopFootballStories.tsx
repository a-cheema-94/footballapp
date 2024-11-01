import { useQuery } from "@apollo/client";
import { TOP_NEWS_QUERY } from "../../../../queries/topNewsQuery";
import FootballNewsStory from "./FootballNewsStory";
import { NewsType } from "../../../../queries/types/queryTypes";
import { Col, Container, Row } from "react-bootstrap";
import useMediaQuery from "../../../reusable/customHooks/useMediaQuery";

type Props = {};

const ConfigOne = ({ newsStories }: { newsStories: NewsType[] }) => {
  return (
    <>
      <Row className="m-4">
        <Col className=" d-flex justify-content-center align-items-center h-100">
          <FootballNewsStory largeConfig={true} story={newsStories[0]} />
        </Col>
        <Col>
          <Col className="d-flex flex-column justify-content-center gap-3">
            {newsStories.slice(1, 4).map((story, index) => (
              <Col key={index}>
                <FootballNewsStory
                  largeConfig={true}
                  story={story}
                  noImage={true}
                />
              </Col>
            ))}
          </Col>
        </Col>
      </Row>

      <Row className="m-4">
        {newsStories.slice(4, 6).map((story, idx) => (
          <Col key={idx}>
            <FootballNewsStory
              story={story}
              largeConfig={true}
              noImage={true}
            />
          </Col>
        ))}
      </Row>


      <Row className="m-4">
        <Col className="d-flex flex-column justify-content-center gap-3">
          {newsStories.slice(6, 9).map((story, index) => (
            <Col key={index}>
              <FootballNewsStory
                largeConfig={true}
                story={story}
                noImage={true}
              />
            </Col>
          ))}
        </Col>
        <Col>
          <FootballNewsStory largeConfig={true} story={newsStories[9]} />
        </Col>
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
    <Container className="mt-3">
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
