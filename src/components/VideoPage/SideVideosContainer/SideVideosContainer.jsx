import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import fetchAllVideosUtil from "../../../helpers/fetchAllVideosUtil";

import styles from "./SideVideosContainer.module.scss";

const SideVideosContainer = () => {
  const [videoData, setVideoData] = useState([]);
  const { id } = useParams();

  var videoCollection = <div>No videos</div>;

  // videoData is set and is not empty.
  if (videoData) {
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
          <a href={`${video.id}`} className={`${styles["remove-link-style"]}`}>
            <div className={styles.thumbnail} style={thumbnailStyles}></div>
            <div className={`${styles["info-container"]}`}>
              <div className={styles.title}>{video.title}</div>
              <div className={`${styles["video-data"]}`}>
                <div className={styles.icon}>
                  {video.user_id.substring(0, 1)}
                </div>
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
    });
  }

  // Calls API to retrieve videos for home page.
  // Excludes the video currently being watched.
  useEffect(() => {
    const data = fetchAllVideosUtil();
    data
      .then((results) => {
        return results.videos;
      })
      .then((videos) => {
        const filteredVideos = videos.filter((video) => video.id !== id);

        return filteredVideos;
      })
      .then((filteredVideos) => {
        setVideoData(filteredVideos);
      })
      .catch((error) => {
        console.log(error);
        setVideoData(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles["side-videos-container"]}`}>
      <div className={`${styles["container-title"]}`}>MORE VIDEOS</div>
      {videoCollection}
    </div>
  );
};

export default SideVideosContainer;
