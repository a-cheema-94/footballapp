import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoSearchOutline } from "react-icons/io5";
import CompetitionMenuOption from './CompetitionMenuOption';
import { useState } from 'react';

type Props = {
  toggle: () => void,
}


const MainNavbar = ({ toggle }: Props) => {
  const [isCompetitionMenu, setIsCompetitionMenu] = useState(false)

  return (
    <>
      <Navbar expand={false} className="bg-secondary-subtle mb-3 p-3">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} className='border border-0' onClick={() => setIsCompetitionMenu(true)}/>
            <Navbar.Brand href="#">
              <img src={`./fstat_logo.svg`} alt="" width="200px"/>
            </Navbar.Brand>

            <Button
              onClick={() => toggle()}
            >
              <IoSearchOutline/>
            </Button>


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
          </Container>
        </Navbar>
    </>
  )
}

export default MainNavbar