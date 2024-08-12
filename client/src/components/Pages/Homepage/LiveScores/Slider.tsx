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
  console.log(fixtureChunks);

  return (
    <Carousel slide={false}>
      {fixtureChunks.map((fixtureChunk: FixtureType[], index: number) => (
        <Carousel.Item key={index}>
          <div>hi + {index}</div>
        </Carousel.Item>
      ))}

      {/* <Carousel.Item>3</Carousel.Item>
      <Carousel.Item>4</Carousel.Item>
      <Carousel.Item>3</Carousel.Item>
      <Carousel.Item>2</Carousel.Item> */}
    </Carousel>
  );
};

export default Slider;
