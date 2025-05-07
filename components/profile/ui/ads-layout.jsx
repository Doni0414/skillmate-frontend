export function AdsLayout({ createNewAddButton, ads, isOwn }) {
  return (
    <div className="space-y-12 mt-[30px] flex flex-col items-center">
      {isOwn && createNewAddButton}
      {ads}
    </div>
  );
}
