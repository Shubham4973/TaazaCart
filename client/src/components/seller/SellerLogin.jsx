// SellerLogin.jsx
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });
      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center text-sm text-gray-600"
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200">
          <div className="w-full flex justify-center mb-4">
            <img
              src={assets.logo}
              alt="Logo"
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto min-w-[40px] object-contain"
            />
          </div>
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller</span> Login
          </p>

          {/* Email */}
          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            />
          </div>

          {/* Password */}
          <div className="w-full">
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-200 hover:bg-gray-300 transition-all text-gray-700 w-full py-2 rounded-lg font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
