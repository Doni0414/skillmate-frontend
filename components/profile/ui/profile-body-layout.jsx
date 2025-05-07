export function ProfileBodyLayout({ menuButtons, items }) {
  return (
    <div>
      <div className="border-t border-t-[#DBDBDB] w-[935px] flex justify-center">
        <div className="flex gap-[42px] items-center">{menuButtons}</div>
        {items}
      </div>
    </div>
  );
}
