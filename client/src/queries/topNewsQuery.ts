import { gql } from "@apollo/client";

export const TOP_NEWS_QUERY = gql`
  query TopNews {
  topFootballStories {
    description
    author
    title
    publishedAt
    url
    urlToImage
  }
}
`