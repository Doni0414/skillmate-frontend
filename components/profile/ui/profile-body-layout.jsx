export function ProfileBodyLayout({ menuButtons, items }) {
  return (
    <div className="flex flex-col items-center">
      <div className="border-t border-t-[#DBDBDB] w-[935px] flex justify-center mb-[95px]">
        <div className="flex gap-[42px] items-center">{menuButtons}</div>
      </div>
      {items}
    </div>
  );
}
