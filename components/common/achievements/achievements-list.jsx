import clsx from "clsx";
import { firaSans } from "../../fonts";

export function AchievementsList({ achievements, className }) {
  return (
    <div className={className}>
      <div
        className={clsx(
          firaSans.className,
          "mb-7 font-medium text-[20px] text-black/70",
        )}
      >
        Achievements:
      </div>

      {!achievements || achievements.length == 0 ? (
        <div className="text-[16px] text-black/70">No achievements</div>
      ) : (
        <div className="space-y-[5px]">{achievements}</div>
      )}
    </div>
  );
}
