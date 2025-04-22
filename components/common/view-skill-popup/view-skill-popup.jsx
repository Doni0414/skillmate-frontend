import { useViewSkillPopupState } from "./model/use-view-skill-popup-state";
import { AchievementCard } from "../achievements/achievement-card";
import { Modal } from "../modal";
import { ViewSkillPopupLayout } from "./view-skill-popup-layout";

export function ViewSkillPopup({ skill, className, isOpen, onClose }) {
  const { downloadedAchievements } = useViewSkillPopupState(skill);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {skill && (
        <ViewSkillPopupLayout
          skillName={skill.name}
          skillDescription={skill.description}
          skillLevel={skill.level}
          achievements={downloadedAchievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              achievement={achievement}
              id={achievement.id}
            />
          ))}
        />
      )}
    </Modal>
  );
}
