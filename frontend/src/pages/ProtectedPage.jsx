import React from "react";
import Popup from "../components/Popup";
import { usePopup } from "../context/PopupContext";

const ProtectedPage = () => {
  const { isPopupOpen } = usePopup();
  return (
    <div
      className={`w-[98%] absolute h-full flex items-center justify-center transition-opacity duration-300 ${
        isPopupOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Popup isPopupOpen={isPopupOpen} />
    </div>
  );
};

export default ProtectedPage;
