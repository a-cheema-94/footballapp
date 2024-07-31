import { Button, Dropdown, Form, Stack } from "react-bootstrap";
import { POSITIONS } from "../../../../functions/fixedData";
import { Dispatch, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { LEAGUE_TABLE_QUERY } from "../../../../queries/leagueTableQuery";
import { getLogosAndImages } from "../../../../functions/logoFunction";
import { SearchActionType } from "../reducer/searchReducer";

// according to react bootstrap docs the onSelect callback defines the eventKey: any

type Props = {
  playerLeague: string;
  selectedTeam: string | null;
  selectedPosition: string | null;
  resetFilters: (dispatch: Dispatch<SearchActionType>) => void;
  selectedRange: string | null;
  teamsFilter: (eventKey: any, dispatch: Dispatch<SearchActionType>) => void;
  positionFilter: (eventKey: any, dispatch: Dispatch<SearchActionType>) => void;
  rangeFilter: (ageRange: string, dispatch: Dispatch<SearchActionType>) => void;
  dispatch: Dispatch<SearchActionType>;
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
        const filteredTeams = teamData.leagueStandings.map((team: any) => {
          const newTeam = team?.team;
          return newTeam;
        });
        setFilterTeams(filteredTeams);
      },
    });

  // Error states

  if (teamError) return <div>An Error occurred: {teamError.message}</div>;

  const PLAYER_AGE_RANGES = ["16-20", "21-25", "26-30", "31-40"];

  const matchTeam = filterTeams.find((team) => team.name === selectedTeam);

  return (
    <Stack className="ms-4 p-3 bg-teal-200 gap-3 w-50 rounded">
      <Dropdown
        onSelect={(eventKey: any) => teamsFilter(eventKey, dispatch)}
        onClick={() => teams({ variables: { league: playerLeague } })}
      >
        <Dropdown.Toggle className="bg-white text-black border-black d-flex align-items-center gap-2">
          <p className="mt-2">{selectedTeam ? selectedTeam : "Select Team"}</p>
          {matchTeam ? (
            <img
              src={getLogosAndImages("teams", matchTeam.id)}
              alt=""
              width={40}
              height={40}
            />
          ) : (
            ""
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {filterTeams.map((team: TeamType, index: number) => (
            <Dropdown.Item key={index} eventKey={team.name}>
              {team.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown
        onSelect={(eventKey: any) => positionFilter(eventKey, dispatch)}
      >
        <Dropdown.Toggle className="bg-white text-black border-black">
          {selectedPosition ? selectedPosition : "Select Position"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {POSITIONS.map((position: string, index: number) => (
            <Dropdown.Item eventKey={position} key={index}>
              {position}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <div className="range">
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
      </div>

      <Button
        className="bg-red-400 border-black w-50"
        onClick={() => resetFilters(dispatch)}
      >
        Reset Filters
      </Button>
    </Stack>
  );
};

export default SearchFilters;
