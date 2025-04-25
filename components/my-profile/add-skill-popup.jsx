import { DeletableAchievementCard } from "../common/achievements/deletable-achievement-card";
import { HiddenFileInput } from "../common/hidden-file-input";
import { Modal } from "../common/modal";
import { useSuggestedSkillsState } from "./model/use-suggested-skills-state";
import { AddSkillPopupLayout } from "./ui/add-skill-popup-layout";
import { ProficiencyLevelSelect } from "./ui/proficiency-level-selector";
import { SuggestedSkill } from "./ui/suggested-skill";

export function AddSkillPopup({
  isOpen,
  onClose,
  addSkillForm,
  addSkillFormErrors,
  proficiencyLevels,
  proficiencyLevelValues,
  addAchievementInputRef,
  handleChangeOfAddSkillForm,
  handleClickOnAttachAchievementsButtonInAddSkillForm,
  handleAddAchievementInputRefOnChange,
  handleClickOnSaveButtonInAddSkillPopup,
  deleteAchievementInAddSkillPopup,
  setSkillName,
}) {
  const {
    suggestedSkills,
    isSuggestedSkillsOpen,
    onSearchFocus,
    onSearchUnFocus,
    handleClickOnSuggestedSkill,
    onSearchChange,
  } = useSuggestedSkillsState(addSkillForm.name, setSkillName);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AddSkillPopupLayout
        onSearchFocus={onSearchFocus}
        onSearchUnFocus={onSearchUnFocus}
        skillName={addSkillForm.name}
        handleSkillNameChange={(e) => {
          handleChangeOfAddSkillForm("name", e.target.value);
          onSearchChange();
        }}
        skillNameErrorText={addSkillFormErrors.skillNameError}
        skillDescription={addSkillForm.description}
        handleDescriptionChange={(e) => {
          handleChangeOfAddSkillForm("description", e.target.value);
        }}
        skillDescriptionErrorText={addSkillFormErrors.skillDescriptionError}
        proficiencyLevelField={
          <ProficiencyLevelSelect
            value={addSkillForm.level}
            labels={proficiencyLevels}
            values={proficiencyLevelValues}
            onSelect={(e) => handleChangeOfAddSkillForm("level", e)}
          />
        }
        handleClickOnAttachAchievementsButtonInAddSkillForm={
          handleClickOnAttachAchievementsButtonInAddSkillForm
        }
        handleClickOnSaveButtonInAddSkillPopup={
          handleClickOnSaveButtonInAddSkillPopup
        }
        hiddenAchievementInput={
          <HiddenFileInput
            ref={addAchievementInputRef}
            onChange={handleAddAchievementInputRefOnChange}
          />
        }
        achievements={addSkillForm.achievements.map((achievement, index) => (
          <DeletableAchievementCard
            handleDeleteAchievement={deleteAchievementInAddSkillPopup}
            achievement={achievement}
            index={index}
          />
        ))}
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
    </Modal>
  );
}
