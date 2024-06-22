import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";

import Navbar from "../Navbar/Navbar";
import fetchSingleVideoUtil from "../../helpers/fetchSingleVideoUtil";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import styles from "./VideoPage.module.scss";

const VideoPage = () => {
  const [videoData, setVideoData] = useState({});
  const { id } = useParams();

  var videoContainer = <div>Video Loading</div>;

  if (JSON.stringify(videoData) !== "{}") {
    // Gets the id of the video required for the src attribute of the iframe.
    // video_url - https://www.youtube.com/watch?v=VIDEO_ID
    const id = videoData.video_url.split("?v=");
    const video_ID = id[1];
    console.log(videoData);

    videoContainer = (
      <div className={`${styles["video-container"]}`}>
        <iframe
          className={styles.video}
          src={`https://www.youtube.com/embed/${video_ID}`}
          allow="fullscreen"
        />

        <div className={styles.title}>{videoData.title}</div>
        <div className={styles.description}>{videoData.description}</div>
      </div>
    );
  }

  useEffect(() => {
    const data = fetchSingleVideoUtil(id);
    data
      .then((results) => {
        setVideoData(results.video);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      {videoContainer}
    </div>
  );
};

export default VideoPage;
