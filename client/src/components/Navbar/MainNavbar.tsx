import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { IoSearchOutline } from "react-icons/io5";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SideMenu from "./offcanvasMenu/SideMenu";
import { ThemeContext } from "../../context/ThemeProvider";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Props = {
  toggle: () => void;
};

const MainNavbar = ({ toggle }: Props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [isCompetitionMenu, setIsCompetitionMenu] = useState<boolean>(false);
  const scrollPositionRef: MutableRefObject<number> = useRef<number>(0);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleScroll = () => {
    let currentScrollPos = window.scrollY;
    if (currentScrollPos > scrollPositionRef.current) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }

    scrollPositionRef.current = currentScrollPos;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // At low opacity set pointer events of Navbar to none so content under the faded navbar is clickable.

  return (
    <div>
      <Navbar
        expand={false}
        className={`bg-teal-400 custom-navbar p-3 position-fixed w-100 z-3 ${
          isNavVisible ? "opacity-100" : "opacity-0 pe-none"
        }`}
      >
        <Container fluid>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${false}`}
            className="border-0"
            onClick={() => setIsCompetitionMenu(true)}
          />

          <Navbar.Brand onClick={() => navigate('/')}>
            <img src={`./fstat_logo.svg`} alt="" width="150px" />
          </Navbar.Brand>

          <Button
            className="bg-transparent text-black border-0"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <MdDarkMode size={20} />
            ) : (
              <MdLightMode size={20} />
            )}
          </Button>

          <Button
            onClick={() => toggle()}
            className="bg-transparent text-black border-0"
          >
            <IoSearchOutline style={{ width: "30px", height: "30px" }} />
          </Button>

          <SideMenu
            isCompetitionMenu={isCompetitionMenu}
            setIsCompetitionMenu={setIsCompetitionMenu}
          />
        </Container>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
