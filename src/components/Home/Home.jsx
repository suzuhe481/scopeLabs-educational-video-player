import { useState, useEffect } from "react";
import fetchAllVideosUtil from "../../helpers/fetchAllVideosUtil";
import { DateTime } from "luxon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.scss";

const Home = () => {
  const [videoData, setVideoData] = useState({});

  var videoCollection = <div>No videos</div>;

  if (JSON.stringify(videoData) !== "{}") {
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
            <div className={styles.thumbnail}></div>
            <div className={styles.title}>{video.title}</div>
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
        setVideoData(results.videos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="loading-container"></div>
      <div className={`${styles["videos-container"]}`}>{videoCollection}</div>
    </div>
  );
};

export default Home;
