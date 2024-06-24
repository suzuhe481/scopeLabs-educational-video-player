import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  return (
    <div className={`${styles["error-container"]}`}>
      <div className={styles.error}>
        <p>Sorry!</p>
        <p>This page does not exist.</p>
        <a href="/" className={styles.link}>
          Return home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
