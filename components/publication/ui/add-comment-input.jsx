import { useState } from "react";
import { SuccessMessage } from "../../common/success-message";
import { SendCommentIcon } from "../../publications/icons/send-comment-icon";
import apiClient from "../../api-client";

export function AddCommentInput({ publicationId }) {
  const [commentText, setCommentText] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const MAX_COMMENT_LENGTH = 10_000;

  const isButtonActive = () => {
    return commentText.trim() !== "";
  };

  const getButtonClassName = () => {
    return isButtonActive()
      ? "text-[#3C5AA5] cursor-pointer"
      : "text-[#878D98]";
  };

  const handleSendCommentClick = () => {
    const commentLength = commentText.trim().length;
    if (commentLength === 0 || commentLength > MAX_COMMENT_LENGTH) {
      return;
    }

    apiClient
      .post(`/posts/${publicationId}/comments?text=${commentText}`)
      .then((response) => {
        setSuccessMessage("The comment was successfully created!");

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);

        setCommentText("");
      })
      .catch((error) => {
        console.log("error while creating comment", error);
      });
  };

  const getCommentLengthString = () => {
    return commentText.length + "/" + MAX_COMMENT_LENGTH;
  };

  const handleCommentTextOnChange = (e) => {
    const text = e.target.value;

    if (text.length <= MAX_COMMENT_LENGTH) {
      setCommentText(text);
    }
  };

  return (
    <div className="flex gap-6 items-start">
      <SuccessMessage
        showMessage={successMessage}
        successMessage={successMessage}
      />
      <div className="flex relative">
        <textarea
          onChange={handleCommentTextOnChange}
          placeholder="Add a comment..."
          className="w-[340px] pl-3 pr-6 py-2 bg-white text-[16px] focus:outline-none field-sizing-content resize-none border border-[#2D394C]/10"
          value={commentText}
        ></textarea>
        <div className="absolute right-3 top-0.5  text-[#878D98]">
          {getCommentLengthString()}
        </div>
      </div>
      <button onClick={handleSendCommentClick} className="mt-4">
        <SendCommentIcon className={getButtonClassName()} />
      </button>
    </div>
  );
}
