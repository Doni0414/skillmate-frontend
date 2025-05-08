import Image from "next/image";
import { RequestCardLayout } from "./ui/request-card-layout";
import { getResourceURLById } from "../../api";
import { useRequestCardState } from "./model/use-request-card-state";
import defaultUserAva from "../../header/images/ava.png";
import { AcceptButton } from "./ui/accept-button";
import { DeclineButton } from "./ui/decline-button";

export function RequestCard({ request, setRequests }) {
  const { requester, handleAcceptClick, handleDeclineClick } =
    useRequestCardState(request, setRequests);
  if (!requester) return null;
  return (
    <RequestCardLayout
      userId={requester.id}
      userImage={
        <Image
          alt="ava"
          src={
            requester.imageResourceId
              ? getResourceURLById(requester.imageResourceId)
              : defaultUserAva
          }
          width={30}
          height={30}
          className="w-8 h-8 rounded-full object-cover"
        />
      }
      userFullName={requester.fullName}
      buttons={[
        <AcceptButton onClick={handleAcceptClick} />,
        <DeclineButton onClick={handleDeclineClick} />,
      ]}
      text={request.message}
    />
  );
}
