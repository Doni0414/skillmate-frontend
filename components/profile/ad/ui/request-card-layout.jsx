import clsx from "clsx";
import { firaSans } from "../../../fonts";

export function RequestCardLayout({
  userImage,
  userId,
  userFullName,
  text,
  buttons,
}) {
  return (
    <div
      className={clsx(
        "px-8 py-6 rounded-[20px] bg-[#F9F9F9] text-black/80",
        firaSans.className,
      )}
    >
      <div className="flex gap-8 items-start">
        <div className="flex gap-2.5 items-center">
          {userImage}
          <a href={`/profile/${userId}`}>
            <div className="text-[24px] w-[220px] text-ellipsis overflow-hidden whitespace-nowrap">
              {userFullName}
            </div>
          </a>
        </div>
        <div className="flex gap-6">{buttons}</div>
      </div>
      <div className="mt-2.5 text-[14px] font-semibold">{text}</div>
    </div>
  );
}
