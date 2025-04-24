export function ChangePasswordButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#41f956] px-5 h-[50px] text-[14px] text-white rounded-[7px] cursor-pointer"
    >
      Change password
    </button>
  );
}
