import { useState } from "react";

export function PagedElement({
  initialPage,
  pageSize,
  moveToPage,
  children,
  PageSwitcher,
}) {
  const [page, setPage] = useState(initialPage);

  return (
    <div className="w-fit">
      {children}
      <PageSwitcher onClick={() => moveToPage(page + 1, pageSize)} />
    </div>
  );
}
