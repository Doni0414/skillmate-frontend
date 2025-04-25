import { DeletableAchievementCard } from "../common/achievements/deletable-achievement-card";
import { HiddenFileInput } from "../common/hidden-file-input";
import { Modal } from "../common/modal";
import { Select } from "../common/select";
import { useEditSkillPopupState } from "./model/use-edit-skill-popup-state";
import { useSuggestedSkillsState } from "./model/use-suggested-skills-state";
import { EditSkillPopupLayout } from "./ui/edit-skill-popup-layout";
import { ProficiencyLevelSelect } from "./ui/proficiency-level-selector";
import { SuggestedSkill } from "./ui/suggested-skill";

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
  setSkillName,
}) {
  const {
    suggestedSkills,
    isSuggestedSkillsOpen,
    onSearchFocus,
    onSearchUnFocus,
    handleClickOnSuggestedSkill,
    onSearchChange,
  } = useSuggestedSkillsState(skill.name, setSkillName);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {skill && (
        <EditSkillPopupLayout
          onSearchFocus={onSearchFocus}
          onSearchUnFocus={onSearchUnFocus}
          handleClickOnSave={handleClickOnSave}
          skillName={skill.name}
          skillNameErrorText={errors.skillNameError}
          skillDescription={skill.description}
          skillDescriptionErrorText={errors.skillDescriptionError}
          handleSkillNameChange={(e) => {
            handleSkillOnEditFieldChange("name", e.target.value);
            onSearchChange();
          }}
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
          suggestedSkills={
            isSuggestedSkillsOpen &&
            suggestedSkills.map((skill, index) => (
              <SuggestedSkill
                key={index}
                skillName={skill.name}
                onClick={handleClickOnSuggestedSkill}
              />
            ))
          }
        />
      )}
    </Modal>
  );
}
