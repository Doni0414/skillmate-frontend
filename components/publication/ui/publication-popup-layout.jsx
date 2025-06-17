import clsx from "clsx";
import Image from "next/image";
import { firaSans, inter, roboto } from "../../fonts";

export function PublicationPopupLayout({
  imageSrc,
  userImageSrc,
  username,
  publicationDescription,
  comments,
  likesElement,
  commentsElement,
  addCommentContainer,
}) {
  return (
    <div className="bg-white flex">
      <div className="h-[435px] md:aspect-[1440_/_1800] sm:aspect-[1200_/_1800] bg-black flex items-center">
        <Image src={imageSrc} alt="image-src" className="w-[100%] " />
      </div>
      <div className="w-[420px] px-4">
        <div className="pt-6 mb-6 max-h-[300px] overflow-y-auto scrollbar-hide">
          <div className="flex gap-4 mb-8">
            <Image
              src={userImageSrc}
              alt="user-image"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <div
              className={clsx("max-w-[300px] tracking-wide", roboto.className)}
            >
              <span
                className={clsx(
                  "font-medium text-stone-700 mr-2 font-sans tracking-normal",
                )}
              >
                {username}
              </span>
              {publicationDescription}
            </div>
          </div>
          <div className="flex justify-center mb-4 font-medium text-stone-500">
            Comments
          </div>
          <div className="space-y-8">{comments}</div>
        </div>
        <div className="flex gap-4 mb-5">
          {likesElement}
          {commentsElement}
        </div>
        <div>{addCommentContainer}</div>
      </div>
    </div>
  );
}
