import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import fetchSingleVideoUtil from "../../helpers/fetchSingleVideoUtil";
import editVideoUtil from "../../helpers/editVideoUtil";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faT } from "@fortawesome/free-solid-svg-icons";

import styles from "./EditVideoPage.module.scss";

const EditVideoPage = () => {
  const [videoData, setVideoData] = useState(false);
  const { id } = useParams();
  const formRef = useRef(null);

  // Pastes the original video data to the form.
  const pasteToForm = () => {
    const TITLE = videoData.title;
    const DESCRIPTION = videoData.description;

    formRef.current["title"].value = TITLE;
    formRef.current["description"].value = DESCRIPTION;
  };

  if (videoData) {
    pasteToForm();
  }

  // Styles for title icon.
  const TitleIconStyles = {
    position: "absolute",
    bottom: "10px",
    left: "12px",

    color: "#5f6368",

    fontSize: "1rem",
  };

  // Container containing original video upload information.
  const originalVideoContainer = (
    <div className={`${styles["original-info-container"]}`}>
      <div className={styles.info}>
        <div className={`${styles["info-group"]}`}>
          <span className={`${styles["info-title"]}`}>Title:</span>
          {videoData.title}
        </div>
        <div className={`${styles["info-group"]}`}>
          <span className={`${styles["info-title"]}`}>URL:</span>
          {videoData.video_url}
        </div>
        <div className={`${styles["info-group"]}`}>
          <span className={`${styles["info-title"]}`}>Description: </span>
          {videoData.description}
        </div>
        <div className={`${styles["paste-button"]}`}>
          <button onClick={pasteToForm}>Paste to Form</button>
        </div>
      </div>
    </div>
  );

  // Form to edit video information.
  const editFormContainer = (
    <div className={styles["form-container"]}>
      <form className={styles.form} ref={formRef} onSubmit={editVideoUtil}>
        <div className={`${styles["form-title"]}`}>
          <h1>Edit video</h1>
        </div>

        <div className={styles["form-group-container"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="title">Title</label>
            <FontAwesomeIcon icon={faT} style={TitleIconStyles} />
            <input
              type="text"
              name="title"
              placeholder="Title your Video"
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="description">Description</label>
            <textarea name="description" required />
          </div>
        </div>

        <input type="hidden" name="name_default" value={id} />

        <div className={`${styles["form-submit"]}`}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );

  // Retrieves video data from API.
  useEffect(() => {
    const data = fetchSingleVideoUtil(id);
    data
      .then((results) => {
        if (results.error) {
          throw new Error("Error: Video not found");
        }
        return results.video;
      })
      .then((video) => {
        setVideoData(video);
        return video;
      })
      .catch((error) => {
        console.log(error);
        setVideoData(false);
      });
  }, []);

  return (
    <div className={styles.main}>
      {originalVideoContainer}
      {editFormContainer}
    </div>
  );
};

export default EditVideoPage;
