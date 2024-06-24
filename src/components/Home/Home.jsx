import { useState, useEffect } from "react";
import fetchAllVideosUtil from "../../helpers/fetchAllVideosUtil";

import VideoFrame from "../UI/VideoFrame/VideoFrame";

import styles from "./Home.module.scss";

const Home = () => {
  const [videoData, setVideoData] = useState([]);

  var videoCollection = <div>No videos</div>;

  // videoData is set and is not empty.
  // Creates videoCollection element.
  if (videoData) {
    videoCollection = videoData.map((video, index) => {
      return <VideoFrame video={video} key={index} />;
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
