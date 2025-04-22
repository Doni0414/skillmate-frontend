export function EditProfileButton({ handleClickOnEditButton }) {
  return (
    <button
      onClick={handleClickOnEditButton}
      className="bg-[#4182F9] w-[95px] h-[50px] text-[14px] text-white rounded-[7px] cursor-pointer"
    >
      Edit
    </button>
  );
}
