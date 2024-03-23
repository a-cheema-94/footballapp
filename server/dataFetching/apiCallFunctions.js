import axios from "axios";

const footballApiKey = process.env.FOOTBALL_API_KEY;

export async function makeApiCall(endpoint, params) {
  const footballApiClient = axios.create(); // create axios instance
  footballApiClient.interceptors.request.use(options => {
    const headers = options.headers;
    const neededHeaders = ["x-apisports-key"];
    
    // remove unnecessary headers
    for(let header in headers) {
      if(!neededHeaders.includes(header)) {
        delete headers[header]
      }
    }

    return options;
  })
  // make api call with right params and api key
  const apiRes = await footballApiClient.get(`https://v3.football.api-sports.io/${endpoint}`, {
    params,
    headers: {
      "x-apisports-key": footballApiKey
    }
  });
  return apiRes;
}

// url = "https://v3.football.api-sports.io/"