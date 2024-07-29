import React, { Dispatch, SetStateAction } from 'react'
import { Nav, Navbar, Offcanvas } from 'react-bootstrap'
import CompetitionMenuOption from './CompetitionMenuOption'

type Props = {
  isCompetitionMenu: boolean,
  setIsCompetitionMenu: Dispatch<SetStateAction<boolean>>
}

const SideMenu = ({ isCompetitionMenu, setIsCompetitionMenu }: Props) => {
  return (
    <Navbar.Offcanvas
    id={`offcanvasNavbar-expand-${false}`}
    aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
    placement="start"
    show={isCompetitionMenu}
    onHide={() => setIsCompetitionMenu(false)}
  >
    
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
          Competitions
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          
          <CompetitionMenuOption league={'Premier League'}/>
          <CompetitionMenuOption league={'Bundesliga'}/>
          <CompetitionMenuOption league={'La Liga'}/>
          <CompetitionMenuOption league={'Serie A'}/> 
          
        </Nav>
      </Offcanvas.Body>
    
  </Navbar.Offcanvas>
  )
}

export default SideMenu