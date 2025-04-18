export function HeaderProfileContainerLayout({
  user,
  profileImage,
  arrowDownIcon,
  handleOnMouseEnter,
  handleOnMouseLeave,
  popupNavigationButtons,
}) {
  return (
    <button
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      className="relative flex items-center gap-3 cursor-pointer"
    >
      <div className="text-black/90 text-[15px] font-semibold leading-7">
        {user.fullName}
      </div>
      {profileImage}
      {arrowDownIcon}
      {popupNavigationButtons}
    </button>
  );
}
