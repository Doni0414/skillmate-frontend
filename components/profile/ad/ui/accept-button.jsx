export function AcceptButton({ onClick }) {
  return (
    <button
      className="rounded-[10px] px-4 py-1 bg-[#E1F6FF]/70 text-[15px] cursor-pointer"
      onClick={onClick}
    >
      Accept
    </button>
  );
}
