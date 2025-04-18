import clsx from "clsx";
import { raleway, redHatDisplay } from "../../fonts";

export function HeaderLayout({
  logo,
  companyName,
  navigationButtons,
  headerProfileContainer,
}) {
  return (
    <header
      className={clsx(
        "flex items-center px-[100px] h-24 bg-[#E1F6FF]",
        raleway.className,
      )}
    >
      <a href="/" className="flex items-center mr-[264px]">
        {logo}
        <span
          className={clsx(
            "text-[#3C5AA5] font-extrabold text-4xl ml-2.5",
            redHatDisplay,
          )}
        >
          {companyName}
        </span>
      </a>
      {navigationButtons}
      {headerProfileContainer}
    </header>
  );
}

export function UnauthenticatedUserHeaderLayout({
  logo,
  companyName,
  authButtons,
}) {
  return (
    <header
      className={clsx(
        "flex justify-between items-center px-[100px] h-24 bg-[#E1F6FF]",
        raleway.className,
      )}
    >
      <a href="/" className="flex items-center">
        {logo}
        <span
          className={clsx(
            "text-[#3C5AA5] font-extrabold text-4xl ml-2.5",
            redHatDisplay,
          )}
        >
          {companyName}
        </span>
      </a>
      {authButtons}
    </header>
  );
}
