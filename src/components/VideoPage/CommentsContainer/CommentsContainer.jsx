import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CommentFrame from "../../UI/CommentFrame/CommentFrame";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentMedical } from "@fortawesome/free-solid-svg-icons";

import submitCommentUtil from "../../../helpers/submitCommentUtil";
import fetchVideoCommentsUtil from "../../../helpers/fetchVideoCommentsUtil";

import { tailspin } from "ldrs";

import styles from "./CommentsContainer.module.scss";

const CommentsContainer = () => {
  const { id } = useParams();
  const [commentData, setCommentData] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [commentFormVisited, setCommentFormVisited] = useState(false);
  const [commentLimit, setCommentLimit] = useState(10);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const commentFormRef = useRef(null);

  tailspin.register();

  var commentCollection = <div>Loading comments...</div>;

  if (commentData) {
    commentCollection = commentData
      .slice(0, commentLimit)
      .map((comment, index) => {
        return <CommentFrame comment={comment} key={index} />;
      });
  }

  if (commentData.length === 0) {
    commentCollection = <div>No comments</div>;
  }

  // Increases comments to be displayed by 10.
  // Includes artificial load time.
  const increaseCommentLimit = () => {
    setCommentsLoading(true);

    const DELAY_SECONDS = 1.5; // Can change
    const DELAY = DELAY_SECONDS * 1000; // Don't change

    setTimeout(() => {
      const newCommentLimit = commentLimit + 10;
      setCommentLimit(newCommentLimit);
      setCommentsLoading(false);
    }, DELAY);
  };

  // Loading animation element.
  const commentLoadingAnimation = (
    <l-tailspin size="40" stroke="5" speed="0.9" color="black"></l-tailspin>
  );

  // If...
  // Comments are loading - Displays loading animation.
  // Not all comments are displayed - Displays "Load More Comments" button.
  // Else (All comments displayed) - Displays nothing.
  const loadMoreCommentsContainer = commentsLoading ? (
    <div className={`${styles["button-container"]}`}>
      {commentLoadingAnimation}
    </div>
  ) : commentData.length > commentLimit ? (
    <div className={`${styles["button-container"]}`}>
      <button className={styles.button} onClick={increaseCommentLimit}>
        Load More Comments
      </button>
    </div>
  ) : (
    <></>
  );

  // Runs when comment textarea has been focused.
  const handleCommentVisited = () => {
    setCommentFormVisited(true);
  };

  // Calls API to retrieve comments for video with given id.
  const refreshComments = () => {
    const data = fetchVideoCommentsUtil(id);
    data
      .then((results) => {
        return results.comments;
      })
      .then((comments) => {
        setCommentData(comments);
      })
      .catch((error) => {
        console.log(error);
        setCommentData(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className={styles.commentCollection}>
        {commentCollection}
        {loadMoreCommentsContainer}
      </div>
    </div>
  );
};

export default CommentsContainer;
