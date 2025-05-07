export function SeeRequestsButton({ handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="bg-[#3C5AA5] rounded-[10px] px-3 py-1 text-[15px] text-white cursor-pointer hover:bg-[#3C5AA5]/90 transition-colors"
    >
      See Requests
    </button>
  );
}
