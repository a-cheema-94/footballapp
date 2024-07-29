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
import { initialSearchState, searchReducer } from './searchReducer';

type Props = {
  search: boolean,
  close: () => void
}

const SearchPage = ({ search, close }: Props) => {

  // STATE variables
  const [searchPageState, dispatch] = useReducer(searchReducer, initialSearchState);

  // menus
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showAutoCompleteSuggestions, setShowAutoCompleteSuggestions] = useState<boolean>(false);
  
  // data
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playerSuggestions, setPlayerSuggestions] = useState<any[]>([]);
  const [, setAutoCompleteSuggestions] = useState<any[]>([]);
  const [autoCompleteSuggestionIndex, setAutoCompleteSuggestionIndex] = useState<number>(0);

  // search filters
  const [playerLeague, setPlayerLeague] = useState<string>('Premier League');
  const [playerTeam, setPlayerTeam] = useState<string | null>(null);
  const [playerPosition, setPlayerPosition] = useState<string | null>(null);
  const [playerRange, setPlayerRange] = useState<string | null>(null);
  
  // ref
  
  // QUERIES
  const [autoComplete, { data: autoCompleteData, loading: autoCompleteLoading, error: autoCompleteError }] = useLazyQuery(AUTOCOMPLETE_QUERY, {
    onCompleted: (autoCompleteData: any) => {
      setAutoCompleteSuggestions(autoCompleteData?.autoCompletePlayer)
      
    },
  })
  const [playerSearch, { data: playerSearchData, loading: playerSearchLoading, error: playerSearchError }] = useLazyQuery(PLAYER_SEARCH_QUERY, {
    onCompleted: (playerSearchData: any) => {
      setPlayerSuggestions(playerSearchData?.playerSearch)
    }
  })

  // Error states
  
  if(playerSearchError) return <div>An Error occurred: {playerSearchError.message}</div>
  
  if(autoCompleteError) return <div>An Error occurred: {autoCompleteError.message}</div>
  
  
  useEffect(() => {
    if(searchQuery !== '') {
      setShowAutoCompleteSuggestions(true)
      autoComplete({ variables: { query: searchQuery } })
      if(playerLeague) {
        playerSearch({ variables: { query: searchQuery, league: playerLeague, team: playerTeam, range: playerRange, position: playerPosition } })
      }
    }
    
    return () => setShowAutoCompleteSuggestions(false)
    
  }, [searchQuery, playerLeague, playerTeam, playerRange, playerPosition])
  
  
  // Functions
  
  const clearSearch = () => {
    setSearchQuery('')
    setAutoCompleteSuggestions([]);
    setAutoCompleteSuggestionIndex(-1)
  };
  
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    
    setSearchQuery(value)
    
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'ArrowUp') {
      setAutoCompleteSuggestionIndex(prevIndex => Math.max(0 , prevIndex - 1) )
    } else if (event.key === 'ArrowDown') {
      setAutoCompleteSuggestionIndex(prevIndex => Math.min(prevIndex + 1, autoCompleteSuggestions.length - 1))
    } else if(event.key === 'Enter') {

      event.preventDefault();
      if(autoCompleteSuggestionIndex >= 0) {
        setPlayerLeague(autoCompleteSuggestions[autoCompleteSuggestionIndex].league)
        setSearchQuery(autoCompleteSuggestions[autoCompleteSuggestionIndex].name)
      }
      
      setTimeout(() => {
        setShowAutoCompleteSuggestions(false)
        setAutoCompleteSuggestionIndex(-1)
      }, 100)
    }
  }
  
  
  const handleClickListItems = (index: number) => {
    setPlayerLeague(autoCompleteSuggestions[index].league)
    setSearchQuery(autoCompleteSuggestions[index].name)
    setTimeout(() => {
      setShowAutoCompleteSuggestions(false)
      setAutoCompleteSuggestionIndex(-1)
    }, 100)
  }
  
  const handleSelectLeague = (eventKey: any) => setPlayerLeague(eventKey);
  
  const openFilters = () => setShowFilters(true);
  const resetFilters = () => {
    setPlayerTeam(null);
    setPlayerPosition(null);
    setPlayerRange(null);
  }
  const closeFilters = () => {
    setShowFilters(false);
    resetFilters();
  };

  // Click outside autocomplete menu.
  const closeAutoComplete = () => setShowAutoCompleteSuggestions(false);
  const autoCompleteRef = useContentVisible<HTMLDivElement>(closeAutoComplete);
  
  return (
    <div className={`w-100 bg-white d-flex flex-column gap-3 ${search ? 'active' : ''}`} >
      
      <div className="d-flex justify-content-between position-fixed bg-white w-100 z-3 p-2">
    
        <Form className="d-flex w-50 ms-4 gap-2 align-items-center">
            <LeagueSelector selectLeague={handleSelectLeague} playerLeague={playerLeague}/>

            <div className="w-100 position-relative">

                <Form.Control
                  
                  value={searchQuery}
                  onChange={handleSearch}
                  onKeyDown={handleKeyDown}
                  type="text"
                  placeholder='search for players by last name ...'
                  aria-label='Search'
                  className='outline-none'
                />
                {searchQuery && <CloseButton onClick={clearSearch} className='position-absolute end-0 top-0 mt-2 me-1'></CloseButton>}

              <AutoComplete autoCompleteRef={autoCompleteRef} autoCompleteSuggestionIndex={autoCompleteSuggestionIndex} handleClickListItems={handleClickListItems} autoCompleteSuggestions={autoCompleteSuggestions} showAutoCompleteSuggestions={showAutoCompleteSuggestions} showFilters={showFilters}/>
            </div>

            <SearchFiltersBtn showFilters={showFilters} openFilters={openFilters} closeFilters={closeFilters}/>
            <br />
        </Form>

        <Button onClick={() => close()} className='me-3 bg-transparent text-black border-0'>
          <IoMdClose />
        </Button>
      </div>

      <div style={{ marginTop: '5rem' }}>

        {showFilters && 
        <SearchFilters
          resetFilters={resetFilters}
          playerLeague={playerLeague} 
          selectedTeam={playerTeam} 
          setSelectedTeam={setPlayerTeam}
          selectedPosition={playerPosition}
          setSelectedPosition={setPlayerPosition}
          selectedRange={playerRange}
          setSelectedRange={setPlayerRange}
        />}

        {searchQuery ? <div className="overflow-y-auto">{playerSuggestions.map((player: any, index: number) => (
          <PlayerSearchResult player={player} key={index}/>
        ))}</div> : <p className='text-green-500 text-hover-purple-500'>No current search results</p>}
      </div>
    </div>
  )
}

export default SearchPage