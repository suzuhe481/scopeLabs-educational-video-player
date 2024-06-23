const editVideoUtil = (event) => {
  event.preventDefault();

  const METHOD = "PUT";

  const TITLE = event.target[0].value;
  const DESCRIPTION = event.target[1].value;
  const VIDEO_ID = event.target[2].value;

  const body = JSON.stringify({
    video_id: VIDEO_ID,
    title: TITLE,
    description: DESCRIPTION,
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
    })
    .catch((error) => {
      const errorMessage = {
        error: true,
        msg: error,
      };

      return errorMessage;
    });
};

export default editVideoUtil;
