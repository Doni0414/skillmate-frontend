import { createPortal } from "react-dom";

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const modal = (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="shadow-lg relative max-h-screen overflow-y-auto scrollbar-hide">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black cursor-pointer"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
  return createPortal(modal, document.getElementById("modals"));
}
