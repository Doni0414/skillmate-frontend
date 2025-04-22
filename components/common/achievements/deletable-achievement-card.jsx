import { AchievementCard } from "./achievement-card";

export function DeletableAchievementCard({
  index,
  achievement,
  handleDeleteAchievement,
}) {
  return (
    <div className="flex items-center gap-4">
      <AchievementCard achievement={achievement} />
      <button
        className="text-gray-500 hover:text-black cursor-pointer"
        onClick={(e) => handleDeleteAchievement(e, index)}
      >
        ✖
      </button>
    </div>
  );
}
