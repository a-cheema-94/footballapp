import { ChangeEvent, KeyboardEvent, useEffect, useReducer } from "react";
import { CloseButton, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { IoMdClose } from "react-icons/io";
import { useLazyQuery } from "@apollo/client";
import { AUTOCOMPLETE_QUERY } from "../../../queries/search/autocompleteQuery";
import { PLAYER_SEARCH_QUERY } from "../../../queries/search/playerSearchQuery";
import LeagueSelector from "../../reusable/leagueSelector";
import useContentVisible from "../../reusable/useContentVisible";
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
import { SquadMemberType } from "../../../queries/types/queryTypes";

type Props = {
  search: boolean;
  close: () => void;
};

const SearchPage = ({ search, close }: Props) => {
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
  } = searchPageState;

  // QUERIES
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

  // Error states

  if (playerSearchError)
    return <div>An Error occurred: {playerSearchError.message}</div>;

  if (autoCompleteError)
    return <div>An Error occurred: {autoCompleteError.message}</div>;

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

  // close auto complete menu when clicking outside.

  const closeAutoComplete = () =>
    dispatch({
      type: "TOGGLE_AUTOCOMPLETE_MENU",
      payload: { showAutoCompleteSuggestions: false },
    });
  const autoCompleteRef = useContentVisible<HTMLDivElement>(closeAutoComplete);

  return (
    <div
      className={`w-100 bg-white d-flex flex-column gap-3 ${
        search ? "active" : ""
      }`}
    >
      <div className="d-flex justify-content-between position-fixed bg-white w-100 z-3 p-2">
        <Form className="d-flex w-50 ms-4 gap-2 align-items-center">
          
          <LeagueSelector
            selectLeague={handleSelectLeague}
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
              aria-label="Search"
              className="outline-none"
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

        <Button
          onClick={() => close()}
          className="me-3 bg-transparent text-black border-0"
        >
          <IoMdClose />
        </Button>
      </div>

      <div style={{ marginTop: "5rem" }}>
        {showFilters && (
          <SearchFilters
            resetFilters={resetFilters}
            playerLeague={playerLeague}
            selectedTeam={playerTeam}
            selectedPosition={playerPosition}
            selectedRange={playerRange}
            teamsFilter={handleTeamsFilter}
            positionFilter={handlePositionFilter}
            rangeFilter={handleRangeFilter}
            dispatch={dispatch}
          />
        )}

        {searchQuery ? (
          <div className="overflow-y-auto">
            {playerSuggestions.map((player: SquadMemberType, index: number) => (
              <PlayerSearchResult player={player} key={index} />
            ))}
          </div>
        ) : (
          <p className="text-green-500 text-hover-purple-500">
            No current search results
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
