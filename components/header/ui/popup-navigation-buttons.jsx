export function PopupNavigationButtons({
  isAdditionalNavigationPopupOpen,
  children,
}) {
  return isAdditionalNavigationPopupOpen ? (
    <div className="absolute top-9 left-6 px-3 py-2 bg-white text-semibold text-[18px]">
      {children}
    </div>
  ) : (
    <></>
  );
}
