import { useState, useEffect } from "react";
import fetchAllVideosUtil from "../../helpers/fetchAllVideosUtil";

import useLocalStorage from "../../hooks/useLocalStorage";

import VideoFrame from "../UI/VideoFrame/VideoFrame";

import styles from "./Home.module.scss";

const Home = () => {
  const [videoData, setVideoData] = useState([]);
  const [pageVisited, setPageVisited] = useLocalStorage("pageVisited", false);

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

  // Changes pageVisited value in localStorage to true after a delay to remove splash screen.
  useEffect(() => {
    const DELAY_SECONDS = 2; // Can change
    const DELAY = DELAY_SECONDS * 1000; // Don't change

    setTimeout(() => {
      setPageVisited(true);
    }, DELAY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
