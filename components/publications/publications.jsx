import { useEffect, useRef, useState } from "react";
import {
  getCommentsByPostId,
  getCommentsByPublicationId,
  getCommentsCountByPostId,
  getLikesCountByPostId,
  getResourceURLById,
  getUserById,
} from "../api";
import Image from "next/image";
import clsx from "clsx";
import { firaSans, inter, mulish, roboto } from "../fonts";
import { LikeIcon } from "./icons/like-icon";
import { CommentIcon } from "./icons/comment-icon";
import apiClient from "../api-client";
import { SendCommentIcon } from "./icons/send-comment-icon";
import { SuccessMessage } from "../common/success-message";
import { Comments } from "./comments";
import { PagedElement } from "../common/paged-element";
import { PlusIcon } from "../common/icons/plus-icon";

export function Publications({ publications, user }) {
  return (
    <div className="space-y-[116px]">
      {publications.map((publication, key) => (
        <Publication publication={publication} key={key} user={user} />
      ))}
    </div>
  );
}

function Publication({ publication, user }) {
  const COMMENTS_PER_PAGE = 3;
  const [author, setAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsPage, setCommentsPage] = useState(1);
  const publicationRef = useRef(null);

  console.log("current page: " + commentsPage);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      getCommentsByPublicationId(
        publication.id,
        commentsPage,
        COMMENTS_PER_PAGE,
      ).then((response) => {
        if (response.data.content.length > 0) {
          setComments(response.data.content);
        }
      });
    }, 3_000);
    return () => {
      clearInterval(interval);
    };
  }, [commentsPage]);

  const fetchData = async () => {
    const fetchedAuthor = await getUserById(publication.creatorId);
    setAuthor(fetchedAuthor.data);
  };

  return (
    <div
      ref={publicationRef}
      className="px-5 py-5 rounded-[33px] bg-[#F7F7F7] shadow-2xl"
    >
      <PublicationAuthorContainer author={author} />
      <Image
        width={483}
        height={295}
        src={getResourceURLById(publication.resourceId)}
        alt="publication-image"
        className="mb-[14px]"
      />
      <LikesCommentsCountContainer
        className="mb-4"
        publication={publication}
        user={user}
      />
      <Categories className="mb-3" categories={publication.categories} />
      <PublicationDescription
        className="mb-7"
        author={author}
        description={publication.text}
      />
      <AddCommentContainer user={user} publication={publication} />
      <Comments
        className="mt-7 mb-7"
        comments={comments}
        publication={publication}
        user={user}
      />
      <CommentsMoreButton page={commentsPage} setPage={setCommentsPage} />
    </div>
  );
}

function CommentsMoreButton({ className, setPage }) {
  const onClick = () => {
    setPage((lastPage) => {
      return lastPage + 1;
    });
  };

  return (
    <div className="flex justify-center">
      <button
        title="More comments"
        className="cursor-pointer"
        onClick={onClick}
      >
        <PlusIcon />
      </button>
    </div>
  );
}

function PublicationAuthorContainer({ author }) {
  return (
    <div className="flex items-center gap-6 mb-[30px]">
      <Image
        className="rounded-full w-10 h-10 object-cover"
        width={40}
        height={40}
        src={getResourceURLById(author.imageResourceId)}
        alt="avatar"
      />
      <div className={clsx(mulish.className, "font-bold")}>
        <div className="text-[17px]">{author.fullName}</div>
        <div className="text-[#878D98] text-[14px]">
          {author.country}, {author.city}
        </div>
      </div>
    </div>
  );
}

function Categories({ categories, className }) {
  return (
    <div
      className={clsx(className, roboto.className, "flex flex-wrap gap-[25px]")}
    >
      {categories.map((category, key) => (
        <Category category={category} key={key} />
      ))}
    </div>
  );
}

function Category({ category }) {
  return (
    <div className="px-4 py-2 rounded-[8px] font-semibold text-[13px] bg-[#EFEFEF]">
      {category}
    </div>
  );
}

function PublicationDescription({ className, author, description }) {
  return (
    <div className="flex gap-1">
      <div
        className={clsx(
          "w-[483px] text-[15px] text-wrap",
          firaSans.className,
          className,
        )}
      >
        {description}
      </div>
    </div>
  );
}

function LikesCommentsCountContainer({ className, publication, user }) {
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 60_00);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchData = async () => {
    const fetchedLikesCount = await getLikesCountByPostId(publication.id);
    setLikesCount(fetchedLikesCount.data);

    const fetchedCommentsCount = await getCommentsCountByPostId(publication.id);
    console.log(fetchedCommentsCount);
    setCommentsCount(fetchedCommentsCount);
  };

  const getCountString = (count) => {
    if (count < 1000) {
      return count + "";
    } else if (count < 1_000_000) {
      const computedCount = (count / 1000).toFixed(1);
      return (computedCount + "k").replace(".", ",");
    } else {
      const computedCount = (count / 1_000_000).toFixed(1);
      return (computedCount + "M").replace(".", ",");
    }
  };

  const handleClickOnLikeButton = () => {
    if (isLiked) {
      apiClient
        .delete(`/posts/${publication.id}/remove-like`)
        .then((response) => {
          setIsLiked(false);
          setLikesCount((lastLikesCount) => lastLikesCount - 1);
        })
        .catch((error) => {
          console.log("error while removing like");
        });
    } else {
      apiClient
        .post(`/posts/${publication.id}/likes`)
        .then((response) => {
          setIsLiked(true);
          setLikesCount((lastLikesCount) => lastLikesCount + 1);
        })
        .catch((error) => {
          console.log("error while liking");
        });
    }
  };
  return (
    <div
      className={clsx(
        className,
        "flex font-semibold text-[14px] gap-4",
        mulish.className,
      )}
    >
      <button
        onClick={handleClickOnLikeButton}
        className="flex gap-2 items-center px-3 py-2 bg-[#EAEEF1] rounded-[14px] cursor-pointer"
      >
        <LikeIcon isLiked={isLiked} />
        <div>{getCountString(likesCount)}</div>
      </button>
      <div className="flex gap-2 items-center px-3 py-2">
        <CommentIcon />
        <div>{getCountString(commentsCount)}</div>
      </div>
    </div>
  );
}

function AddCommentContainer({ user, publication }) {
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
    if (commentLength === 0 || commentText > MAX_COMMENT_LENGTH) {
      return;
    }

    apiClient
      .post(`/posts/${publication.id}/comments?text=${commentText}`)
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
          className="w-[414px] pl-3 pr-6 py-4 bg-white text-[16px] focus:outline-none field-sizing-content resize-none border border-[#2D394C]/10"
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
