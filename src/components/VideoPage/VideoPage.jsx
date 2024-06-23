import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";

import CommentsContainer from "./CommentsContainer/CommentsContainer";
import SideVideosContainer from "./SideVideosContainer/SideVideosContainer";
import fetchSingleVideoUtil from "../../helpers/fetchSingleVideoUtil";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import {
  waveform,
  trefoil,
  helix,
  quantum,
  infinity,
  grid,
  lineSpinner,
} from "ldrs";

import styles from "./VideoPage.module.scss";

const VideoPage = () => {
  const [videoData, setVideoData] = useState(false);
  const { id } = useParams();

  // Registering/defining animations.
  waveform.register();
  trefoil.register();
  helix.register();
  quantum.register();
  infinity.register();
  grid.register();
  lineSpinner.register();

  // Returns a random HEX color code.
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Random color for loading animation.
  const COLOR = getRandomColor();

  // Loading animation elements.
  const waveformAnimation = (
    <l-waveform size={100} stroke={10} color={COLOR}></l-waveform>
  );
  const trefoiAnimation = (
    <l-trefoil size={100} stroke={10} color={COLOR}></l-trefoil>
  );
  const helixAnimation = (
    <l-helix size={100} stroke={10} color={COLOR}></l-helix>
  );
  const quantumAnimation = (
    <l-quantum size={100} stroke={10} color={COLOR}></l-quantum>
  );
  const infinityAnimation = (
    <l-infinity size={100} stroke={10} color={COLOR}></l-infinity>
  );
  const gridAnimation = <l-grid size={100} stroke={10} color={COLOR}></l-grid>;
  const lineSpinnerAnimation = (
    <l-line-spinner size={100} stroke={10} color={COLOR}></l-line-spinner>
  );

  // Array containing all loading animations.
  const animationsArray = [
    waveformAnimation,
    trefoiAnimation,
    helixAnimation,
    quantumAnimation,
    infinityAnimation,
    gridAnimation,
    lineSpinnerAnimation,
  ];

  // Declaring video container
  var videoContainer;

  if (videoData) {
    // Gets the id of the video required for the src attribute of the iframe.
    // video_url - https://www.youtube.com/watch?v=VIDEO_ID
    const youtubeID = videoData.video_url.split("?v=");
    const video_ID = youtubeID[1];

    // Converting date to user friendly string with Luxon.
    const video_created_date = new DateTime(
      videoData.created_at
    ).toLocaleString(DateTime.DATE_MED);

    videoContainer = (
      <div className={`${styles["video-container"]}`}>
        <iframe
          className={styles.video}
          src={`https://www.youtube.com/embed/${video_ID}`}
          allow="fullscreen"
        />

        <div className={`${styles["info-container"]}`}>
          <div className={styles.title}>{videoData.title}</div>
          <div className={`${styles["user-date-edit"]}`}>
            {videoData.user_id} • {video_created_date}{" "}
            <a href={`/edit/video/${id}`}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className={`${styles["edit-icon"]}`}
              />
            </a>
          </div>
          <div className={styles.description}>{videoData.description}</div>
          <div className={`${styles["comment-text"]}`}>
            <FontAwesomeIcon
              icon={faComment}
              className={`${styles["comment-icon"]}`}
            />
            {videoData.num_comments}{" "}
            {videoData.num_comments === 1 ? "comment" : "comments"}
          </div>
        </div>
      </div>
    );
  } else if (typeof videoData === "undefined") {
    videoContainer = (
      <div className={`${styles["video-not-exist"]}`}>Video does not exist</div>
    );
  } else {
    // Displays a random loading animation.
    const loadingAnimationNum = Math.floor(
      Math.random() * animationsArray.length
    );
    const chosenAnimation = animationsArray[loadingAnimationNum];

    videoContainer = (
      <div className={`${styles["video-loading"]}`}>{chosenAnimation}</div>
    );
  }

  // Calls API to get video information.
  // Mimics a 1.5 second load time.
  useEffect(() => {
    const DELAY_SECONDS = 1.5; // Can change
    const DELAY = DELAY_SECONDS * 1000; // Don't change

    setTimeout(() => {
      const data = fetchSingleVideoUtil(id);
      data
        .then((results) => {
          return results.video;
        })
        .then((video) => {
          setVideoData(video);
        })
        .catch((error) => {
          console.log(error);
        });
    }, DELAY);
  }, []);

  return (
    <div>
      <div className={`${styles["page-container"]}`}>
        <div className={`${styles["main-content"]}`}>
          {videoContainer}
          <CommentsContainer />
        </div>
        <div className={`${styles["more-videos-container"]}`}>
          <SideVideosContainer />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
