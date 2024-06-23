const submitCommentUtil = (event) => {
  event.preventDefault();

  const METHOD = "POST";
  const RESOURCE = "videos/comments";
  const USER_ID = import.meta.env.VITE_USER;

  const COMMENT = event.target[0].value;
  const VIDEO_ID = event.target[1].value;

  const body = JSON.stringify({
    video_id: VIDEO_ID,
    content: COMMENT,
    user_id: USER_ID,
  });

  // The "/api" url is a proxy that is set up with Vite's server proxy rules in the vite.config.js file.
  // Will use proxy URL if in dev mode.
  const BASE_URL =
    import.meta.env.VITE_DEV === "true" ? "/api" : import.meta.env.PROD_URL;
  const PARAMS = `/${RESOURCE}`;
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
      return json;
    })
    .catch((error) => {
      return error;
    });
};

export default submitCommentUtil;
