import { ChangeEvent, FC, useState, KeyboardEvent, useEffect } from 'react';
import { Form, ListGroup, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { IoSearchOutline } from 'react-icons/io5';
import { IoMdClose } from "react-icons/io";
import { useLazyQuery, useQuery } from '@apollo/client';
import { AUTOCOMPLETE_QUERY } from '../../queries/search/autocompleteQuery';
import { PLAYER_SEARCH_QUERY } from '../../queries/search/playerSearchQuery';
import LeagueSelector from '../reusable/leagueSelector';

type Props = {
  search: boolean,
  close: () => void
}

const SearchPage = ({ search, close }: Props) => {

  // STATE variable
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playerSuggestions, setPlayerSuggestions] = useState<any[]>([]);
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState<any[]>([]);
  const [showAutoCompleteSuggestions, setShowAutoCompleteSuggestions] = useState<boolean>(false);
  const [autoCompleteSuggestionIndex, setAutoCompleteSuggestionIndex] = useState<number>(0);
  // TODO: add league selector and use data from autocomplete when clicking on suggestion to change it.
  const [playerLeague, setPlayerLeague] = useState<string>('Premier League');
  

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

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearchQuery(value)

  };

  useEffect(() => {
    if(searchQuery !== '') {
      setShowAutoCompleteSuggestions(true)
      autoComplete({ variables: { query: searchQuery } })
      if(playerLeague) {
        playerSearch({ variables: { query: searchQuery, league: playerLeague } })
      }
    }
    
  }, [searchQuery, playerLeague])
  
  const clearSearch = () => {
    setSearchQuery('')
    setAutoCompleteSuggestions([]);
    setAutoCompleteSuggestionIndex(-1)
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

  const handleSelectLeague = (eventKey: any) => setPlayerLeague(eventKey)

  return (
    <div className={`w-100 bg-white pt-3 d-flex flex-column gap-3 position-fixed transition-component ${search ? 'active' : ''}`} style={{ marginTop: '100px', paddingBottom: '500px' }}>
      
      <div className="d-flex justify-content-between">
    
        <Form className="d-flex w-50 ms-3 position-relative gap-3" >
            <LeagueSelector selectLeague={handleSelectLeague} playerLeague={playerLeague}/>

            <Form.Control
              
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder='search for players by last name ...'
              aria-label='Search'
              className=''
            />

            <Button className=" bg-transparent text-success border-0 p-1 position-absolute end-0">
              {!searchQuery ? <IoSearchOutline className=''/> : <IoMdClose onClick={clearSearch}/>}
            </Button>

            {(showAutoCompleteSuggestions) && <ListGroup className="position-absolute bg-white w-100 list-unstyled top-100 border rounded">
              {autoCompleteSuggestions.map((suggestion: any, index: number) => (
                <ListGroup.Item onClick={() => handleClickListItems(index)} key={index} active={index === autoCompleteSuggestionIndex} className={`hover-over ${index === autoCompleteSuggestionIndex ? 'bg-success' : ''}`}>{suggestion.name}</ListGroup.Item>
              ))}
            </ListGroup>}
        </Form>

      <Button onClick={() => close()} className='me-3'>
        <IoMdClose />
      </Button>
      </div>

      {searchQuery ? <div className="">{playerSuggestions.map((player: any, index: number) => (
        <p key={index}>{player?.name}</p>
      ))}</div> : <p>No current search results</p>}
    </div>
  )
}

export default SearchPage