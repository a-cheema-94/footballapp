import LiveScores from "./LiveScores"
import TopFootballStories from "./NewsStories/TopFootballStories"
import TopPlayerData from "./TopPlayerData/TopPlayerData"

type Props = {}

const Homepage = (props: Props) => {
  return (
    <div className="d-flex flex-column gap-2 " style={{ paddingTop: '120px' }}>
      <LiveScores />
      <hr />
      <TopPlayerData />
      <hr />
      <TopFootballStories />
    </div>
  )
}

export default Homepage