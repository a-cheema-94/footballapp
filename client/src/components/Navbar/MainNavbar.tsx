import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { IoSearchOutline } from "react-icons/io5";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import SideMenu from "./offcanvasMenu/SideMenu";

type Props = {
  toggle: () => void;
};

// todo => want to create a smooth scrolling navbar. So when first scrolling the navbar fades out, then when user is no longer idle  or it has been a set amount of time it fades back in. It should fade out when scrolling up or down and slowly fade back in when scrolled to the top. Want to maintain smooth transitions throughout. Can use window.scrollY to get the scroll position => main number we base this around. Only fades out when scrolling.

const MainNavbar = ({ toggle }: Props) => {
  const [isCompetitionMenu, setIsCompetitionMenu] = useState<boolean>(false);
  const scrollPositionRef: MutableRefObject<number> = useRef<number>(0);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);

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

  return (
    <>
      <Navbar
        expand={false}
        className={`custom-navbar bg-orange-500 p-3 position-fixed w-100 z-3 ${
          isNavVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Container fluid>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${false}`}
            className="border border-0"
            onClick={() => setIsCompetitionMenu(true)}
          />

          <Navbar.Brand href="/">
            <img src={`./fstat_logo.svg`} alt="" width="150px" />
          </Navbar.Brand>

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
    </>
  );
};

export default MainNavbar;
