import { Dropdown, Stack } from "react-bootstrap";
import { LEAGUES } from "../../../../shared/fixedData.ts";
import { Dispatch } from "react";
import TooltipWrapper from "./TooltipWrapper.tsx";
import { SearchActionType } from "../Navbar/searchPage/reducer/searchReducer.ts";
import { LeagueNames } from "../../functions/fixedData.ts";
import LogoOrPlayerImage from "./LogoOrPlayerImage.tsx";

// NOTE: This can be re-used in the search component and elsewhere, only have to include or omit the optional search page functions.

type Props = {
  league: string;
  setPlayerLeague?: (league: LeagueNames) => void;
  
  resetFilters?: (
    dispatch: React.Dispatch<
      SearchActionType<
        "FILTER_PLAYER_TEAM" | "FILTER_PLAYER_POSITION" | "FILTER_PLAYER_RANGE"
      >
    >
  ) => void;

  selectLeague?: (
    eventKey: string,
    dispatch: Dispatch<SearchActionType<"FILTER_PLAYER_LEAGUE">>
  ) => void;
  dispatch?: Dispatch<
    SearchActionType<
      | "FILTER_PLAYER_LEAGUE"
      | "FILTER_PLAYER_TEAM"
      | "FILTER_PLAYER_POSITION"
      | "FILTER_PLAYER_RANGE"
    >
  >;
};

const LeagueSelector = ({
  selectLeague,
  dispatch,
  setPlayerLeague,
  league,
  resetFilters,
}: Props) => {
  const leagues = Object.keys(LEAGUES) as LeagueNames[];
  const leagueIds = Object.values(LEAGUES);

  const handleDropdownSelect = (league: LeagueNames) => {
    
      if (selectLeague && dispatch && resetFilters) {
        resetFilters(dispatch);
        selectLeague(league, dispatch);
      }
      if (setPlayerLeague) {
        setPlayerLeague(league);
      }
    
  };

  // Tooltip Props
  const styleProps = {
    placement: "top-start",
    delay: {
      show: 1000,
      hide: 400,
    },
  };

  return (
    <Dropdown>
      <TooltipWrapper message="Select League" styleProps={styleProps}>
        <Dropdown.Toggle className="bg-teal-300 text-black border-0">
          
          <LogoOrPlayerImage category="leagues" dimension="40px" id={LEAGUES[league]} />
        </Dropdown.Toggle>
      </TooltipWrapper>

      <Dropdown.Menu>
        {leagues.map((league, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => handleDropdownSelect(league)}
          >
            <Stack direction="horizontal" className="align-items-center gap-2 p-1">
              <p className="mb-0">{league}</p>
              
              <LogoOrPlayerImage category="leagues" dimension="20px" id={leagueIds[index]}/>
            </Stack>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LeagueSelector;
