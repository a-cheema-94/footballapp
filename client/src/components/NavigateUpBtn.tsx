import { Button } from "react-bootstrap";
import { FaCircleArrowUp } from "react-icons/fa6";
import { ThemeContext } from "../context/ThemeProvider";
import { useContext } from "react";

type Props = {};

const NavigateUpBtn = (props: Props) => {
  const scrollToTop = () => (document.documentElement.scrollTop = 0);

  const {theme} = useContext(ThemeContext);

  return (
    <Button
      onClick={scrollToTop}
      className="z-3 position-fixed bg-transparent opacity-75 border-0"
      style={{ left: "calc(50% - 12.5px)", top: "calc(100vh - 45px)" }}
    >
      <FaCircleArrowUp size={25} className={`${theme === 'light' ? 'text-dark' : 'text-gray-100'}`}/>
    </Button>
  );
};

export default NavigateUpBtn;
