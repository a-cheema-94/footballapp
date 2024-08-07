import { useQuery } from "@apollo/client"
import { TOP_NEWS_QUERY } from "../../../../queries/topNewsQuery"
import FootballNewsStory from "./FootballNewsStory"
import { NewsType } from "../../../../queries/types/queryTypes"

type Props = {}

const TopFootballStories = (props: Props) => {
  const { data, loading, error } = useQuery(TOP_NEWS_QUERY)

  if(loading) return <p>Loading ...</p>
  if(error) return <p>An Error occurred: {error.message}</p>

  return (
    <div className="d-flex flex-column gap-3">
      {data.topFootballStories.slice(0, 10).map((story: NewsType, index: number) => (
        <FootballNewsStory key={index} story={story}/>
      ))}
    </div>
  )
}

export default TopFootballStories