import { Button, Dropdown, Form, Stack } from "react-bootstrap";
import { POSITIONS } from "../../../../functions/fixedData";
import { Dispatch, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { LEAGUE_TABLE_QUERY } from "../../../../queries/leagueTableQuery";
import { getLogosAndImages } from "../../../../functions/logoFunction";
import { SearchActionType } from "../reducer/searchReducer";
import { TeamStandingType } from "../../../../queries/types/queryTypes";

// according to react bootstrap docs the onSelect callback defines the eventKey: any

type Props = {
  playerLeague: string;
  selectedTeam: string | null;
  selectedPosition: string | null;
  resetFilters: (
    dispatch: Dispatch<
      SearchActionType<
        "FILTER_PLAYER_TEAM" | "FILTER_PLAYER_POSITION" | "FILTER_PLAYER_RANGE"
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
      | "FILTER_PLAYER_TEAM"
      | "FILTER_PLAYER_POSITION"
      | "FILTER_PLAYER_RANGE"
      | "FILTER_PLAYER_LEAGUE"
    >
  >;
};

type TeamType = {
  name: string;
  id: number;
};

const SearchFilters = ({
  playerLeague,
  selectedTeam,
  teamsFilter,
  selectedPosition,
  positionFilter,
  resetFilters,
  selectedRange,
  rangeFilter,
  dispatch,
}: Props) => {
  // state variables
  const [filterTeams, setFilterTeams] = useState<TeamType[]>([
    { name: "Liverpool", id: 1234 },
    { name: "Chelsea", id: 2938 },
  ]);

  // queries
  const [teams, { data: teamData, loading: teamLoading, error: teamError }] =
    useLazyQuery(LEAGUE_TABLE_QUERY, {
      onCompleted: (teamData: any) => {
        const filteredTeams = teamData.leagueStandings.map(
          (team: TeamStandingType) => {
            const newTeam = team?.team;
            return newTeam;
          }
        );
        setFilterTeams(filteredTeams);
      },
    });

  // Error states

  if (teamError) return <div>An Error occurred: {teamError.message}</div>;

  const PLAYER_AGE_RANGES = ["16-20", "21-25", "26-30", "31-40"];

  const matchTeam = filterTeams.find((team) => team.name === selectedTeam);

  return (
    <Stack direction="horizontal" className="d-flex gap-3 rounded me-5 mt-2">
      {/* Team Filter */}
      <Dropdown
        onSelect={(eventKey: any) => teamsFilter(eventKey, dispatch)}
        onClick={() => teams({ variables: { league: playerLeague } })}
      >
        <Dropdown.Toggle className="d-flex gap-2 align-items-center bg-teal-300 text-black border-0">
          {matchTeam ? (
            <p className="mb-0">{selectedTeam}</p>
          ): "Team"}
          
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
        <Dropdown.Toggle className="bg-teal-300 text-black border-0">
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

      <Dropdown
        onSelect={(eventKey: any) => rangeFilter(eventKey, dispatch)}
      >
        <Dropdown.Toggle className="bg-teal-300 text-black border-0">
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


      {/* Age Range Filter */}
      {/* <div className="range">
        <p>Choose Age Range</p>
        <Stack direction="horizontal">
          {PLAYER_AGE_RANGES.map((ageRange, index) => (
            <Form.Check
              key={index}
              inline
              label={ageRange}
              checked={ageRange === selectedRange}
              onChange={() => rangeFilter(ageRange, dispatch)}
            />
          ))}
        </Stack>
      </div> */}

      {/* selectedRange = age range state */}

{/* {matchTeam ? (
            <img
              src={getLogosAndImages("teams", matchTeam.id)}
              alt=""
              width={40}
              height={40}
              className="ratio-1x1"
            />
          ) : (
            ""
          )} */}