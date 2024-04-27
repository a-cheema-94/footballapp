import { makeNewsApiCall } from "../dataFetching/apiCallFunctions.js";

let newsRes;
// makeNewsApiCall()
//   .then(res => {
//     newsRes = res.data.sources.filter(source => {
//       const { category, language } = source;
//       if(category === 'sports' && language === 'en') {
//         return source
//       }
//     })
//     console.log(newsRes)
//   })
//   .catch(err => console.error(err))

makeNewsApiCall()
  .then(res => {
    console.log(res.data.articles)
    console.log(res.data.totalResults)
  })
  .catch(err => console.error(err))