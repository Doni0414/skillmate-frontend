import clsx from "clsx";
import { getResourceURLById } from "../../api";
import { AchievementIcon } from "./achievement-icon";
import { firaSans } from "../../fonts";

export function AchievementCard({ id, achievement }) {
  return (
    <div
      className={clsx(
        firaSans.className,
        "flex items-center gap-4 w-fit pl-4 pr-6 py-3 rounded-[8px] bg-[#F2F4F7]",
      )}
    >
      <AchievementIcon fileName={achievement.fileName} />
      <div className="w-[150px] text-[16px] text-[#4B4B4B] text-ellipsis whitespace-nowrap overflow-hidden">
        {achievement.fileName}
      </div>

      {achievement.id && (
        <div className="flex items-center gap-2">
          <div className="w-[3px] h-[3px] rounded-full bg-[#767676]"></div>
          <a
            href={getResourceURLById(id)}
            className="text-[14px] text-[#005FAD]"
          >
            Download
          </a>
        </div>
      )}

      <div className="text-black/70 text-[14px]">{achievement.size}</div>
    </div>
  );
}
