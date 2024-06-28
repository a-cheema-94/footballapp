import { ChangeEvent, FC, useState, KeyboardEvent, useEffect } from 'react';
import { Form, ListGroup, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { IoSearchOutline } from 'react-icons/io5';
import { IoMdClose } from "react-icons/io";
import { useLazyQuery, useQuery } from '@apollo/client';
import { AUTOCOMPLETE_QUERY } from '../../queries/search/autocompleteQuery';
import { PLAYER_SEARCH_QUERY } from '../../queries/search/playerSearchQuery';

type Props = {
  search: boolean,
  close: () => void
}

const SearchPage = ({ search, close }: Props) => {

  // TODO => make a variable for toggling the autocomplete list in the UI.
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState<any[]>([]);
  const [showAutoCompleteSuggestions, setShowAutoCompleteSuggestions] = useState<boolean>(false);
  const [autoCompleteSuggestionIndex, setAutoCompleteSuggestionIndex] = useState<number>(0)


  const [autoComplete, { data: autoCompleteData, loading: autoCompleteLoading, error: autoCompleteError }] = useLazyQuery(AUTOCOMPLETE_QUERY, {
    onCompleted: (autoCompleteData: any) => {
      setAutoCompleteSuggestions(autoCompleteData?.autoCompletePlayer)
      
    },
    fetchPolicy: 'network-only'
  })
  const [playerSearch, { data: playerSearchData, loading: playerSearchLoading, error: playerSearchError }] = useLazyQuery(PLAYER_SEARCH_QUERY)

  // if(autoCompleteError) return <div>An Error occurred: {autoCompleteError.message}</div>
  // if(playerSearchLoading) return <Spinner animation='border' size='sm' />
  if(playerSearchError) return <div>An Error occurred: {playerSearchError.message}</div>

  // if(autoCompleteLoading) return <p>Loading ...</p>
  if(autoCompleteError) return <div>An Error occurred: {autoCompleteError.message}</div>

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearchQuery(value)

    // autoComplete({ variables: { query: searchQuery } });

    // if(value.length > 2) {
      
    //   autoComplete({ variables: { query: searchQuery } })
    // } else {
    //   setAutoCompleteSuggestions([])
    // }

  };

  useEffect(() => {
    if(searchQuery !== '') {
      setShowAutoCompleteSuggestions(true)
      autoComplete({ variables: { query: searchQuery } })
    }
  }, [searchQuery])
  
  const clearSearch = () => {
    setSearchQuery('')
    setAutoCompleteSuggestions([]);
    setAutoCompleteSuggestionIndex(-1)
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'ArrowUp') {
      setAutoCompleteSuggestionIndex(prevIndex => Math.max(0 , prevIndex - 1) )
    } else if (event.key === 'ArrowDown') {
      setAutoCompleteSuggestionIndex(prevIndex => Math.min(prevIndex + 1, autoCompleteSuggestions.length))
    } else if(event.key === 'Enter') {
      event.preventDefault();
      setSearchQuery(autoCompleteSuggestions[autoCompleteSuggestionIndex].name)
      playerSearch({ variables: { query: searchQuery, league: 'Premier League' } })
      setShowAutoCompleteSuggestions(prev => !prev)
    }
  }

  return (
    <div className={`w-100 bg-white pt-3 d-flex flex-column gap-3 position-fixed transition-component ${search ? 'active' : ''}`} style={{ marginTop: '100px', paddingBottom: '500px' }}>
      
      <div className="d-flex justify-content-between">
    
        <Form className="d-flex w-50 ms-3 position-relative" >
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

            

            {(searchQuery && showAutoCompleteSuggestions) && <ListGroup className="position-absolute bg-white w-100 list-unstyled top-100 border rounded">
              {autoCompleteSuggestions.map((suggestion: any, index: number) => (
                <ListGroup.Item key={index} active={index === autoCompleteSuggestionIndex} className='mb-2'>{suggestion.name}</ListGroup.Item>
              ))}
            </ListGroup>}
        </Form>

      <Button onClick={() => close()} className='me-3'>
        <IoMdClose />
      </Button>
      </div>

      <div className="">{playerSearchData?.playerSearch.map((player: any, index: number) => (
        <p key={index}>{player.name}</p>
      ))}</div>
    </div>
  )
}

export default SearchPage