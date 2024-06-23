import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentMedical } from "@fortawesome/free-solid-svg-icons";

import submitCommentUtil from "../../../helpers/submitCommentUtil";
import fetchVideoCommentsUtil from "../../../helpers/fetchVideoCommentsUtil";

import styles from "./CommentsContainer.module.scss";

const CommentsContainer = () => {
  const { id } = useParams();
  const [commentData, setCommentData] = useState({});

  var commentCollection = <div>Loading comments...</div>;

  if (JSON.stringify(commentData) !== "{}") {
    commentCollection = commentData.map((comment) => {
      // Converting date to user friendly string with Luxon.
      const comment_created_date = new DateTime(
        comment.created_at
      ).toLocaleString(DateTime.DATE_MED);

      return (
        <div className={`${styles["comment-container"]}`} key={comment.id}>
          <div className={`${styles["comment-data"]}`}>
            <div className={styles.icon}>{comment.user_id.substring(0, 1)}</div>
            <div className={styles.user}>{comment.user_id}</div>
            <div>•</div>
            <div className={styles.date}>{comment_created_date}</div>
          </div>
          <div className={`${styles["comment-content"]}`}>
            {comment.content}
          </div>
        </div>
      );
    });
  }

  if (commentData.length === 0) {
    commentCollection = <div>No comments</div>;
  }

  // Calls API to retrieve comments for this video.
  useEffect(() => {
    const data = fetchVideoCommentsUtil(id);
    data
      .then((results) => {
        setCommentData(results.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={`${styles["comments-container"]}`}>
      <div className={`${styles["num-comments"]}`}>
        Comments • {commentData.length}
      </div>
      <form onSubmit={submitCommentUtil} className={styles.form}>
        <FontAwesomeIcon icon={faCommentMedical} className={styles.icon} />
        <textarea
          type="text"
          name="comment"
          placeholder="Add your comment..."
        />
        <input type="hidden" name="name_default" value={id} />
        <button type="submit">Comment</button>
      </form>
      <div className={styles.commentCollection}>{commentCollection}</div>
    </div>
  );
};

export default CommentsContainer;