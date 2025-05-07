export function EditButton({ handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="bg-[#E1F6FF]/70 rounded-[10px] px-5 py-1 text-[15px] cursor-pointer hover:bg-[#E1F6FF]/60 transition-colors"
    >
      Edit
    </button>
  );
}
