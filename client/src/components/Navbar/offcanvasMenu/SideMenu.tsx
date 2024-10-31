import React, { Dispatch, SetStateAction, useContext } from "react";
import { Nav, Navbar, Offcanvas } from "react-bootstrap";
import CompetitionMenuOption from "./CompetitionMenuOption";
import { LEAGUES } from "../../../functions/fixedData";
import { ThemeContext } from "../../../context/ThemeProvider";

type Props = {
  isCompetitionMenu: boolean;
  setIsCompetitionMenu: Dispatch<SetStateAction<boolean>>;
};

// todo: darkmode styling DONE
const SideMenu = ({ isCompetitionMenu, setIsCompetitionMenu }: Props) => {
  const {theme} = useContext(ThemeContext);

  return (
    <Navbar.Offcanvas
      id={`offcanvasNavbar-expand-${false}`}
      aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
      placement="start"
      show={isCompetitionMenu}
      onHide={() => setIsCompetitionMenu(false)}
      className={`${theme === 'light' ? "bg-gray-100" : "bg-dark text-light"}`}
    >
      <Offcanvas.Header closeButton closeVariant={`${theme === 'dark' && "white"}`}>
        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
          Competitions
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1">
          {Object.keys(LEAGUES).map((league, index) => (
            <CompetitionMenuOption key={index} league={league} />
          ))}
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  );
};

export default SideMenu;
