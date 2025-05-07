import clsx from "clsx";
import { inter } from "../../../fonts";

export function AdCardLayout({
  adImage,
  skillName,
  adDescription,
  isOwn,
  editButton,
  deleteButton,
  seeRequestsButton,
}) {
  return (
    <div
      className={clsx(
        "w-[413px] px-4 py-2 rounded-[14px] bg-[#F6F4F4]",
        inter.className,
      )}
    >
      {isOwn && (
        <div className="flex gap-6 items-center mb-4">
          {editButton}
          {deleteButton}
          {seeRequestsButton}
        </div>
      )}
      <div className="relative">
        {adImage}
        <div className="absolute bottom-2 left-2 font-bold text-[29px] text-white">
          {skillName}
        </div>
      </div>
      <div className="mt-4 text-[14px] font-semibold">{adDescription}</div>
    </div>
  );
}
