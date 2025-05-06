export function ViewProfileButton({ userId }) {
  return (
    <a href={`/profile/${userId}`}>
      <button className="border-2 border-black/70 text-2xl font-bold text-black/70 rounded-[8px] px-5 py-[10px] cursor-pointer hover:text-black/60 hover:border-black/60 transition-colors">
        View Profile
      </button>
    </a>
  );
}
