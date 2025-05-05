import LastFixtureComponent from "./LastFixtureComponent"
import PlayerCards from "./PlayerCards/PlayerCards"
import TeamStats from "./TeamStats"

type Props = {}

// use below for player cards
// display grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(300px, 2fr))

const Club = (props: Props) => {
  return (
    <div>
      <LastFixtureComponent />
      <TeamStats />
      <PlayerCards />
    </div>
  )
}

export default Club