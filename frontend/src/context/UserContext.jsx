// src/context/UserContext.jsx
import { createContext, useState, useEffect } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setuser] = useState(null);

  // On mount: load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setuser(JSON.parse(storedUser));
    }
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("⚠️ Failed to save user in localStorage:", error.message);
    }
  }, [user]);

  return (
    <UserDataContext.Provider value={{ user, setuser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
