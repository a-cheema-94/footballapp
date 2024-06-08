import LastFixtureComponent from "./LastFixtureComponent"
import PlayerCards from "./PlayerCards/PlayerCards"
import TeamStats from "./TeamStats"

type Props = {}

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