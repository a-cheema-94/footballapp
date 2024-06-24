import { useQuery } from "@apollo/client"
import { LEAGUE_TABLE_QUERY } from "../../queries/leagueTableQuery";
import { NavDropdown, Stack, Nav, Tooltip, OverlayTrigger } from "react-bootstrap";
import { getLogosAndImages } from "../../functions/logoFunction";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  league: string
}

const CompetitionMenuOption = ({ league }: Props) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  const { data, loading, error } = useQuery(LEAGUE_TABLE_QUERY, { variables: {
    league
  } });

  if(error) return <div>An Error occurred: {error.message}</div>
  if(loading) return <p>Loading ...</p>

  const renderTooltip = (props: any) => (
    <Tooltip {...props}>
      Click to go to team page
    </Tooltip>
  )

  const toggleDropdown = () => setIsDropDownOpen(prev => !prev);
  


  return (
    
    <Stack >
        <Link to='/competition' className="nav-link" >{league}</Link>
        <NavDropdown
          title=''
          id={`offcanvasNavbarDropdown-expand-${false}`}
          style={isDropDownOpen ? { height: '300px', overflowY: 'scroll' } : {}}
          onToggle={toggleDropdown}

        >
            {data.leagueStandings.map((team: any, index: number) => (
              <NavDropdown.Item key={index} className="select-none">
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                <Stack direction="horizontal" gap={4} className="align-items-start">
                  <p>{team.team.name}</p>
                  <img src={getLogosAndImages('teams', team.team.id)} width={30}/>
                </Stack>
              </OverlayTrigger>
              </NavDropdown.Item>
            ))}

        </NavDropdown>

      </Stack>
  )
}

export default CompetitionMenuOption