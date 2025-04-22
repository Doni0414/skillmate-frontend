export function UserInfoFormLayout({ userInfoFields }) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-y-[30px] gap-x-[33px] w-fit mx-auto mt-[77px]">
      {userInfoFields}
    </div>
  );
}
