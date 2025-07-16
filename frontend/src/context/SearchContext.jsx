// src/context/SearchContext.js
import { createContext, useState, useEffect } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState(() => {
    const saved = localStorage.getItem("searchResults");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("searchResults", JSON.stringify(searchResults));
  }, [searchResults]);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};
