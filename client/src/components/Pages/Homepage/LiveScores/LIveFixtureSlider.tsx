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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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

  // todo: darkmode styling: DONE
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

// note: Carousel react-bootstrap component and react-multi-carousel both not right for the functionality I want. Now using react slick (the documentation seems more clear) for my carousel. Want to have a responsive multi item carousel for my live fixtures. Make sure to import css from library for any arrow and dots styling.
// react slick: possible config options: adaptiveHeight, autoPlaySpeed,
