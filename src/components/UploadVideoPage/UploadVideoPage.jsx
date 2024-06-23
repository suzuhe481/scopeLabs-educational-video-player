import uploadVideoUtil from "../../helpers/uploadVideoUtil";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faT } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import styles from "./UploadVideoPage.module.scss";

const UploadVideoPage = () => {
  // Styles for title icon
  const TitleIconStyles = {
    position: "absolute",
    bottom: "10px",
    left: "12px",

    color: "#5f6368",

    fontSize: "1rem",
  };

  // Styles for link icon
  const LinkIconStyles = {
    position: "absolute",
    bottom: "10px",
    left: "8px",

    color: "#5f6368",

    fontSize: "0.8rem",
  };

  const uploadFormContainer = (
    <div className={styles["form-container"]}>
      <form className={styles.form} onSubmit={uploadVideoUtil}>
        <div className={`${styles["form-title"]}`}>
          <h1>Upload a video</h1>
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
            <label htmlFor="url">Only YouTube Links</label>
            <FontAwesomeIcon icon={faLink} style={LinkIconStyles} />
            <input
              type="text"
              name="url"
              placeholder="https://www.youtube.com/watch?v="
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="description">Description</label>
            <textarea name="description" required />
          </div>
        </div>

        <div className={`${styles["form-submit"]}`}>
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );

  return <div>{uploadFormContainer}</div>;
};

export default UploadVideoPage;
