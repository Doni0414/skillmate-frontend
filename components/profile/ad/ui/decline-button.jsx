export function DeclineButton({ onClick }) {
  return (
    <button
      className="rounded-[10px] px-4 py-1 bg-[#BE2424]/80 text-white text-[15px] cursor-pointer"
      onClick={onClick}
    >
      Decline
    </button>
  );
}
