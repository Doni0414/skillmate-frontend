export function SuggestedSkill({ skillName, onClick }) {
  return (
    <div className="cursor-pointer" onMouseDown={(e) => onClick(e, skillName)}>
      <div className="w-[609px] pl-[12px] py-[17px] bg-[#F9F9F9] text-black/70 text-start hover:bg-[#c7c7c7c7] rounded-2xl">
        {skillName}
      </div>
    </div>
  );
}
