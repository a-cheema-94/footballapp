// Functions

import { ChangeEvent, KeyboardEvent, Dispatch } from "react";
import { ACTIONS, SearchActionType } from "../reducer/searchReducer";

// export type DispatchType = Dispatch<SearchActionType>;

const clearSearch = (dispatch: Dispatch<SearchActionType>) => {
  dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: { searchQuery: "" } });
  dispatch({
    type: ACTIONS.SET_AUTO_COMPLETE_RESULTS,
    payload: { autoCompleteSuggestions: [] },
  });
  dispatch({
    type: ACTIONS.SET_AUTO_COMPLETE_INDEX,
    payload: { autoCompleteSuggestionIndex: -1 },
  });
};

const handleSearch = (
  event: ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch<SearchActionType>
) => {
  const value = event.target.value;

  dispatch({
    type: ACTIONS.SET_SEARCH_QUERY,
    payload: { searchQuery: value },
  });
};

const handleKeyDown = (
  event: KeyboardEvent<HTMLInputElement>,
  dispatch: Dispatch<SearchActionType>,
  autoCompleteSuggestionIndex: number,
  autoCompleteSuggestions: any[]
) => {
  if (event.key === "ArrowUp") {
    dispatch({
      type: ACTIONS.SET_AUTO_COMPLETE_INDEX,
      payload: { autoCompleteSuggestionIndex: "Up" },
    });
  } else if (event.key === "ArrowDown") {
    dispatch({
      type: ACTIONS.SET_AUTO_COMPLETE_INDEX,
      payload: { autoCompleteSuggestionIndex: "Down" },
    });
  } else if (event.key === "Enter") {
    event.preventDefault();
    if (autoCompleteSuggestionIndex >= 0) {
      dispatch({
        type: ACTIONS.FILTER_PLAYER_LEAGUE,
        payload: {
          playerLeague:
            autoCompleteSuggestions[autoCompleteSuggestionIndex].league,
        },
      });
      dispatch({
        type: ACTIONS.SET_SEARCH_QUERY,
        payload: {
          searchQuery:
            autoCompleteSuggestions[autoCompleteSuggestionIndex].name,
        },
      });
    }

    setTimeout(() => {
      dispatch({
        type: ACTIONS.TOGGLE_AUTOCOMPLETE_MENU,
        payload: { showAutoCompleteSuggestions: false },
      });
      dispatch({
        type: ACTIONS.SET_AUTO_COMPLETE_INDEX,
        payload: { autoCompleteSuggestionIndex: -1 },
      });
    }, 100);
  }
};

const handleClickListItems = (
  index: number,
  dispatch: Dispatch<SearchActionType>,
  autoCompleteSuggestions: any[]
) => {
  dispatch({
    type: ACTIONS.FILTER_PLAYER_LEAGUE,
    payload: {
      playerLeague: autoCompleteSuggestions[index].league,
    },
  });
  dispatch({
    type: ACTIONS.SET_SEARCH_QUERY,
    payload: { searchQuery: autoCompleteSuggestions[index].name },
  });
  setTimeout(() => {
    dispatch({
      type: ACTIONS.TOGGLE_AUTOCOMPLETE_MENU,
      payload: { showAutoCompleteSuggestions: false },
    });
    dispatch({
      type: ACTIONS.SET_AUTO_COMPLETE_INDEX,
      payload: { autoCompleteSuggestionIndex: -1 },
    });
  }, 100);
};

const handleSelectLeague = (
  eventKey: any,
  dispatch: Dispatch<SearchActionType>
) =>
  dispatch({
    type: ACTIONS.FILTER_PLAYER_LEAGUE,
    payload: {
      playerLeague: eventKey,
    },
  });

const openFilters = (dispatch: Dispatch<SearchActionType>) =>
  dispatch({
    type: ACTIONS.TOGGLE_SEARCH_FILTERS,
    payload: { showFilters: true },
  });

const resetFilters = (dispatch: Dispatch<SearchActionType>) => {
  dispatch({
    type: ACTIONS.FILTER_PLAYER_TEAM,
    payload: { playerTeam: null },
  });
  dispatch({
    type: ACTIONS.FILTER_PLAYER_POSITION,
    payload: { playerPosition: null },
  });
  dispatch({
    type: ACTIONS.FILTER_PLAYER_RANGE,
    payload: { playerRange: null },
  });
};

const closeFilters = (dispatch: Dispatch<SearchActionType>) => {
  dispatch({
    type: ACTIONS.TOGGLE_SEARCH_FILTERS,
    payload: { showFilters: false },
  });
  resetFilters(dispatch);
};


// search filter functions
const handlePositionFilter = (
  eventKey: any,
  dispatch: Dispatch<SearchActionType>
) =>
  dispatch({
    type: ACTIONS.FILTER_PLAYER_POSITION,
    payload: {
      playerPosition: eventKey,
    },
  });

const handleTeamsFilter = (
  eventKey: any,
  dispatch: Dispatch<SearchActionType>
) =>
  dispatch({
    type: ACTIONS.FILTER_PLAYER_TEAM,
    payload: {
      playerTeam: eventKey,
    },
  });

const handleRangeFilter = (
  ageRange: string,
  dispatch: Dispatch<SearchActionType>
) =>
  dispatch({
    type: ACTIONS.FILTER_PLAYER_RANGE,
    payload: {
      playerRange: ageRange,
    },
  });

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
