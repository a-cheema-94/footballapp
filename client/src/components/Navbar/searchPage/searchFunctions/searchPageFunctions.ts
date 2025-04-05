// Functions

import { ChangeEvent, KeyboardEvent, Dispatch } from "react";
import { SearchActionType } from "../reducer/searchReducer";
import { SquadMemberType } from "../../../../queries/types/queryTypes";
import { removeAposHTMLCharacter } from "../../../../functions/removeApos";

const clearSearch = (
  dispatch: Dispatch<
    SearchActionType<
      | "SET_SEARCH_QUERY"
      | "SET_AUTO_COMPLETE_RESULTS"
      | "SET_AUTO_COMPLETE_INDEX"
    >
  >
) => {
  dispatch({ type: "SET_SEARCH_QUERY", payload: { searchQuery: "" } });
  dispatch({
    type: "SET_AUTO_COMPLETE_RESULTS",
    payload: { autoCompleteSuggestions: [] },
  });
  dispatch({
    type: "SET_AUTO_COMPLETE_INDEX",
    payload: { autoCompleteSuggestionIndex: -1 },
  });
};

const handleSearch = (
  event: ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch<SearchActionType<"SET_SEARCH_QUERY">>
) => {
  const value = event.target.value;

  dispatch({
    type: "SET_SEARCH_QUERY",
    payload: { searchQuery: value },
  });
};

const handleKeyDown = (
  event: KeyboardEvent<HTMLInputElement>,
  dispatch: Dispatch<
    SearchActionType<
      | "SET_AUTO_COMPLETE_INDEX"
      | "FILTER_PLAYER_LEAGUE"
      | "SET_SEARCH_QUERY"
      | "SET_AUTO_COMPLETE_RESULTS"
      | "TOGGLE_AUTOCOMPLETE_MENU"
    >
  >,
  autoCompleteSuggestionIndex: number,
  autoCompleteSuggestions: SquadMemberType[]
) => {
  // we set the index of the autocomplete suggestions on arrow up and down to move through the suggestions using keys and on the enter key we switch to the right league and set the search query to our selected autocomplete suggestion.

  if (event.key === "ArrowUp") {
    dispatch({
      type: "SET_AUTO_COMPLETE_INDEX",
      payload: { autoCompleteSuggestionIndex: 1 },
    });
  } else if (event.key === "ArrowDown") {
    dispatch({
      type: "SET_AUTO_COMPLETE_INDEX",
      payload: { autoCompleteSuggestionIndex: 0 },
    });
  } else if (event.key === "Enter") {
    event.preventDefault();
    if (autoCompleteSuggestionIndex >= 0) {
      dispatch({
        type: "FILTER_PLAYER_LEAGUE",
        payload: {
          playerLeague:
            autoCompleteSuggestions[autoCompleteSuggestionIndex].league,
        },
      });
      dispatch({
        type: "SET_SEARCH_QUERY",
        payload: {
          searchQuery:
          removeAposHTMLCharacter(autoCompleteSuggestions[autoCompleteSuggestionIndex].name),
        },
      });
    }

    setTimeout(() => {
      dispatch({
        type: "TOGGLE_AUTOCOMPLETE_MENU",
        payload: { showAutoCompleteSuggestions: false },
      });
      dispatch({
        type: "SET_AUTO_COMPLETE_INDEX",
        payload: { autoCompleteSuggestionIndex: -1 },
      });
    }, 100);
  }
};

const handleClickListItems = (
  index: number,
  dispatch: Dispatch<
    SearchActionType<
      | "FILTER_PLAYER_LEAGUE"
      | "SET_SEARCH_QUERY"
      | "TOGGLE_AUTOCOMPLETE_MENU"
      | "SET_AUTO_COMPLETE_INDEX"
    >
  >,
  autoCompleteSuggestions: SquadMemberType[]
) => {

  dispatch({
    type: "FILTER_PLAYER_LEAGUE",
    payload: {
      playerLeague: autoCompleteSuggestions[index].league,
    },
  });
  dispatch({
    type: "SET_SEARCH_QUERY",
    payload: { searchQuery: removeAposHTMLCharacter(autoCompleteSuggestions[index].name) },
  });
  setTimeout(() => {
    dispatch({
      type: "TOGGLE_AUTOCOMPLETE_MENU",
      payload: { showAutoCompleteSuggestions: false },
    });
    dispatch({
      type: "SET_AUTO_COMPLETE_INDEX",
      payload: { autoCompleteSuggestionIndex: -1 },
    });
  }, 100);
};

const handleSelectLeague = (
  eventKey: string,
  dispatch: Dispatch<SearchActionType<"FILTER_PLAYER_LEAGUE">>
) =>
  dispatch({
    type: "FILTER_PLAYER_LEAGUE",
    payload: {
      playerLeague: eventKey,
    },
  });

const openFilters = (
  dispatch: Dispatch<SearchActionType<"TOGGLE_SEARCH_FILTERS">>
) =>
  dispatch({
    type: "TOGGLE_SEARCH_FILTERS",
    payload: { showFilters: true },
  });

const resetFilters = (
  dispatch: Dispatch<
    SearchActionType<
      "FILTER_PLAYER_TEAM" | "FILTER_PLAYER_POSITION" | "FILTER_PLAYER_RANGE"
    >
  >
) => {
  dispatch({
    type: "FILTER_PLAYER_TEAM",
    payload: { playerTeam: null },
  });
  dispatch({
    type: "FILTER_PLAYER_POSITION",
    payload: { playerPosition: null },
  });
  dispatch({
    type: "FILTER_PLAYER_RANGE",
    payload: { playerRange: null },
  });
};

const closeFilters = (
  dispatch: Dispatch<
    SearchActionType<
      | "TOGGLE_SEARCH_FILTERS"
      | "FILTER_PLAYER_TEAM"
      | "FILTER_PLAYER_POSITION"
      | "FILTER_PLAYER_RANGE"
    >
  >
) => {
  dispatch({
    type: "TOGGLE_SEARCH_FILTERS",
    payload: { showFilters: false },
  });
  resetFilters(dispatch);
};

// search filter functions
const handlePositionFilter = (
  eventKey: any,
  dispatch: Dispatch<SearchActionType<"FILTER_PLAYER_POSITION">>
) =>
  dispatch({
    type: "FILTER_PLAYER_POSITION",
    payload: {
      playerPosition: eventKey,
    },
  });

const handleTeamsFilter = (
  eventKey: any,
  dispatch: Dispatch<SearchActionType<"FILTER_PLAYER_TEAM">>
) =>
  dispatch({
    type: "FILTER_PLAYER_TEAM",
    payload: {
      playerTeam: eventKey,
    },
  });

const handleRangeFilter = (
  ageRange: string,
  dispatch: Dispatch<SearchActionType<"FILTER_PLAYER_RANGE">>
) =>
  dispatch({
    type: "FILTER_PLAYER_RANGE",
    payload: {
      playerRange: ageRange,
    },
  });

// const handleLeagueTeams = () => dispatch({ type: "", payload: { currentLeagueTeams:  } })

export {
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
};
