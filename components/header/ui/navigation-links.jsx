import { NavigationButton } from "./navigation-button";
import { NavigationLink } from "./navigation-link";

export function NavigationLinks({ setIsCreateAdPopupOpen }) {
  const handleClickOnCreateAdButton = () => {
    setIsCreateAdPopupOpen(true);
  };

  return (
    <NavigationLinksLayout>
      <NavigationLink link="/chat" text={"Chat"} />
      <NavigationLink link="/publications" text="Posts" />
      <NavigationButton
        text="Share skill"
        handleClick={handleClickOnCreateAdButton}
      />
      <NavigationLink link="/search" text="Discover ad" />
    </NavigationLinksLayout>
  );
}

function NavigationLinksLayout({ children }) {
  return (
    <div className="flex items-center gap-[77px] text-[18px] text-black/70 font-medium mr-[167px]">
      {children}
    </div>
  );
}
