import clsx from "clsx";
import { firaSans } from "../../fonts";

export function PublicationLayout({
  header,
  picture,
  likesElement,
  commentsElement,
  categories,
  description,
}) {
  return (
    <div className="w-[353px] px-[6px] pt-[15px] py-[34px] bg-[#F7F7F7]/80 rounded-[33px]">
      <div className="mb-[37px]">{header}</div>
      {picture}
      <div className="flex gap-5 items-center mt-3">
        {likesElement}
        {commentsElement}
      </div>
      <div className="mt-[10px] mb-3 flex gap-4 flex-wrap">{categories}</div>
      <div
        className={clsx("w-[320px] text-[14px] text-wrap", firaSans.className)}
      >
        {description}
      </div>
    </div>
  );
}
