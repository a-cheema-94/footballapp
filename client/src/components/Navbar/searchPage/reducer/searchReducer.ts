import { SquadMemberType } from "../../../../queries/types/queryTypes";

// types

type SearchStateType = {
  showFilters: boolean;
  showAutoCompleteSuggestions: boolean;
  searchQuery: string;
  playerSuggestions: SquadMemberType[];
  autoCompleteSuggestions: SquadMemberType[];
  autoCompleteSuggestionIndex: number;
  playerLeague: string;
  playerTeam: string | null;
  playerPosition: string | null;
  playerRange: string | null;
};

// state and action setup

const initialSearchState: SearchStateType = {
  showFilters: false,
  showAutoCompleteSuggestions: false,
  searchQuery: "",
  playerSuggestions: [],
  autoCompleteSuggestions: [],
  autoCompleteSuggestionIndex: 0,
  playerLeague: "Premier League",
  playerTeam: null,
  playerPosition: null,
  playerRange: null,
};

// TODO => sort out action type for the payload.

type SearchActionMap = {
  TOGGLE_SEARCH_FILTERS: { showFilters: boolean };
  TOGGLE_AUTOCOMPLETE_MENU: { showAutoCompleteSuggestions: boolean };
  SET_SEARCH_QUERY: { searchQuery: string };
  SET_PLAYER_SEARCH_RESULTS: { playerSuggestions: SquadMemberType[] };
  SET_AUTO_COMPLETE_RESULTS: { autoCompleteSuggestions: SquadMemberType[] };
  SET_AUTO_COMPLETE_INDEX: { autoCompleteSuggestionIndex: number };
  FILTER_PLAYER_LEAGUE: { playerLeague: string };
  FILTER_PLAYER_TEAM: { playerTeam: string | null };
  FILTER_PLAYER_POSITION: { playerPosition: string | null };
  FILTER_PLAYER_RANGE: { playerRange: string | null };
};

type SearchActionType<T extends keyof SearchActionMap> = {
  type: T;
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
  ["SET_PLAYER_SEARCH_RESULTS"]: (
    state: SearchStateType,
    action: SearchActionType<"SET_PLAYER_SEARCH_RESULTS">
  ) => {
    return { ...state, playerSuggestions: action.payload.playerSuggestions };
  },
  ["SET_AUTO_COMPLETE_RESULTS"]: (
    state: SearchStateType,
    action: SearchActionType<"SET_AUTO_COMPLETE_RESULTS">
  ) => {
    return {
      ...state,
      autoCompleteSuggestions: action.payload.autoCompleteSuggestions,
    };
  },
  ["SET_AUTO_COMPLETE_INDEX"]: (
    state: SearchStateType,
    action: SearchActionType<"SET_AUTO_COMPLETE_INDEX">
  ) => {
    if (action.payload.autoCompleteSuggestionIndex === 1) {
      return {
        ...state,
        autoCompleteSuggestionIndex: Math.max(
          0,
          state.autoCompleteSuggestionIndex - 1
        ),
      };
    } else if (action.payload.autoCompleteSuggestionIndex === 0) {
      return {
        ...state,
        autoCompleteSuggestionIndex: Math.min(
          state.autoCompleteSuggestionIndex + 1,
          state.autoCompleteSuggestions.length - 1
        ),
      };
    } else {
      return {
        ...state,
        autoCompleteSuggestionIndex: action.payload.autoCompleteSuggestionIndex,
      };
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
  },
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
