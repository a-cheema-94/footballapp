import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoSearchOutline } from "react-icons/io5";
import CompetitionMenuOption from "../Navbar/offcanvasMenu/CompetitionMenuOption";
import { useState } from "react";
import SideMenu from "./offcanvasMenu/SideMenu";

type Props = {
  toggle: () => void;
};

// todo => want to create a smooth scrolling navbar. So when first scrolling the navbar fades out, then when user is no longer idle  or it has been a set amount of time it fades back in. It should fade out when scrolling up or down and slowly fade back in when scrolled to the top. Want to maintain smooth transitions throughout. Can use window.scrollY to get the scroll position => main number we base this around.

const MainNavbar = ({ toggle }: Props) => {
  const [isCompetitionMenu, setIsCompetitionMenu] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  return (
    <>
      <Navbar
        expand={false}
        className="bg-orange-500 p-3 position-fixed w-100 z-3"
      >
        <Container fluid>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${false}`}
            className="border border-0"
            onClick={() => setIsCompetitionMenu(true)}
          />

          <Navbar.Brand href="/">
            <img src={`./fstat_logo.svg`} alt="" width="200px" />
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
