import clsx from "clsx";
import { roboto } from "../../fonts";
import Image from "next/image";

export function CommentInPopup({ authorImageSrc, username, text }) {
  return (
    <div className="flex gap-4">
      <Image
        src={authorImageSrc}
        alt="author-image"
        width={32}
        height={32}
        className="w-8 h-8 rounded-full"
      />
      <div className={clsx("max-w-[300px] tracking-wide", roboto.className)}>
        <span
          className={clsx(
            "font-medium text-stone-700 mr-2 font-sans tracking-normal",
          )}
        >
          {username}
        </span>
        {text}
      </div>
    </div>
  );
}
