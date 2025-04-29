import { useQuery } from "@apollo/client";
import { LEAGUE_TABLE_QUERY } from "../../../queries/leagueTableQuery";
import { NavDropdown, Stack } from "react-bootstrap";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import TooltipWrapper from "../../reusable/TooltipWrapper";
import { TeamStandingType } from "../../../queries/types/queryTypes";
import { ThemeContext } from "../../../context/ThemeProvider";
import LogoOrPlayerImage from "../../reusable/LogoOrPlayerImage";
import { closeAutoCompleteMenu } from "../searchPage/searchFunctions/searchPageFunctions";

type Props = {
  league: string;
  closeMenu: () => void
};

const CompetitionMenuOption = ({ league, closeMenu }: Props) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  const { data, loading, error } = useQuery(LEAGUE_TABLE_QUERY, {
    variables: {
      league,
    },
  });

  if (error) return <div>An Error occurred: {error.message}</div>;
  if (loading) return <p>Loading ...</p>;

  const toggleDropdown = () => setIsDropDownOpen((prev) => !prev);

  // Tooltip Props
  const styleProps = {
    placement: "bottom-start",
    delay: {
      show: 1000,
      hide: 400,
    },
  };

  const handleCompetitionMenuClick = () => {
    closeMenu();
  }

  return (
    <Stack>
      <Link to="/competition" state={{ league }} className="nav-link" onClick={closeMenu}>
        {league}
      </Link> 
      <NavDropdown
        title=""
        id={`offcanvasNavbarDropdown-expand-${false}`}
        style={isDropDownOpen ? { height: "300px", overflowY: "scroll" } : {}}
        onToggle={toggleDropdown}
        className=""
      >
        {data.leagueStandings.map((team: TeamStandingType, index: number) => (
          <NavDropdown.Item
            key={index}
            className={`select-none p-2 ${
              theme === "light"
                ? "bg-light text-dark bg-hover-gray-300"
                : "bg-dark text-light bg-hover-dark-lighter-1"
            } `}
          >
            <TooltipWrapper message="Go to team page" styleProps={styleProps}>
              <Stack
                direction="horizontal"
                gap={4}
                className="align-items-start"
              >
                <p>{team.team.name}</p>

                <LogoOrPlayerImage
                  category="teams"
                  dimension="30px"
                  id={team.team.id}
                  key={index}
                />
              </Stack>
            </TooltipWrapper>
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </Stack>
  );
};

export default CompetitionMenuOption;
