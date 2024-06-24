import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchAllUserVideosUtil from "../../helpers/fetchAllUserVideosUtil";

import VideoFrame from "../UI/VideoFrame/VideoFrame";

import styles from "./SearchUserPage.module.scss";

const SearchUserPage = () => {
  const [videoData, setVideoData] = useState([]);

  const { id } = useParams();

  var videoCollection = (
    <div className={styles.empty}>No videos for user: {id}</div>
  );

  // videoData is set and is not empty.
  // Creates videoCollection element.
  if (videoData && videoData.length !== 0) {
    videoCollection = videoData.map((video, index) => {
      return <VideoFrame video={video} key={index} />;
    });
  }

  // Calls API to retrieve videos for specified user and stores in state.
  useEffect(() => {
    const data = fetchAllUserVideosUtil(id);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={`${styles["main-content"]}`}>
        <div className={`${styles["videos-container"]}`}>{videoCollection}</div>
      </div>
    </div>
  );
};

export default SearchUserPage;
