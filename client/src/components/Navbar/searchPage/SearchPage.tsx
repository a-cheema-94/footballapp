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
  handleClickResetFiltersBtn
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

// todo: solve problem of no searchable items (players), on first load, have to select team then query will execute. Maybe when first load, will call every squad of teams in selected league => now we have players to search through on first load.

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
    playerRange,
    playerPosition,
    playerLeague,
    autoCompleteSuggestionIndex,
  } = searchPageState;

  const deferredSearchQuery = useDeferredValue(searchQuery);

  // QUERIES
  // todo: test speed of searches / auto-complete and go over query logic and see if can optimize.

  // autocomplete query
  const [
    autoComplete,
    {
      data: autoCompleteData,
      loading: autoCompleteLoading,
      error: autoCompleteError,
    },
  ] = useLazyQuery(AUTOCOMPLETE_QUERY);

  // search query
  const [
    playerSearch,
    {
      data: playerSearchData,
      loading: playerSearchLoading,
      error: playerSearchError,
    },
  ] = useLazyQuery(PLAYER_SEARCH_QUERY);

  // team standings
  const [teams, { data: teamData, loading: teamLoading, error: teamError }] =
    useLazyQuery(LEAGUE_TABLE_QUERY);

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
      autoComplete({
        variables: {
          query: searchQuery,
          league: playerLeague,
          team: playerTeam,
          range: playerRange,
          position: playerPosition,
        },
      });
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


  return (
    <div
      className={`${
        theme === "light" ? "bg-light text-dark" : "bg-dark text-light"
      } w-100 d-flex flex-column gap-3 pb-1`}
    >

    {/* search bar and filters */}

      <div className="d-flex justify-content-between w-100 p-2 flex-wrap">
        <Form className="d-flex w-50 gap-2 align-items-center">
          <LeagueSelector
            selectLeague={handleSelectLeague}
            resetFilters={resetFilters}
            dispatch={dispatch}
            league={playerLeague}
          />

          <div style={{ maxWidth: '100%', }} className="position-relative">
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
                  autoCompleteData?.autoCompletePlayer
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
              autoCompleteSuggestions={autoCompleteData?.autoCompletePlayer ?? []}
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

{/* search results */}

        {showFilters && (
          <SearchFilters
            resetFilters={handleClickResetFiltersBtn}
            selectedTeam={playerTeam}
            selectedPosition={playerPosition}
            selectedRange={playerRange}
            teamsFilter={handleTeamsFilter}
            positionFilter={handlePositionFilter}
            rangeFilter={handleRangeFilter}
            dispatch={dispatch}
            leagueTeams={teamData?.leagueStandings ?? []}
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

        {searchQuery && (playerSearchData?.playerSearch ?? []).length > 0 ?
         (
            <div className="overflow-y-auto d-flex justify-content-center gap-2 flex-wrap m-2">
              {(playerSearchData?.playerSearch ?? []).map(
                (player: SquadMemberType, index: number) => (
                  <PlayerSearchResult
                    player={player}
                    team={teamData?.leagueStandings ?? []}
                    key={index}
                  />
                )
              )}
            </div>
          )
         : (
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