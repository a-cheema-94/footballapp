export const newsTypeDefs = `
  #football news types

  type newsStory {
    source: newsSourceInfo,
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: String,
    content: String
  }

  type newsSourceInfo {
    id: String,
    name: String
  }
`