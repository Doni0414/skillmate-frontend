export function SkillCard({
  skill,
  handleClickOnViewSkillButton,
  handleClickOnEditSkillButton,
  handleClickOnDeleteSkillButton,
}) {
  return (
    <div className="flex items-center w-fit px-8 py-5 gap-9 rounded-[20px] bg-[#F9F9F9] text-[15px]">
      <div className="w-[300px] text-ellipsis whitespace-nowrap overflow-hidden">
        {skill.name}
      </div>
      <button
        onClick={() => handleClickOnViewSkillButton(skill)}
        className="px-[14px] py-1 rounded-[10px] bg-[#E1F6FF] cursor-pointer"
      >
        View
      </button>
      <button
        onClick={() => handleClickOnEditSkillButton(skill)}
        className="px-[14px] py-1 rounded-[10px] bg-[#E1F6FF] cursor-pointer"
      >
        Edit
      </button>
      <button
        onClick={() => handleClickOnDeleteSkillButton(skill.id)}
        className="px-[10px] py-1 rounded-[10px] bg-[#BE2424] text-white cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}
