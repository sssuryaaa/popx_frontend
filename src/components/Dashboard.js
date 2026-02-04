import React, { use, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router";
import Shimmer from "./Shimmer";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://avatars.githubusercontent.com/u/26342387?v=4",
  );
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setAvatarUrl(imageUrl);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const res = await fetch(
        `https://popx-backend-hdkp.onrender.com/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        localStorage.removeItem("token");
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  if (!user) return <Shimmer />;
  return (
    <div className="border border-gray-300 w-93.75 m-auto h-[80dvh] mt-[10dvh] mb-[10dvh] flex flex-col">
      <div className="flex justify-between px-5 py-4 items-center bg-white drop-shadow-2xl">
        <h1>Account settings</h1>
        <button
          className="bg-red-500 text-white text-sm px-4 py-1 rounded-md"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <div className="bg-[#F7F8F9] p-7 h-full">
        <div className="flex gap-2">
          <div className="relative">
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 text-white rounded-full p-1 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <MdEdit className="absolute bottom-0 right-0 text-white bg-indigo-500 rounded-full p-1" />
            </label>
          </div>
          <div>
            <p className="font-bold">{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="text-gray-600 text-sm mt-3">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
          Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat,
          Sed Diam
        </div>
        <div className="border-t border-dashed border-gray-600 h-1 mt-5"></div>
      </div>
    </div>
  );
};

export default Dashboard;
