import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { usePopup } from "../context/PopupContext";
import ProfileSkeleton from "./ProfileSkeleton";

const ProtectedWraper = ({ children }) => {
  const { setuser } = useContext(UserDataContext);
  const { setIsPopupOpen } = usePopup();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsPopupOpen(true);
      setuser();
      return; // Prevent further API call
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          setuser(res.data);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (err) {
        console.error("Auth error:", err.message);
        setIsPopupOpen(true);
        // Optionally redirect:
        // navigate("/login");
      } 
    };

    fetchProfile();
  }, [setuser, setIsPopupOpen, navigate]);

  return <>{children}</>;
};

export default ProtectedWraper;
