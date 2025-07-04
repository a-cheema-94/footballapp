import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeProvider";
import { FixtureType } from "../../../../queries/types/queryTypes";
import LiveFixture from "./LiveFixture";
import Slider from "react-slick";

type Props = {
  liveFixtures: FixtureType[];
};

const LiveFixtureSlider: React.FC<Props> = ({ liveFixtures }: Props) => {
  const {theme} = useContext(ThemeContext)

  const defaultSlidesToShow = liveFixtures.length < 3 ? liveFixtures.length : 3;

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: defaultSlidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1035,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="d-block rounded " style={{ width: "90%" }}>
      <Slider className={`text-center p-3 ${theme === 'dark' ? 'dark-dots' : ''} `} {...sliderSettings}>
        {liveFixtures.map((fixture, index) => (
          <div key={index} className="d-flex justify-content-center">
            <LiveFixture fixture={fixture} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LiveFixtureSlider;