import { useQuery } from '@apollo/client'
import React from 'react'
import { AUTOCOMPLETE_QUERY } from '../queries/search/autocompleteQuery'

type Props = {}

const TestComponent = (props: Props) => {
  const { data, loading, error } = useQuery(AUTOCOMPLETE_QUERY, { variables: {
    query: 'sala'
  } })

  if(error) return <div>An Error occurred: {error.message}</div>
  if(loading) return <p>Loading ...</p>

  console.log(data.autoCompletePlayer)

  return (
    <div>TestComponent</div>
  )
}

export default TestComponent