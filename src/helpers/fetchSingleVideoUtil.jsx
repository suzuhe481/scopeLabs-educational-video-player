// Fetches data from the API.
const fetchSingleVideoUtil = (video_id) => {
  const RESOURCE = "videos";

  // The "/api" url is a proxy that is set up with Vite's server proxy rules in the vite.config.js file.
  const BASE_URL = "/api";
  const PARAMS = `/${RESOURCE}/single?video_id=${video_id}`;
  const URL = `${BASE_URL}${PARAMS}`;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  return fetch(URL, {
    method: "GET",
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

export default fetchSingleVideoUtil;
