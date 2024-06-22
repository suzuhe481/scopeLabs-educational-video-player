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
        <div className="form-title">
          <h1>Enter Video Information</h1>
        </div>

        <div className={styles["form-group-container"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="url">URL</label>
            <input type="text" name="url" />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="url">description</label>
            <textarea name="url"></textarea>
          </div>
        </div>

        <div className="form-submit">
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );

  return <div>{uploadFormContainer}</div>;
};

export default UploadVideoPage;
