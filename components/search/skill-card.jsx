import { useState } from "react";
import { ViewSkillPopup } from "../common/view-skill-popup/view-skill-popup";

export function SkillCard({ skill }) {
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const closeViewPopup = () => {
    setViewPopupOpen(false);
  };
  const handleClickOnCard = () => {
    setViewPopupOpen(true);
  };
  return (
    <>
      <ViewSkillPopup
        skill={skill}
        isOpen={viewPopupOpen}
        onClose={closeViewPopup}
      />
      <button
        onClick={handleClickOnCard}
        className="bg-[#98C0D3] rounded-[8px] w-[150px] h-[50px] font-semibold text-[13px] cursor-pointer text-ellipsis overflow-hidden"
      >
        {skill.name}
      </button>
    </>
  );
}
