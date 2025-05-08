import { useEffect, useState } from "react";
import { getResourceURLById, getUserById } from "../api";
import Image from "next/image";
import clsx from "clsx";
import { mulish } from "../fonts";
import defaultAvaSrc from "../header/images/ava.png";

export function Comments({ className, comments, publication, user }) {
  return (
    <div className={clsx("space-y-4", className)}>
      <div className="font-semibold text-[20px]">Comments</div>
      {comments.map((comment, idx) => (
        <Comment comment={comment} publication={publication} user={user} />
      ))}
    </div>
  );
}

function Comment({ comment, publication, user }) {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const authorResponse = await getUserById(comment.userId);
    setAuthor(authorResponse.data);
  };

  return (
    <div className="flex items-start gap-6">
      <Image
        width={40}
        height={40}
        src={
          author.imageResourceId
            ? getResourceURLById(author.imageResourceId)
            : defaultAvaSrc
        }
        alt="user ava"
        className="w-10 h-10 rounded-full"
      />
      <div className={clsx(mulish.className)}>
        <div className="font-semibold text-[17px]">{author.fullName}</div>
        <div className="w-[400px] text-[15px]">{comment.text}</div>
      </div>
    </div>
  );
}
