import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="bg-[#F7F8F9] border-gray-600 p-7 w-93.75 m-auto h-[80dvh] mt-[10dvh] mb-[10dvh] flex flex-col justify-end">
      <h1 className="text-2xl font-bold mb-2">Welcome to PopX</h1>
      <p className="text-gray-600 mb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <Link to="/signup">
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-md mb-2 font-medium w-full hover:cursor-pointer">
          Create Account
        </button>
      </Link>
      <Link to="/login">
        <button className="border-none bg-[#6C25FF4B] px-4 py-2 rounded-md font-medium w-full hover:cursor-pointer">
          Already Registered? Login
        </button>
      </Link>
    </div>
  );
};

export default Home;
