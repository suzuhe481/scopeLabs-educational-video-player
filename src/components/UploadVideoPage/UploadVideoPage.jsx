import uploadVideoUtil from "../../helpers/uploadVideoUtil";

import styles from "./UploadVideoPage.module.scss";

const UploadVideoPage = () => {
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
