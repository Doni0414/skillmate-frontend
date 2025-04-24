import { DeletableAchievementCard } from "../common/achievements/deletable-achievement-card";
import { HiddenFileInput } from "../common/hidden-file-input";
import { Modal } from "../common/modal";
import { Select } from "../common/select";
import { useEditSkillPopupState } from "./model/use-edit-skill-popup-state";
import { EditSkillPopupLayout } from "./ui/edit-skill-popup-layout";
import { ProficiencyLevelSelect } from "./ui/proficiency-level-selector";

export function EditSkillPopup({
  isOpen,
  onClose,
  skill,
  handleSkillOnEditFieldChange,
  proficiencyLevels,
  proficiencyLevelValues,
  deleteAchievement,
  handleClickOnAttachAchievement,
  addAchievementInputRef,
  handleAddAchievementInputRefOnChange,
  handleClickOnSave,
  errors,
}) {
  console.log(skill);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {skill && (
        <EditSkillPopupLayout
          handleClickOnSave={handleClickOnSave}
          skillName={skill.name}
          skillNameErrorText={errors.skillNameError}
          skillDescription={skill.description}
          skillDescriptionErrorText={errors.skillDescriptionError}
          handleSkillNameChange={(e) =>
            handleSkillOnEditFieldChange("name", e.target.value)
          }
          handleDescriptionChange={(e) =>
            handleSkillOnEditFieldChange("description", e.target.value)
          }
          proficiencyLevelSelect={
            <ProficiencyLevelSelect
              value={skill.level}
              labels={proficiencyLevels}
              values={proficiencyLevelValues}
              onSelect={(e) => handleSkillOnEditFieldChange("level", e)}
            />
          }
          achievements={skill.downloadedAchievements.map(
            (achievement, index) => (
              <DeletableAchievementCard
                handleDeleteAchievement={deleteAchievement}
                achievement={achievement}
                index={index}
              />
            ),
          )}
          hiddenAchievementInput={
            <HiddenFileInput
              ref={addAchievementInputRef}
              onChange={handleAddAchievementInputRefOnChange}
            />
          }
          handleClickOnAttachAchievement={handleClickOnAttachAchievement}
        />
      )}
    </Modal>
  );
}
