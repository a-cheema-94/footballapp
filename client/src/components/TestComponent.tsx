import { useQuery } from '@apollo/client'
import React, { useRef, useState } from 'react'
import { AUTOCOMPLETE_QUERY } from '../queries/search/autocompleteQuery'
import useContentVisible from './reusable/useContentVisible'
import { Button } from 'react-bootstrap'

type Props = {}

// const TestComponent = (props: Props) => {
//   const { data, loading, error } = useQuery(AUTOCOMPLETE_QUERY, { variables: {
//     query: 'sala'
//   } })

//   if(error) return <div>An Error occurred: {error.message}</div>
//   if(loading) return <p>Loading ...</p>

//   console.log(data.autoCompletePlayer)

//   return (
//     <div>TestComponent</div>
//   )
// }

const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(prev => !prev)
  const handleClose = () => setIsOpen(false)

  
  const dropDownRef = useContentVisible<HTMLDivElement>(handleClose);


  return (
    <div className=''>
      <button onClick={toggle}>click me</button>
      {isOpen && (<div ref={dropDownRef} className='border border-2 border-primary'>
        <p>dropdown menu content 1</p>  
        <p>dropdown menu content 2</p>  
        <p>dropdown menu content 3</p>  
      </div>)}
    </div>
  )
}

export default TestComponent