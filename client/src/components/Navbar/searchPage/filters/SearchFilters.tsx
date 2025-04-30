import { Button, Dropdown, Stack } from "react-bootstrap";
import { POSITIONS } from "../../../../functions/fixedData";
import { Dispatch, useContext } from "react";
import { SearchActionType } from "../reducer/searchReducer";
import {
  TeamStandingType,
  TeamType,
} from "../../../../queries/types/queryTypes";
import { ThemeContext } from "../../../../context/ThemeProvider";

// according to react bootstrap docs the onSelect callback defines the eventKey: any

type Props = {
  selectedTeam: string | null;
  selectedPosition: string | null;
  resetFilters: (
    dispatch: Dispatch<
      SearchActionType<
        "FILTER_PLAYER_TEAM" | "FILTER_PLAYER_POSITION" | "FILTER_PLAYER_RANGE" | "SET_SEARCH_QUERY" | "SET_AUTO_COMPLETE_INDEX"
      >
    >
  ) => void;
  selectedRange: string | null;
  teamsFilter: (
    eventKey: any,
    dispatch: Dispatch<SearchActionType<"FILTER_PLAYER_TEAM">>
  ) => void;
  positionFilter: (
    eventKey: any,
    dispatch: Dispatch<SearchActionType<"FILTER_PLAYER_POSITION">>
  ) => void;
  rangeFilter: (
    ageRange: string,
    dispatch: Dispatch<SearchActionType<"FILTER_PLAYER_RANGE">>
  ) => void;
  dispatch: Dispatch<
    SearchActionType<
      | "FILTER_PLAYER_LEAGUE"
      | "FILTER_PLAYER_RANGE"
      | "FILTER_PLAYER_TEAM"
      | "FILTER_PLAYER_POSITION"
      | "SET_SEARCH_QUERY"
      | "SET_AUTO_COMPLETE_INDEX"
    >
  >;
  leagueTeams: TeamStandingType[] | [];
};

const SearchFilters = ({
  selectedTeam,
  teamsFilter,
  selectedPosition,
  positionFilter,
  resetFilters,
  selectedRange,
  rangeFilter,
  dispatch,
  leagueTeams,
}: Props) => {
  const { theme } = useContext(ThemeContext);

  const PLAYER_AGE_RANGES = ["16-20", "21-25", "26-30", "31-40"];

  const filterTeams = leagueTeams.map((team: TeamStandingType) => {
    const newTeam = team?.team;
    return newTeam;
  });
  const matchTeam = filterTeams.some((team) => team.name === selectedTeam);

  const filterBtnDarkModeStyles = `${
    theme === "light" ? "bg-teal-300 text-dark" : "bg-teal-600 text-light"
  } border-0`;

  return (
    <Stack
      direction="horizontal"
      className="d-flex gap-3 rounded mt-2"
      style={{ marginRight: "8em" }}
    >
      {/* Team Filter */}
      <Dropdown onSelect={(eventKey: any) => teamsFilter(eventKey, dispatch)}>
        <Dropdown.Toggle className={`d-flex gap-2 align-items-center ${filterBtnDarkModeStyles}`}>
          {matchTeam ? <p className="mb-0">{selectedTeam}</p> : "Team"}
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-25">
          {filterTeams.map((team: TeamType, index: number) => (
            <Dropdown.Item
              key={index}
              eventKey={team.name}
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {team.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Position Filter */}
      <Dropdown
        onSelect={(eventKey: any) => positionFilter(eventKey, dispatch)}
      >
        <Dropdown.Toggle className={filterBtnDarkModeStyles}>
          {selectedPosition ? selectedPosition : "Position"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {POSITIONS.map((position: string, index: number) => (
            <Dropdown.Item eventKey={position} key={index}>
              {position}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown onSelect={(eventKey: any) => rangeFilter(eventKey, dispatch)}>
        <Dropdown.Toggle className={filterBtnDarkModeStyles}>
          {selectedRange ? selectedRange : "Age"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {PLAYER_AGE_RANGES.map((ageRange: string, index: number) => (
            <Dropdown.Item eventKey={ageRange} key={index}>
              {ageRange}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Button
        className="bg-red-400 border-0 w-50"
        onClick={() => resetFilters(dispatch)}
      >
        Reset
      </Button>
    </Stack>
  );
};

export default SearchFilters;
