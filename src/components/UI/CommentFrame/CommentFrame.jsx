/* eslint-disable react/prop-types */
import { DateTime } from "luxon";

import styles from "./CommentFrame.module.scss";

const CommentFrame = ({ comment }) => {
  // Converting date to user friendly string with Luxon.
  const comment_created_date = new DateTime(comment.created_at).toLocaleString(
    DateTime.DATE_MED
  );

  // Converting time to user friendly string with Luxon.
  const comment_created_time = DateTime.fromISO(
    comment.created_at
  ).toLocaleString(DateTime.TIME_SIMPLE);

  return (
    <div className={`${styles["comment-container"]}`} key={comment.id}>
      <div className={`${styles["comment-data"]}`}>
        <div className={styles.icon}>{comment.user_id.substring(0, 1)}</div>
        <div className={styles.user}>{comment.user_id}</div>
        <div>•</div>
        <div className={styles.date}>
          {comment_created_date} {comment_created_time}
        </div>
      </div>
      <div className={`${styles["comment-content"]}`}>{comment.content}</div>
    </div>
  );
};

export default CommentFrame;
