import React from 'react'
import { FixtureType } from '../../../../queries/types/queryTypes'
import LiveFixture from './LiveFixture'
import Slider from './Slider'

type Props = {
  liveFixtures: FixtureType[]
}

// TODO: Slider implementation and dropdown

const LiveMatchesByLeague = ({ liveFixtures }: Props) => {
  return (
    <div className="d-flex gap-2">
      {/* slider here */}
      <Slider liveFixtures={liveFixtures}/>
      
    </div>
  )
}

export default LiveMatchesByLeague