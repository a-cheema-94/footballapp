import { Carousel } from "react-bootstrap";
import { FixtureType } from "../../../../queries/types/queryTypes";
import LiveFixture from "./LiveFixture";

type Props = {
  liveFixtures: FixtureType[];
};

const Slider = ({ liveFixtures }: Props) => {
  const listToChunks = (list: FixtureType[], chunkSize: number) => {
    let chunks = [];
    for (let i = 0; i < list.length; i += chunkSize) {
      chunks.push(list.slice(i, (i += chunkSize)));
      // .slice => will output the end of the array if the ending index is too large.
    }
    return chunks;
  };

  const fixtureChunks = listToChunks(liveFixtures, 2);
  // console.log(fixtureChunks);

  return (
    <Carousel className="p-5" slide={false} controls={true} interval={null}>
      <Carousel.Item>
        <LiveFixture fixture={liveFixtures[0]} />
      </Carousel.Item>

      <Carousel.Item>
        <LiveFixture fixture={liveFixtures[1]} />
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
