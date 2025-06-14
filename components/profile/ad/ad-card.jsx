import Image from "next/image";
import { AdCardLayout } from "./ui/ad-card-layout";
import { getResourceURLById } from "../../api";
import { EditButton } from "./ui/edit-button";
import { DeleteButton } from "./ui/delete-button";
import { SeeRequestsButton } from "./ui/see-requests-button";
import { useAdCardState } from "./model/use-ad-card-state";
import { SeeRequestsPopup } from "./see-requests-popup";
import { defaultAdImageURL } from "../../common/default-images-url";

export function AdCard({ ad, isOwn }) {
  const {
    seeRequestsPopupOpen,
    handleClickOnSeeRequestsButton,
    closeSeeRequestsPopup,
    requests,
    setRequests,
  } = useAdCardState(ad);
  return (
    <>
      <AdCardLayout
        adImage={
          <div
            className="object-cover w-[390px] h-[200px] rounded-lg"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 100%), url(${ad.imageResourceId ? getResourceURLById(ad.imageResourceId) : defaultAdImageURL})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        }
        skillName={ad.skillName}
        adDescription={ad.description}
        editButton={<EditButton />}
        deleteButton={<DeleteButton />}
        seeRequestsButton={
          <SeeRequestsButton handleClick={handleClickOnSeeRequestsButton} />
        }
        isOwn={isOwn}
      />
      <SeeRequestsPopup
        setRequests={setRequests}
        isOpen={seeRequestsPopupOpen}
        onClose={closeSeeRequestsPopup}
        requests={requests}
      />
    </>
  );
}
