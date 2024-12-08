import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useDeferredValue,
  useEffect,
  useReducer,
} from "react";
import { CloseButton, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { IoMdClose } from "react-icons/io";
import { useLazyQuery } from "@apollo/client";
import { AUTOCOMPLETE_QUERY } from "../../../queries/search/autocompleteQuery";
import { PLAYER_SEARCH_QUERY } from "../../../queries/search/playerSearchQuery";
import LeagueSelector from "../../reusable/leagueSelector";
import useContentVisible from "../../reusable/customHooks/useContentVisible";
import SearchFiltersBtn from "./filters/SearchFiltersBtn";
import SearchFilters from "./filters/SearchFilters";
import PlayerSearchResult from "./searchResult/PlayerSearchResult";
import AutoComplete from "./autoComplete/AutoComplete";
import { initialSearchState, searchReducer } from "./reducer/searchReducer";
import {
  clearSearch,
  handleSearch,
  handleKeyDown,
  handleClickListItems,
  handleSelectLeague,
  openFilters,
  closeFilters,
  handlePositionFilter,
  handleRangeFilter,
  handleTeamsFilter,
  resetFilters,
} from "./searchFunctions/searchPageFunctions";
import {
  SquadMemberType,
  TeamStandingType,
} from "../../../queries/types/queryTypes";
import { LEAGUE_TABLE_QUERY } from "../../../queries/leagueTableQuery";
import { ThemeContext } from "../../../context/ThemeProvider";

type Props = {
  search: boolean;
  close: () => void;
};

// todo: clear all :any types.

const SearchPage = ({ search, close }: Props) => {
  const { theme } = useContext(ThemeContext);

  // reducer for searchPage state
  const [searchPageState, dispatch] = useReducer(
    searchReducer,
    initialSearchState
  );

  // destructure state
  const {
    showFilters,
    showAutoCompleteSuggestions,
    searchQuery,
    playerTeam,
    playerSuggestions,
    playerRange,
    playerPosition,
    playerLeague,
    autoCompleteSuggestions,
    autoCompleteSuggestionIndex,
    currentLeagueTeams,
  } = searchPageState;

  const deferredSearchQuery = useDeferredValue(searchQuery);

  // QUERIES
  // todo: go over query logic and see if can optimize.

  // autocomplete query
  const [
    autoComplete,
    {
      data: autoCompleteData,
      loading: autoCompleteLoading,
      error: autoCompleteError,
    },
  ] = useLazyQuery(AUTOCOMPLETE_QUERY, {
    onCompleted: (autoCompleteData: any) => {
      dispatch({
        type: "SET_AUTO_COMPLETE_RESULTS",
        payload: {
          autoCompleteSuggestions: autoCompleteData?.autoCompletePlayer,
        },
      });
    },
  });

  // search query
  const [
    playerSearch,
    {
      data: playerSearchData,
      loading: playerSearchLoading,
      error: playerSearchError,
    },
  ] = useLazyQuery(PLAYER_SEARCH_QUERY, {
    onCompleted: (playerSearchData: any) => {
      dispatch({
        type: "SET_PLAYER_SEARCH_RESULTS",
        payload: { playerSuggestions: playerSearchData?.playerSearch },
      });
    },
  });

  // team standings
  const [teams, { data: teamData, loading: teamLoading, error: teamError }] =
    useLazyQuery(LEAGUE_TABLE_QUERY, {
      onCompleted: (teamData: any) => {
        dispatch({
          type: "SET_CURRENT_LEAGUE_TEAMS",
          payload: { currentLeagueTeams: teamData?.leagueStandings },
        });
      },
    });

  // Error states

  if (playerSearchError)
    return <div>An Error occurred: {playerSearchError.message}</div>;

  if (autoCompleteError)
    return <div>An Error occurred: {autoCompleteError.message}</div>;

  if (teamError) return <div>An Error occurred: {teamError.message}</div>;

  // effect to handle search and autocomplete queries.
  useEffect(() => {
    if (searchQuery !== "") {
      dispatch({
        type: "TOGGLE_AUTOCOMPLETE_MENU",
        payload: { showAutoCompleteSuggestions: true },
      });
      autoComplete({ variables: { query: searchQuery } });
      if (playerLeague) {
        playerSearch({
          variables: {
            query: searchQuery,
            league: playerLeague,
            team: playerTeam,
            range: playerRange,
            position: playerPosition,
          },
        });
      }
    }

    return () =>
      dispatch({
        type: "TOGGLE_AUTOCOMPLETE_MENU",
        payload: { showAutoCompleteSuggestions: false },
      });
  }, [searchQuery, playerLeague, playerTeam, playerRange, playerPosition]);

  //query Team standings when playerLeague changes use useEffect.
  useEffect(() => {
    teams({ variables: { league: playerLeague } });
  }, [playerLeague]);

  // close auto complete menu when clicking outside.

  const closeAutoComplete = () =>
    dispatch({
      type: "TOGGLE_AUTOCOMPLETE_MENU",
      payload: { showAutoCompleteSuggestions: false },
    });

  // we can click outside of autocomplete suggestions to close suggestions using this ref.
  const autoCompleteRef = useContentVisible<HTMLDivElement>(closeAutoComplete);

  // if search query matches on player suggestion exactly.

  const queryMatchesPlayer = playerSuggestions.some(
    (player) => player.name === searchQuery
  );

  // navbar height: 85px,

  return (
    <div
      className={`${
        theme === "light" ? "bg-light text-dark" : "bg-dark text-light"
      } w-100 d-flex flex-column gap-3 pb-1`}
    >
      <div className="d-flex justify-content-between w-100 p-2 flex-wrap">
        <Form className="d-flex w-50 gap-2 align-items-center">
          <LeagueSelector
            selectLeague={handleSelectLeague}
            resetFilters={resetFilters}
            dispatch={dispatch}
            league={playerLeague}
          />

          <div className="w-100 position-relative">
            <Form.Control
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleSearch(e, dispatch)
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(
                  e,
                  dispatch,
                  autoCompleteSuggestionIndex,
                  autoCompleteSuggestions
                )
              }
              type="text"
              placeholder="search for players by last name ..."
              name="search"
              aria-label="Search"
              className=""
              style={{ minWidth: "200px" }}
            />
            {searchQuery && (
              <CloseButton
                onClick={() => clearSearch(dispatch)}
                className="position-absolute end-0 top-0 mt-2 me-1"
              ></CloseButton>
            )}

            <AutoComplete
              autoCompleteRef={autoCompleteRef}
              autoCompleteSuggestionIndex={autoCompleteSuggestionIndex}
              handleClickListItems={handleClickListItems}
              autoCompleteSuggestions={autoCompleteSuggestions}
              showAutoCompleteSuggestions={showAutoCompleteSuggestions}
              showFilters={showFilters}
              dispatch={dispatch}
            />
          </div>

          <SearchFiltersBtn
            showFilters={showFilters}
            openFilters={openFilters}
            closeFilters={closeFilters}
            dispatch={dispatch}
          />
          <br />
        </Form>

        {showFilters && (
          <SearchFilters
            resetFilters={resetFilters}
            selectedTeam={playerTeam}
            selectedPosition={playerPosition}
            selectedRange={playerRange}
            teamsFilter={handleTeamsFilter}
            positionFilter={handlePositionFilter}
            rangeFilter={handleRangeFilter}
            dispatch={dispatch}
            leagueTeams={currentLeagueTeams}
          />
        )}
        <Button
          onClick={() => close()}
          className={`me-3 bg-transparent ${
            theme === "light" ? "text-dark" : "text-light"
          } border-0 position-absolute end-0 mt-2`}
        >
          <IoMdClose />
        </Button>
      </div>

      <div style={{ minHeight: "100dvh" }}>
        {searchQuery ? (
          queryMatchesPlayer ? (
            <PlayerSearchResult
              player={playerSuggestions[0]}
              team={currentLeagueTeams}
            />
          ) : (
            <div className="overflow-y-auto d-flex justify-content-center gap-2 flex-wrap m-2">
              {playerSuggestions.map(
                (player: SquadMemberType, index: number) => (
                  <PlayerSearchResult
                    player={player}
                    team={currentLeagueTeams}
                    key={index}
                  />
                )
              )}
            </div>
          )
        ) : (
          <p
            className={` ${
              theme === "light" ? "text-teal-700" : "text-teal-400"
            } ms-2`}
          >
            No current search results, try specifying a team.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
