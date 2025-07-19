import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <PopupContext.Provider value={{ isPopupOpen, setIsPopupOpen }}>
      {children}
    </PopupContext.Provider>
  );
};
