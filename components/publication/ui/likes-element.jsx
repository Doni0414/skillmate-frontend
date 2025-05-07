import { LikeIcon } from "../../publications/icons/like-icon";

export function LikesElement({ likes, handleClick, isLiked }) {
  return (
    <button
      onClick={handleClick}
      className="px-2 py-1 rounded-[14px] bg-[#EAEEF1] flex gap-2 items-center font-semibold text-[14px] cursor-pointer"
    >
      <LikeIcon isLiked={isLiked} />
      {likes}
    </button>
  );
}
