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
import useMediaQuery from "../reusable/customHooks/useMediaQuery";

type Props = {
  toggle: () => void;
  closeSearch: () => void;
};

const MainNavbar = ({ toggle, closeSearch }: Props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navbarBreakpoint = useMediaQuery("(max-width: 650px)");

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

  const closeMenu = () => {
    closeSearch();
    setIsCompetitionMenu(false);
  }

  const handleClickLogo = () => {
    closeMenu();
    navigate("/")
  }

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

          <Button
            style={{ width:'120px' }}
            className="cursor-pointer border-0 bg-transparent"
            onClick={handleClickLogo}
            
          >
            {navbarBreakpoint ? (
              <img
                src={`./fstat_logo_no_title.svg`}
                alt=""
                width={"100%"}
              />

            ) : (
              <img
                src={`./fstat_logo.svg`}
                alt=""
                width={"100%"}
              />
            )}

          </Button>
            
            <Button
              className="bg-transparent text-black border-0"
              onClick={toggleTheme}
            >
              {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
            </Button>
            <Button
              onClick={() => toggle()}
              className="bg-transparent text-black border-0"
            >
              {/*  */}
              <IoSearchOutline />
            </Button>
            
          <SideMenu
            isCompetitionMenu={isCompetitionMenu}
            closeMenu={closeMenu}
          />
        </Container>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
