import { ChangeEvent, FC, useState, KeyboardEvent, useEffect, useReducer } from 'react';
import { CloseButton, Form, ListGroup, ListGroupProps, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { IoSearchOutline } from 'react-icons/io5';
import { IoMdClose } from "react-icons/io";
import { useLazyQuery, useQuery } from '@apollo/client';
import { AUTOCOMPLETE_QUERY } from '../../../queries/search/autocompleteQuery';
import { PLAYER_SEARCH_QUERY } from '../../../queries/search/playerSearchQuery';
import LeagueSelector from '../../reusable/leagueSelector';
import useContentVisible from '../../reusable/useContentVisible';
import SearchFiltersBtn from './SearchFiltersBtn';
import SearchFilters from './SearchFilters';
import PlayerSearchResult from './PlayerSearchResult';
import AutoComplete from './AutoComplete';
import { ACTIONS, initialSearchState, searchReducer } from './searchReducer';

type Props = {
  search: boolean,
  close: () => void
}

const SearchPage = ({ search, close }: Props) => {

  // reducer for searchPage state
  const [searchPageState, dispatch] = useReducer(searchReducer, initialSearchState);
    
  // QUERIES
  const [autoComplete, { data: autoCompleteData, loading: autoCompleteLoading, error: autoCompleteError }] = useLazyQuery(AUTOCOMPLETE_QUERY, {
    onCompleted: (autoCompleteData: any) => {
      dispatch({ type: ACTIONS.SET_AUTO_COMPLETE_RESULTS, payload: { autoCompleteSuggestions: autoCompleteData?.autoCompletePlayer } })
    },
  })
  const [playerSearch, { data: playerSearchData, loading: playerSearchLoading, error: playerSearchError }] = useLazyQuery(PLAYER_SEARCH_QUERY, {
    onCompleted: (playerSearchData: any) => {
      dispatch({ type: ACTIONS.SET_PLAYER_SEARCH_RESULTS, payload: { playerSuggestions: playerSearchData?.playerSearch } })
    }
  })

  // Error states
  
  if(playerSearchError) return <div>An Error occurred: {playerSearchError.message}</div>
  
  if(autoCompleteError) return <div>An Error occurred: {autoCompleteError.message}</div>
  
  
  useEffect(() => {
    if(searchPageState.searchQuery !== '') {
      dispatch({ type: ACTIONS.TOGGLE_AUTOCOMPLETE_MENU, payload: { showAutoCompleteSuggestions: true } })
      autoComplete({ variables: { query: searchPageState.searchQuery } })
      if(searchPageState.playerLeague) {
        playerSearch({ variables: { query: searchPageState.searchQuery, league: searchPageState.playerLeague, team: searchPageState.playerTeam, range: searchPageState.playerRange, position: searchPageState.playerPosition } })
      }
    }
    
    return () => dispatch({ type: ACTIONS.TOGGLE_AUTOCOMPLETE_MENU, payload: { showAutoCompleteSuggestions: false } })
    
  }, [searchPageState.searchQuery, searchPageState.playerLeague, searchPageState.playerTeam, searchPageState.playerRange, searchPageState.playerPosition])
  
  
  // Functions
  
  const clearSearch = () => {
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: { searchQuery: '' } })
    dispatch({ type: ACTIONS.SET_AUTO_COMPLETE_RESULTS, payload: { autoCompleteSuggestions: [] } })
    dispatch({ type: ACTIONS.SET_AUTO_COMPLETE_INDEX, payload: { autoCompleteSuggestionIndex: -1 } })
  };
  
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: { searchQuery: value } })
    
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'ArrowUp') {
      dispatch({ type: ACTIONS.SET_AUTO_COMPLETE_INDEX, payload: { autoCompleteSuggestionIndex: 'Up' } })
    } else if (event.key === 'ArrowDown') {
      dispatch({ type: ACTIONS.SET_AUTO_COMPLETE_INDEX, payload: { autoCompleteSuggestionIndex: 'Down' } })
    } else if(event.key === 'Enter') {

      event.preventDefault();
      if(searchPageState.autoCompleteSuggestionIndex >= 0) {
        dispatch({ type: ACTIONS.FILTER_PLAYER_LEAGUE, payload: {
          playerLeague: searchPageState.autoCompleteSuggestions[searchPageState.autoCompleteSuggestionIndex].league
        } });
        dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: { searchQuery: searchPageState.autoCompleteSuggestions[searchPageState.autoCompleteSuggestionIndex].name } })
      }
      
      setTimeout(() => {
        dispatch({ type: ACTIONS.TOGGLE_AUTOCOMPLETE_MENU, payload: { showAutoCompleteSuggestions: false } })
        dispatch({ type: ACTIONS.SET_AUTO_COMPLETE_INDEX, payload: { autoCompleteSuggestionIndex: -1 } })
      }, 100)
    }
  }
  
  
  const handleClickListItems = (index: number) => {
    dispatch({ type: ACTIONS.FILTER_PLAYER_LEAGUE, payload: {
      playerLeague: searchPageState.autoCompleteSuggestions[index].league
    } })
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: { searchQuery: searchPageState.autoCompleteSuggestions[index].name } })
    setTimeout(() => {
      dispatch({ type: ACTIONS.TOGGLE_AUTOCOMPLETE_MENU, payload: { showAutoCompleteSuggestions: false } })
      dispatch({ type: ACTIONS.SET_AUTO_COMPLETE_INDEX, payload: { autoCompleteSuggestionIndex: -1 } })
    }, 100)
  }
  
  const handleSelectLeague = (eventKey: any) => dispatch({ type: ACTIONS.FILTER_PLAYER_LEAGUE, payload: {
    playerLeague: eventKey
  } });

  
  
  const openFilters = () => dispatch({ type: ACTIONS.TOGGLE_SEARCH_FILTERS, payload: { showFilters: true } });
  const resetFilters = () => {
    dispatch({ type: ACTIONS.FILTER_PLAYER_TEAM, payload: { playerTeam: null } })
    dispatch({ type: ACTIONS.FILTER_PLAYER_POSITION, payload: { playerPosition: null } })
    dispatch({ type: ACTIONS.FILTER_PLAYER_RANGE, payload: { playerRange: null } })
  }
  const closeFilters = () => {
    dispatch({ type: ACTIONS.TOGGLE_SEARCH_FILTERS, payload: { showFilters: false } });
    resetFilters();
  };

  // Click outside autocomplete menu.
  const closeAutoComplete = () => dispatch({ type: ACTIONS.TOGGLE_AUTOCOMPLETE_MENU, payload: { showAutoCompleteSuggestions: false } })
  const autoCompleteRef = useContentVisible<HTMLDivElement>(closeAutoComplete);
  
  // search filter functions
  const handlePositionFilter = (eventKey: any) => dispatch({ type: ACTIONS.FILTER_PLAYER_POSITION, payload: {
    playerPosition: eventKey
  } })
  
  const handleTeamsFilter = (eventKey: any) => dispatch({ type: ACTIONS.FILTER_PLAYER_TEAM, payload: {
    playerTeam: eventKey
  } })
  

  const handleRangeFilter = (ageRange: string) => dispatch({ type: ACTIONS.FILTER_PLAYER_RANGE, payload: {
    playerRange: ageRange
  } })

  return (
    <div className={`w-100 bg-white d-flex flex-column gap-3 ${search ? 'active' : ''}`} >
      
      <div className="d-flex justify-content-between position-fixed bg-white w-100 z-3 p-2">
    
        <Form className="d-flex w-50 ms-4 gap-2 align-items-center">
            <LeagueSelector selectLeague={handleSelectLeague} playerLeague={searchPageState.playerLeague}/>

            <div className="w-100 position-relative">

                <Form.Control
                  
                  value={searchPageState.searchQuery}
                  onChange={handleSearch}
                  onKeyDown={handleKeyDown}
                  type="text"
                  placeholder='search for players by last name ...'
                  aria-label='Search'
                  className='outline-none'
                />
                {searchPageState.searchQuery && <CloseButton onClick={clearSearch} className='position-absolute end-0 top-0 mt-2 me-1'></CloseButton>}

              <AutoComplete autoCompleteRef={autoCompleteRef} autoCompleteSuggestionIndex={searchPageState.autoCompleteSuggestionIndex} handleClickListItems={handleClickListItems} autoCompleteSuggestions={searchPageState.autoCompleteSuggestions} showAutoCompleteSuggestions={searchPageState.showAutoCompleteSuggestions} showFilters={searchPageState.showFilters}/>
            </div>

            <SearchFiltersBtn showFilters={searchPageState.showFilters} openFilters={openFilters} closeFilters={closeFilters}/>
            <br />
        </Form>

        <Button onClick={() => close()} className='me-3 bg-transparent text-black border-0'>
          <IoMdClose />
        </Button>
      </div>

      <div style={{ marginTop: '5rem' }}>

        {searchPageState.showFilters && 
        <SearchFilters
          resetFilters={resetFilters}
          playerLeague={searchPageState.playerLeague} 
          selectedTeam={searchPageState.playerTeam} 
          selectedPosition={searchPageState.playerPosition}
          selectedRange={searchPageState.playerRange}
          teamsFilter={handleTeamsFilter}
          positionFilter={handlePositionFilter}
          rangeFilter={handleRangeFilter}
        />}

        {searchPageState.searchQuery ? <div className="overflow-y-auto">{searchPageState.playerSuggestions.map((player: any, index: number) => (
          <PlayerSearchResult player={player} key={index}/>
        ))}</div> : <p className='text-green-500 text-hover-purple-500'>No current search results</p>}
      </div>
    </div>
  )
}

export default SearchPage