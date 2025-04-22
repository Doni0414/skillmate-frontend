import clsx from "clsx";
import { firaSans } from "../../fonts";
import { AchievementsList } from "../achievements/achievements-list";

export function ViewSkillPopupLayout({
  skillName,
  skillDescription,
  skillLevel,
  achievements,
  className,
}) {
  return (
    <div className="px-[52px] py-16 bg-[#FFF4D1] border border-[#FFC107] rounded-[20px]">
      <div
        className={clsx(
          firaSans.className,
          "m-auto mb-[71px] w-fit text-[29px] text-black/70 font-semibold ",
        )}
      >
        {skillName}
      </div>

      <div className="mb-10 w-[609px] px-5 py-[15px] rounded-[7px] bg-[#F2F4F7] text-[17px] text-black/60 font-medium">
        {skillDescription}
      </div>

      <div className="mb-10 w-fit px-[9px] py-4 rounded-[7px] bg-[#F2F4F7] text-[17px] text-black/60 font-medium">
        Level: {skillLevel}
      </div>

      <AchievementsList achievements={achievements} />
    </div>
  );
}
