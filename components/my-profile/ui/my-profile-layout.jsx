import clsx from "clsx";
import { poppins } from "../../fonts";

export function MyProfileLayout({
  className,
  userEmailContainer,
  editProfileButton,
  userInfoForm,
  skills,
  addSkillButton,
}) {
  return (
    <div
      className={clsx(
        className,
        poppins.className,
        "w-[1200px] pb-16 border border-[#3C5AA5] bg-white",
      )}
    >
      <div className="w-[1200px] h-[94px] bg-[#3C5AA5]"></div>
      <div className="flex justify-between items-center mt-16 mx-[53px]">
        {userEmailContainer}
        {editProfileButton}
      </div>
      {userInfoForm}
      <div className="mt-10 mx-8">
        {addSkillButton}
        <div className="mt-[47px] space-y-5">{skills}</div>
      </div>
    </div>
  );
}
