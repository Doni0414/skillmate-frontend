import clsx from "clsx";
import { roboto } from "../fonts";

export function UserCard({
  ProfileImage,
  fullName,
  skills,
  viewProfileButton,
}) {
  return (
    <div
      className={clsx(
        "space-y-[38px] bg-[#F0F0F0] rounded-[13px] shadow-md px-5 pt-[30px] pb-[42px]",
        roboto.className,
      )}
    >
      <div className="flex items-center">
        {ProfileImage}
        <div className="flex items-center ml-[12px] mr-[30px] text-2xl text-black/70 w-[100px] h-[56px]">
          {fullName}
        </div>
        {viewProfileButton}
      </div>
      <div className="mx-auto w-[90%] flex gap-3 flex-wrap">{skills}</div>
    </div>
  );
}
