const uploadVideoUtil = (event) => {
  event.preventDefault();

  const METHOD = "POST";
  const USER_ID = import.meta.env.VITE_USER;

  const TITLE = event.target[0].value;
  const VIDEO_URL = event.target[1].value;
  const DESCRIPTION = event.target[2].value;

  const body = JSON.stringify({
    user_id: USER_ID,
    description: DESCRIPTION,
    video_url: VIDEO_URL,
    title: TITLE,
  });

  // The "/api" url is a proxy that is set up with Vite's server proxy rules in the vite.config.js file.
  // Will use proxy URL if in dev mode.
  const BASE_URL =
    import.meta.env.VITE_DEV === "true"
      ? "/api"
      : import.meta.env.VITE_PROD_URL;
  const PARAMS = `/videos`;
  const URL = `${BASE_URL}${PARAMS}`;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  fetch(URL, {
    method: METHOD,
    headers: headers,
    body: body,
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      window.location.href = "/";
      // return json;
    })
    .catch((error) => {
      const errorMessage = {
        error: true,
        msg: error,
      };

      return errorMessage;
    });
};

export default uploadVideoUtil;
