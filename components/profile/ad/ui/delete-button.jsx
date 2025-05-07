export function DeleteButton({ handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="bg-[#BE2424]/80 rounded-[10px] px-2 py-1 text-[15px] text-white cursor-pointer hover:bg-[#BE2424]/70 transition-colors"
    >
      Delete
    </button>
  );
}
