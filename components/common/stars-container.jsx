import clsx from "clsx";
import { EmptyStarIcon } from "../profile/icon/empty-star";
import { FullStarIcon } from "../profile/icon/full-star";

export function StarsContainer({ rating, size }) {
  const fullStarsCount = Math.round(rating);
  const emptyStarsCount = 5 - fullStarsCount;
  const sizes = {
    lg: "w-12 h-12",
    md: "",
  };
  return (
    <div className="flex gap-[5px]">
      {Array.from({ length: fullStarsCount }).map(() => (
        <FullStarIcon className={sizes[size]} />
      ))}
      {Array.from({ length: emptyStarsCount }).map(() => (
        <EmptyStarIcon className={sizes[size]} />
      ))}
    </div>
  );
}

export function ClickableStarsContainer({ rating, size, onClick, className }) {
  const fullStarsCount = Math.round(rating);
  const emptyStarsCount = 5 - fullStarsCount;
  const sizes = {
    lg: "w-12 h-12",
    md: "",
  };
  return (
    <div className={clsx(className, "flex gap-[5px] cursor-pointer")}>
      {Array.from({ length: fullStarsCount }).map((el, i) => (
        <FullStarIcon onClick={() => onClick(i + 1)} className={sizes[size]} />
      ))}
      {Array.from({ length: emptyStarsCount }).map((el, i) => (
        <EmptyStarIcon
          onClick={() => onClick(fullStarsCount + i + 1)}
          className={sizes[size]}
        />
      ))}
    </div>
  );
}
