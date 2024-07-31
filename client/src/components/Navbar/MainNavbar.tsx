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

const MainNavbar = ({ toggle }: Props) => {
  const [isCompetitionMenu, setIsCompetitionMenu] = useState(false);

  return (
    <>
      <Navbar
        expand={false}
        className="bg-orange-500 p-3 position-fixed w-100 z-3"
        style={{ height: "100px" }}
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
