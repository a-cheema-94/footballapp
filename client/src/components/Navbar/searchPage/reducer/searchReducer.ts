import { SquadMemberType, TeamStandingType } from "../../../../queries/types/queryTypes";

// state and action setup

const initialSearchState: SearchStateType = {
  showFilters: false,
  showAutoCompleteSuggestions: false,
  searchQuery: "",
  autoCompleteSuggestionIndex: 0,
  playerLeague: "Premier League",
  playerTeam: null,
  playerPosition: null,
  playerRange: null,
};

// types

type SearchStateType = {
  showFilters: boolean;
  showAutoCompleteSuggestions: boolean;
  searchQuery: string;
  autoCompleteSuggestionIndex: number;
  playerLeague: string;
  playerTeam: string | null;
  playerPosition: string | null;
  playerRange: string | null;
};



type SearchActionMap = {
  TOGGLE_SEARCH_FILTERS: { showFilters: boolean };
  TOGGLE_AUTOCOMPLETE_MENU: { showAutoCompleteSuggestions: boolean };
  SET_SEARCH_QUERY: { searchQuery: string };
  SET_AUTO_COMPLETE_INDEX: { autoCompleteSuggestionIndex: number };
  FILTER_PLAYER_LEAGUE: { playerLeague: string };
  FILTER_PLAYER_TEAM: { playerTeam: string | null };
  FILTER_PLAYER_POSITION: { playerPosition: string | null };
  FILTER_PLAYER_RANGE: { playerRange: string | null };
};

type SearchActionType<T extends keyof SearchActionMap> = {
  type: T; // each type will be a string value.
  payload: SearchActionMap[T];
};  

type SearchActionHandlersType = {
  [T in keyof SearchActionMap]: (
    state: SearchStateType,
    action: SearchActionType<T>
  ) => SearchStateType;
};

const actionHandlers: SearchActionHandlersType = {
  ["TOGGLE_SEARCH_FILTERS"]: (
    state: SearchStateType,
    action: SearchActionType<"TOGGLE_SEARCH_FILTERS">
  ) => {
    return { ...state, showFilters: action.payload.showFilters };
  },

  ["TOGGLE_AUTOCOMPLETE_MENU"]: (
    state: SearchStateType,
    action: SearchActionType<"TOGGLE_AUTOCOMPLETE_MENU">
  ) => {
    return {
      ...state,
      showAutoCompleteSuggestions: action.payload.showAutoCompleteSuggestions,
    };
  },

  ["SET_SEARCH_QUERY"]: (
    state: SearchStateType,
    action: SearchActionType<"SET_SEARCH_QUERY">
  ) => {
    return { ...state, searchQuery: action.payload.searchQuery };
  },
  
  ["SET_AUTO_COMPLETE_INDEX"]: (
    state: SearchStateType,
    action: SearchActionType<"SET_AUTO_COMPLETE_INDEX">
  ) => {
    const initialIndexState = {
      ...state,
      autoCompleteSuggestionIndex: 0,
    };

    if (action.payload.autoCompleteSuggestionIndex === 0) {
      let newIndex = state.autoCompleteSuggestionIndex - 1
      while(newIndex > 0) {
        return {
          ...state,
          autoCompleteSuggestionIndex: newIndex
        }
      }
      return initialIndexState

    } else if (action.payload.autoCompleteSuggestionIndex > 0) {
      let newIndex = state.autoCompleteSuggestionIndex + 1
      let length = action.payload.autoCompleteSuggestionIndex;
      while(newIndex <= length) {
        return {
          ...state,
          autoCompleteSuggestionIndex: newIndex
        }
      }
      return initialIndexState
    } else {
      return initialIndexState
    }
  },
  ["FILTER_PLAYER_LEAGUE"]: (
    state: SearchStateType,
    action: SearchActionType<"FILTER_PLAYER_LEAGUE">
  ) => {
    return { ...state, playerLeague: action.payload.playerLeague };
  },
  ["FILTER_PLAYER_TEAM"]: (
    state: SearchStateType,
    action: SearchActionType<"FILTER_PLAYER_TEAM">
  ) => {
    return { ...state, playerTeam: action.payload.playerTeam };
  },
  ["FILTER_PLAYER_POSITION"]: (
    state: SearchStateType,
    action: SearchActionType<"FILTER_PLAYER_POSITION">
  ) => {
    return { ...state, playerPosition: action.payload.playerPosition };
  },
  ["FILTER_PLAYER_RANGE"]: (
    state: SearchStateType,
    action: SearchActionType<"FILTER_PLAYER_RANGE">
  ) => {
    return { ...state, playerRange: action.payload.playerRange };
  }
};

// search reducer

const searchReducer = <T extends keyof SearchActionMap>(
  state: SearchStateType,
  action: SearchActionType<T>
) => {
  if (actionHandlers[action.type]) {
    return actionHandlers[action.type](state, action);
  } else {
    return state;
  }
};

export type { SearchStateType, SearchActionType };
export { initialSearchState, searchReducer };
