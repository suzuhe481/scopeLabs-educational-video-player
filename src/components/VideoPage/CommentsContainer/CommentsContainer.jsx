import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentMedical } from "@fortawesome/free-solid-svg-icons";

import submitCommentUtil from "../../../helpers/submitCommentUtil";
import fetchVideoCommentsUtil from "../../../helpers/fetchVideoCommentsUtil";

import styles from "./CommentsContainer.module.scss";

const CommentsContainer = () => {
  const { id } = useParams();
  const [commentData, setCommentData] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [commentFormVisited, setCommentFormVisited] = useState(false);
  const commentFormRef = useRef(null);

  var commentCollection = <div>Loading comments...</div>;

  if (commentData) {
    commentCollection = commentData.map((comment) => {
      // Converting date to user friendly string with Luxon.
      const comment_created_date = new DateTime(
        comment.created_at
      ).toLocaleString(DateTime.DATE_MED);

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

  // Runs when comment textarea has been focused.
  const handleCommentVisited = () => {
    setCommentFormVisited(true);
  };

  // Calls API to retrieve comments for video with given id.
  const refreshComments = () => {
    const data = fetchVideoCommentsUtil(id);
    data
      .then((results) => {
        setCommentData(results.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handles comment form submit.
  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitDisabled(true);
    submitCommentUtil(e);

    // Short delay after submitting comment with API call..
    // Clear comment form, re-enable submit button, refresh comments.
    setTimeout(() => {
      commentFormRef.current.value = "";
      setSubmitDisabled(false);
      setCommentFormVisited(false);
      refreshComments();
    }, 1000);
  };

  // Calls function to get video comments on page load.
  useEffect(() => {
    refreshComments();
  }, []);

  return (
    <div className={`${styles["comments-container"]}`}>
      <div className={`${styles["num-comments"]}`}>
        Comments • {commentData.length}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FontAwesomeIcon icon={faCommentMedical} className={styles.icon} />
        <textarea
          ref={commentFormRef}
          type="text"
          name="comment"
          placeholder="Add your comment..."
          required
          className={`${commentFormVisited ? styles.visited : ""}`}
          onFocus={handleCommentVisited}
        />
        <input type="hidden" name="name_default" value={id} />
        <button type="submit" disabled={submitDisabled}>
          Comment
        </button>
      </form>
      <div className={styles.commentCollection}>{commentCollection}</div>
    </div>
  );
};

export default CommentsContainer;
