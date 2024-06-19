// Fetches data from the API.
const fetchAllVideosUtil = () => {
  const METHOD = "GET";
  const RESOURCE = "videos";
  const USER = import.meta.env.VITE_USER;

  // The "/api" url is a proxy that is set up with Vite's server proxy rules in the vite.config.js file.
  const BASE_URL = "/api";
  const PARAMS = `/${RESOURCE}?user_id=${USER}`;
  const URL = `${BASE_URL}${PARAMS}`;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  return fetch(URL, {
    method: METHOD,
    headers: headers,
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      return error;
    });
};

export default fetchAllVideosUtil;
