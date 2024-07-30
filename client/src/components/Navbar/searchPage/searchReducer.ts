// types

type SearchStateType = {
  showFilters: boolean,
  showAutoCompleteSuggestions: boolean,
  searchQuery: string,
  playerSuggestions: any[],
  autoCompleteSuggestions: any[], 
  autoCompleteSuggestionIndex: number, //HERE
  playerLeague: string,
  playerTeam: string | null,
  playerPosition: string | null,
  playerRange: string | null,
}

type SearchActionType = {
  type: string,
  payload: any
}

export const initialSearchState = {
  showFilters: false,
  showAutoCompleteSuggestions: false,
  searchQuery: '',
  playerSuggestions: [],
  autoCompleteSuggestions: [],
  autoCompleteSuggestionIndex: 0,
  playerLeague: 'Premier League',
  playerTeam: null,
  playerPosition: null,
  playerRange: null,
}

export const ACTIONS = {
  TOGGLE_SEARCH_FILTERS: 'TOGGLE_SEARCH_FILTERS',
  TOGGLE_AUTOCOMPLETE_MENU: 'TOGGLE_AUTOCOMPLETE_MENU',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_PLAYER_SEARCH_RESULTS: 'SET_PLAYER_SEARCH_RESULTS',
  SET_AUTO_COMPLETE_RESULTS: 'SET_AUTO_COMPLETE_RESULTS',
  SET_AUTO_COMPLETE_INDEX: 'SET_AUTO_COMPLETE_INDEX',
  FILTER_PLAYER_LEAGUE: 'FILTER_PLAYER_LEAGUE',
  FILTER_PLAYER_TEAM: 'FILTER_PLAYER_TEAM',
  FILTER_PLAYER_POSITION: 'FILTER_PLAYER_POSITION',
  FILTER_PLAYER_RANGE: 'FILTER_PLAYER_RANGE',
}

const actionHandlers = {
  [ACTIONS.TOGGLE_SEARCH_FILTERS]: (state: SearchStateType, action: SearchActionType) => {
    return { ...state, showFilters: action.payload.showFilters }
  },
  [ACTIONS.TOGGLE_AUTOCOMPLETE_MENU]: (state: SearchStateType, action: SearchActionType) => {
    return { ...state, showAutoCompleteSuggestions: action.payload.showAutoCompleteSuggestions }
  },
  [ACTIONS.SET_SEARCH_QUERY]: (state: SearchStateType, action: SearchActionType) => {
    return { ...state, searchQuery: action.payload.searchQuery }
  },
  [ACTIONS.SET_PLAYER_SEARCH_RESULTS]: (state: SearchStateType, action: SearchActionType) => {
    return { ...state, playerSuggestions: action.payload.playerSuggestions }
  },
  [ACTIONS.SET_AUTO_COMPLETE_RESULTS]: (state: SearchStateType, action: SearchActionType) => {
    return { ...state, autoCompleteSuggestions: action.payload.autoCompleteSuggestions }
  },
  [ACTIONS.SET_AUTO_COMPLETE_INDEX]: (state: SearchStateType, action: SearchActionType) => {
    if(action.payload.autoCompleteSuggestionIndex === 'Up') {
      return { ...state, autoCompleteSuggestionIndex: Math.max(0, state.autoCompleteSuggestionIndex - 1) }
    } else if (action.payload.autoCompleteSuggestionIndex === 'Down') {
      return { ...state, autoCompleteSuggestionIndex: Math.min(state.autoCompleteSuggestionIndex + 1, state.autoCompleteSuggestions.length - 1) }
    } else {
      return { ...state, autoCompleteSuggestionIndex: action.payload.autoCompleteSuggestionIndex }
    }
  },
  [ACTIONS.FILTER_PLAYER_LEAGUE]: (state: SearchStateType, action: SearchActionType) => {
    return { ...state, playerLeague: action.payload.playerLeague }
  },
  [ACTIONS.FILTER_PLAYER_TEAM]: (state: SearchStateType, action: SearchActionType) => {
    return { ...state, playerTeam: action.payload.playerTeam }
  },
  [ACTIONS.FILTER_PLAYER_POSITION]: (state: SearchStateType, action: SearchActionType) => {
    return { ...state, playerPosition: action.payload.playerPosition }
  },
  [ACTIONS.FILTER_PLAYER_RANGE]: (state: SearchStateType, action: SearchActionType) => {
    return { ...state, playerRange: action.payload.playerRange }
  },

}

export const searchReducer = (state: SearchStateType, action: SearchActionType) => {
  if(actionHandlers[action.type]) {
    return actionHandlers[action.type](state, action)
  } else {
    return state
  }
}