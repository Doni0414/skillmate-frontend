export function UserEmailContainerLayout({
  onUserImageClick,
  editImageIcon,
  userImage,
  fullName,
  email,
  hiddenImageInput,
}) {
  return (
    <div className="flex items-center gap-[18px]">
      <div onClick={onUserImageClick} className="cursor-pointer w-fit relative">
        {userImage}
        <div className="bg-[#F9F9F9] rounded-full w-[30px] h-[30px] flex justify-center items-center absolute bottom-0 right-0">
          {editImageIcon}
        </div>
        {hiddenImageInput}
      </div>
      <div>
        <div className="mb-1 font-medium text-[18px]">{fullName}</div>
        <div className="text-[14px] opacity-50">{email}</div>
      </div>
    </div>
  );
}
