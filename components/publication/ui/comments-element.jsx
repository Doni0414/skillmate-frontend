import { CommentIcon } from "../../publications/icons/comment-icon";

export function CommentsElement({ comments, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 rounded-[14px] bg-[#EAEEF1] flex gap-2 items-center font-semibold text-[14px] cursor-pointer"
    >
      <CommentIcon />
      {comments}
    </button>
  );
}
