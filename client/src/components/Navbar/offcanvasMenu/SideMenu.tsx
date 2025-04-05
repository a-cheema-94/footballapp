import React, { Dispatch, SetStateAction, useContext } from "react";
import { Nav, Navbar, Offcanvas } from "react-bootstrap";
import CompetitionMenuOption from "./CompetitionMenuOption";
import { LEAGUES } from "../../../functions/fixedData";
import { ThemeContext } from "../../../context/ThemeProvider";
import { closeAutoCompleteMenu } from "../searchPage/searchFunctions/searchPageFunctions";

type Props = {
  isCompetitionMenu: boolean;
  closeMenu: () => void;
};

const SideMenu = ({ isCompetitionMenu, closeMenu }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Navbar.Offcanvas
      id={`offcanvasNavbar-expand-${false}`}
      aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
      placement="start"
      show={isCompetitionMenu}
      onHide={closeMenu}
      className={`${theme === "light" ? "bg-gray-100" : "bg-dark text-light"}`}
    >
      {/* ? Useful: since closeVariant doesn't have a default value we have to conditionally render the prop. A pattern to remember: {...(condition ? { prop: 'something' }: {})} => will spread an empty object if condition is not met.*/}

      <Offcanvas.Header
        closeButton
        {...(theme === "dark" ? { closeVariant: "white" } : {})}
      >
        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
          Competitions
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1">
          {Object.keys(LEAGUES).map((league, index) => (
            <CompetitionMenuOption
              key={index}
              league={league}
              closeMenu={closeMenu}
            />
          ))}
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  );
};

export default SideMenu;
