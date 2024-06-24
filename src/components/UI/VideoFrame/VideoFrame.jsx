/* eslint-disable react/prop-types */
import { DateTime } from "luxon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import styles from "./VideoFrame.module.scss";

const VideoFrame = ({ video }) => {
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
        href={`/video/${video.id}`}
        className={`${styles["remove-link-style"]}`}
      >
        <div className={styles.thumbnail} style={thumbnailStyles}></div>
        <div className={`${styles["info-container"]}`}>
          <div className={styles.title}>{video.title}</div>
          <div className={`${styles["video-data"]}`}>
            <div className={styles.icon}>{video.user_id.substring(0, 1)}</div>
            <div className={styles.user}>{video.user_id}</div>
            <div>•</div>
            <div className={styles.date}>{video_created_date}</div>
          </div>
          <FontAwesomeIcon
            icon={faComment}
            className={`${styles["comment-icon"]}`}
          />
          <div className={`${styles["comment-data"]}`}>
            {video.num_comments}{" "}
            {video.num_comments === 1 ? "comment" : "comments"}
          </div>
        </div>
      </a>
    </div>
  );
};

export default VideoFrame;
