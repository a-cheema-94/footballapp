import { Button } from "react-bootstrap";
import { FaCircleArrowUp } from "react-icons/fa6";

type Props = {};

const NavigateUpBtn = (props: Props) => {
  const scrollToTop = () => (document.documentElement.scrollTop = 0);

  return (
    <Button
      onClick={scrollToTop}
      className="position-sticky bottom-0 bg-transparent opacity-75 border-0"
      style={{ left: "calc(50% - 12.5px)" }}
    >
      {/* todo: darkmode styling */}
      <FaCircleArrowUp size={25} className="text-white" />
    </Button>
  );
};

export default NavigateUpBtn;
