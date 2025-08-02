import React, { useState, useContext, useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import { HiCamera } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import API from "../services/api";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getTimeAgo } from "./SearchResults";
import ProtectedPage from "./ProtectedPage";
import ProfileSkeleton from "./ProfileSkeleton";

const Profile = () => {
  const { user, setuser } = useContext(UserDataContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(user?.profileImage || null);
  const [saving, setSaving] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const token = localStorage.getItem(`token`);
  const navigate = useNavigate();

  
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    async function response() {
      const res = await API.get(`/user/profile-image`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      });
      const blobUrl = URL.createObjectURL(res.data);
      setImageSrc(blobUrl);
    }

    response();
  }, [preview]);

  const logout = async () => {
    await API.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        setuser();
        localStorage.removeItem("token");
        navigate("/login");
      }
    });
  };

  const handleLogOut = async () => {
    logout();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault(); // <== important

    if (!selectedImage) return;
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const res = await API.post(
        `/user/change-profile`, // no need for full URL if already set in baseURL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200) {
        setSelectedImage(null);
        setPreview(null);
        alert("Profile image updated!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* {loading ? (  
        <div className="text-center  w-full h-full ">
          <ProfileSkeleton />
        </div>
      ) : ( */}
        <div className=" w-full h-full flex flex-col items-center py-16 ">
          <div className="w-full bg-white dark:bg-[#27282F] relative rounded-3xl shadow-xl p-10">
            <div className="mb-5">
              <h1 className="font-semibold text-lg">
                Welcome,{" "}
                <span className="font-bold text-xl">
                  {user?.fullname?.firstname +
                    " " +
                    user?.fullname?.lastname?.[0]?.toUpperCase()}
                  .
                </span>
              </h1>
              <h2 className="text-sm text-slate-400">
                Account Create {getTimeAgo(user?.createdAt)}
              </h2>
            </div>

            {/* Cover Image */}
            <div className="w-full absolute left-0 top-25">
              <img
                className="w-full h-30 rounded-sm"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxOUg2eyjrBMHXFpR80uLEcndPdpQ3YJYFWw&s"
                alt=""
              />
            </div>

            {/* Profile Section */}
            <div className=" mb-10 w-full">
              <form
                onSubmit={handleSave}
                className="flex flex-col sm:flex-row gap-6 mt-24 sm:items-center justify-between"
                encType="multipart/form-data"
              >
                <div className="flex flex-col sm:flex-row gap-6 sm:items-center w-full">
                  <div className="relative mx-auto sm:mx-0 w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#EFF3F8] dark:border-[#393A42] overflow-hidden shadow-lg bg-[#F2F6FC] dark:bg-[#2E2F38]">
                    {(preview || imageSrc) ? (
                      <img
                        src={preview || imageSrc}
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-4xl sm:text-6xl font-semibold text-gray-400 dark:text-gray-600">
                        {user?.fullname?.firstname?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                    <label
                      htmlFor="file-upload"
                      className="absolute bottom-3 right-3 cursor-pointer bg-white dark:bg-[#444650] p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-[#55565F] transition"
                      title="Upload profile photo"
                    >
                      <HiCamera className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300" />
                      <input
                        type="file"
                        id="file-upload"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="text-center sm:text-left">
                    <h1 className="font-bold text-xl sm:text-2xl">
                      {user?.fullname?.firstname +
                        " " +
                        user?.fullname?.lastname}
                    </h1>
                    <h2 className="text-sm text-slate-400">{user?.email}</h2>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedImage || saving}
                  className={`w-full sm:w-60 rounded-xl py-3  font-semibold text-lg transition ${
                    selectedImage && !saving
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 cursor-not-allowed text-gray-600"
                  }`}
                >
                  {saving ? "Saving..." : "Save Profile Image"}
                </button>

                <button
                  onClick={handleLogOut}
                  className=" sm:w-60 rounded-xl py-3 text-lg bg-red-500 text-center flex items-center justify-center font-bold cursor-pointer gap-2"
                >
                  <IoLogOutOutline className="text-[22px]  " /> Logout
                </button>
              </form>
            </div>

            {/* Email Display */}
            <div className="mt-6">
              <h1 className="text-xl font-semibold mb-4">My Email Address</h1>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="bg-gray-500 rounded-full flex items-center justify-center p-3">
                  <MdEmail className="text-xl text-white dark:text-slate-200" />
                </div>
                <div>
                  <h1 className="text-lg hover:underline break-all">
                    {user?.email}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
      <ProtectedPage />
    </>
  );
};

export default Profile;
