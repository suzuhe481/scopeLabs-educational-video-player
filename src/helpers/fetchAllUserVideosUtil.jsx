// Fetches data from the API.
const fetchAllUserVideosUtil = (user_id) => {
  const METHOD = "GET";
  const RESOURCE = "videos";
  const USER = user_id;

  // The "/api" url is a proxy that is set up with Vite's server proxy rules in the vite.config.js file.
  // Will use proxy URL if in dev mode.
  const BASE_URL =
    import.meta.env.VITE_DEV === "true"
      ? "/api"
      : import.meta.env.VITE_PROD_URL;
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
      const errorMessage = {
        error: true,
        msg: error,
      };

      return errorMessage;
    });
};

export default fetchAllUserVideosUtil;
