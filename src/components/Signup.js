import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router";

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cname, setCname] = useState("");
  const [radio, setRadio] = useState("yes");
  const [Loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [networkSlow, setNetworkSlow] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  if (localStorage.getItem("token")) {
    navigate("/dashboard");
  }

  const handleClick = async () => {
    if (!name || !phone || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      setNetworkSlow("please wait, network is slow");
    }, 8000);

    try {
      const res = await fetch(
        `https://popx-backend-hdkp.onrender.com/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            email,
            password,
            company: cname,
            agency: radio,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400) {
          setMessage("User already exists. Please login.");
        }
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      clearTimeout(timer);
      navigate("/dashboard");
    } catch (err) {
      clearTimeout(timer);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F7F8F9] border border-gray-300 p-7 w-93.75 m-auto h-[80dvh] mt-[10dvh] mb-[10dvh] flex flex-col justify-between">
      <div className=" my-2 text-gray-600">
        <Link to="/" className="flex items-center gap-2">
          <IoMdArrowRoundBack className="text-indigo-500" />
          Back to home
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-2">Create your PopX account</h1>
        <div>
          <div className="relative">
            <label
              className="text-sm absolute left-2 top-0.5 text-[#6C25FF] bg-[#F7F8F9]"
              htmlFor="signup-name"
            >
              Full Name<span>*</span>
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 mt-3"
              id="signup-name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setMessage(null);
              }}
            ></input>
          </div>
          <div className="relative">
            <label
              className="text-sm absolute left-2 top-0.5 text-[#6C25FF] bg-[#F7F8F9]"
              htmlFor="signup-number"
            >
              Phone number<span>*</span>
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 mt-3"
              id="signup-number"
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setMessage(null);
              }}
            ></input>
          </div>
          <div className="relative">
            <label
              className="text-sm absolute left-2 top-0.5 text-[#6C25FF] bg-[#F7F8F9]"
              htmlFor="signup-email"
            >
              Email address<span>*</span>
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 mt-3"
              id="signup-email"
              type="email"
              placeholder="Email address"
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
              htmlFor="signup-password"
            >
              Password<span>*</span>
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 mt-3"
              id="signup-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage(null);
              }}
            ></input>
          </div>
          <div className="relative">
            <label
              className="text-sm absolute left-2 top-0.5 text-[#6C25FF] bg-[#F7F8F9]"
              htmlFor="signup-cname"
            >
              Company name
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 mt-3"
              id="signup-cname"
              type="text"
              placeholder="Company name"
              value={cname}
              onChange={(e) => {
                setCname(e.target.value);
                setMessage(null);
              }}
            ></input>
          </div>
          <div>
            <div>
              Are you an Agency<span>*</span>
            </div>
            <label className="mr-3">
              <input
                checked={radio === "yes"}
                onChange={(e) => {
                  setRadio("yes");
                  setMessage(null);
                }}
                type="radio"
              ></input>
              Yes
            </label>
            <label>
              <input
                checked={radio === "no"}
                onChange={(e) => {
                  setRadio("no");
                  setMessage(null);
                }}
                type="radio"
              ></input>
              No
            </label>
          </div>
        </div>
      </div>
      <div>
        <button
          className={`bg-indigo-500 text-white px-4 py-2 rounded-md w-full ${
            name.trim() === "" ||
            phone.trim() === "" ||
            email.trim() === "" ||
            password.trim() === ""
              ? "opacity-50 cursor-not-allowed"
              : "hover:cursor-pointer"
          }`}
          disabled={
            name.trim() === "" ||
            phone.trim() === "" ||
            email.trim() === "" ||
            password.trim() === ""
          }
          onClick={handleClick}
        >
          {Loading ? (
            <div className="w-6 h-6 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin m-auto"></div>
          ) : (
            "Create Account"
          )}
        </button>
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
        <p className="text-red-500">{message}</p>
        <p className="text-orange-500">{networkSlow}</p>
      </div>
    </div>
  );
};

export default Signup;
