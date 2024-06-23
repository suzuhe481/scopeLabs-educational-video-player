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
  } else {
    videoContainer = (
      <div className={`${styles["video-not-exist"]}`}>Video does not exist</div>
    );
  }

  // Calls API to get video information.
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
