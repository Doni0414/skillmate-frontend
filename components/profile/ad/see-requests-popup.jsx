import { createPortal } from "react-dom";
import { Modal } from "../../common/modal";
import { useSeeRequestsPopupState } from "./model/use-see-requests-popup-state";
import { SeeRequestsPopupLayout } from "./ui/see-requests-popup-layout";

export function SeeRequestsPopup({ isOpen, requests, onClose }) {
  const { mounted } = useSeeRequestsPopupState();
  if (!mounted) return null;
  const el = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SeeRequestsPopupLayout />
    </Modal>
  );

  return createPortal(el, document.getElementById("modals"));
}
