import React, { use, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [networkSlow, setNetworkSlow] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  const handleClick = async () => {
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      setNetworkSlow("please wait, network is slow");
    }, 8000);

    try {
      const res = await fetch(
        `https://popx-backend-hdkp.onrender.com/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      clearTimeout(timer);
      navigate("/dashboard");
    } catch (err) {
      clearTimeout(timer);
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F7F8F9] border border-gray-300 p-7 w-93.75 m-auto h-[80dvh] mt-[10dvh] mb-[10dvh] flex flex-col">
      <div className="my-2 text-gray-600">
        <Link to="/" className="flex items-center gap-2">
          <IoMdArrowRoundBack className="text-indigo-500" />
          Back to home
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-2">SignIn to your PopX account</h1>
      <p className="text-gray-600 mb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className="mb-2">
        <div className="relative">
          <label
            className="text-sm absolute left-2 top-0.5 text-[#6C25FF] bg-[#F7F8F9] "
            htmlFor="login-email"
          >
            Email Address<span className="text-[#6C25FF]">*</span>
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg p-3 mt-3"
            id="login-email"
            type="email"
            placeholder="Enter mail address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage(null);
            }}
          ></input>
        </div>
        <div className="relative">
          <label
            className="text-sm absolute left-2 top-0.5 text-[#6C25FF] bg-[#F7F8F9]"
            htmlFor="login-password"
          >
            Enter password<span className="text-[#6C25FF]">*</span>
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg p-3 mt-3"
            id="login-password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setMessage(null);
            }}
          />
        </div>
      </div>
      <button
        className={`bg-indigo-500 text-white px-4 py-2 rounded-md w-full mt-3 ${
          email.trim() === "" || password.trim() === ""
            ? "opacity-50 cursor-not-allowed"
            : "hover:cursor-pointer"
        }`}
        disabled={email.trim() === "" || password.trim() === ""}
        onClick={handleClick}
      >
        {Loading ? (
          <div className="w-6 h-6 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin m-auto"></div>
        ) : (
          "Login"
        )}
      </button>
      <p className="mt-2">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign Up
        </Link>
      </p>
      <p className="text-red-500">{message}</p>
      <p className="text-orange-500">{networkSlow}</p>
    </div>
  );
};

export default Login;
