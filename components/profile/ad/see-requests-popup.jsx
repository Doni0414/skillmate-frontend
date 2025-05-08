import { createPortal } from "react-dom";
import { Modal } from "../../common/modal";
import { useSeeRequestsPopupState } from "./model/use-see-requests-popup-state";
import { SeeRequestsPopupLayout } from "./ui/see-requests-popup-layout";
import { RequestCard } from "./request-card";

export function SeeRequestsPopup({ isOpen, requests, onClose, setRequests }) {
  const { mounted } = useSeeRequestsPopupState();
  if (!mounted) return null;
  const el = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SeeRequestsPopupLayout
        requests={requests.map((request) => (
          <RequestCard request={request} setRequests={setRequests} />
        ))}
      />
    </Modal>
  );

  return createPortal(el, document.getElementById("modals"));
}
