import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const ProtectedWraper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { setuser, setIsPopupOpen } = useContext(UserDataContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
        setIsPopupOpen(true)
    //   navigate("/login");
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setuser(response.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return <>{children}</>;
};

export default ProtectedWraper;