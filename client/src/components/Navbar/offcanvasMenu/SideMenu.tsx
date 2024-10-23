import React, { Dispatch, SetStateAction } from "react";
import { Nav, Navbar, Offcanvas } from "react-bootstrap";
import CompetitionMenuOption from "./CompetitionMenuOption";
import { LEAGUES } from "../../../functions/fixedData";

type Props = {
  isCompetitionMenu: boolean;
  setIsCompetitionMenu: Dispatch<SetStateAction<boolean>>;
};

// todo: darkmode styling
const SideMenu = ({ isCompetitionMenu, setIsCompetitionMenu }: Props) => {
  return (
    <Navbar.Offcanvas
      id={`offcanvasNavbar-expand-${false}`}
      aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
      placement="start"
      show={isCompetitionMenu}
      onHide={() => setIsCompetitionMenu(false)}
      className="bg-dark text-white"
    >
      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
          Competitions
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          {Object.keys(LEAGUES).map((league, index) => (
            <CompetitionMenuOption key={index} league={league} />
          ))}
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  );
};

export default SideMenu;
