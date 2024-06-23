import { useState, useEffect } from "react";
import fetchAllVideosUtil from "../../helpers/fetchAllVideosUtil";
import { DateTime } from "luxon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import styles from "./Home.module.scss";

const Home = () => {
  const [videoData, setVideoData] = useState([]);

  var videoCollection = <div>No videos</div>;

  // videoData is set and is not empty.
  // Creates videoCollection element.
  if (JSON.stringify(videoData) !== "{}" && videoData.length !== 0) {
    videoCollection = videoData.map((video) => {
      const id = video.video_url.split("?v=");
      const video_ID = id[1];
      const video_thumbnail =
        video_ID === undefined
          ? false
          : `http://img.youtube.com/vi/${video_ID}/0.jpg`;

      // Sets a thumbnail for the video if it has one.
      const thumbnailStyles = !video_thumbnail
        ? {}
        : {
            backgroundImage: `url(${video_thumbnail})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          };

      // Converting date to user friendly string with Luxon.
      const video_created_date = new DateTime(video.created_at).toLocaleString(
        DateTime.DATE_MED
      );

      return (
        <div className={`${styles["video-container"]}`} key={video.id}>
          <a
            href={`video/${video.id}`}
            className={`${styles["remove-link-style"]}`}
          >
            <div className={styles.thumbnail} style={thumbnailStyles}></div>
            <div className={`${styles["info-container"]}`}>
              <div className={styles.title}>{video.title}</div>
              <div>
                {video.user_id} • {video_created_date}
              </div>
              <FontAwesomeIcon
                icon={faComment}
                className={`${styles["comment-icon"]}`}
              />
              <div className={`${styles["comment-text"]}`}>
                {video.num_comments}{" "}
                {video.num_comments === 1 ? "comment" : "comments"}
              </div>
            </div>
          </a>
        </div>
      );
    });
  }

  // Calls API to retrieve videos for home page and stores in state.
  useEffect(() => {
    const data = fetchAllVideosUtil();
    data
      .then((results) => {
        return results.videos;
      })
      .then((videos) => {
        setVideoData(videos);
      })
      .catch((error) => {
        console.log(error);
        setVideoData(false);
      });
  }, []);

  return (
    <div>
      <div className="loading-container"></div>
      <div className={`${styles["main-content"]}`}>
        <div className={`${styles["videos-container"]}`}>{videoCollection}</div>
      </div>
    </div>
  );
};

export default Home;
