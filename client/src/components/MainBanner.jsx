import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative w-full">
      {/* Background Images */}
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block object-cover"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden object-cover"
      />

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Banner Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-center px-6 md:pl-20 lg:pl-32 text-white">
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold 
          text-center md:text-left max-w-2xl leading-snug tracking-tight 
          drop-shadow-2xl animate-fadeInUp"
        >
          Freshness You Can Trust, <br className="hidden md:block" />
          <span className="text-primary">Savings You Will Love</span>
        </h1>

        {/* Action Buttons */}
        <div className="flex items-center gap-5 mt-10 font-semibold">
          <Link
            to={"/products"}
            className="group flex items-center gap-2 px-8 py-3 
            bg-primary/90 backdrop-blur-md rounded-full shadow-lg 
            hover:bg-primary hover:shadow-2xl transition-all duration-300 
            hover:scale-105"
          >
            Shop Now
            <img
              className="w-5 transition-transform group-hover:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          <Link
            to={"/products"}
            className="group hidden md:flex items-center gap-2 px-8 py-3 
            bg-white/90 text-gray-900 rounded-full shadow-md 
            hover:bg-white hover:shadow-xl transition-all duration-300 
            hover:scale-105"
          >
            Explore Deals
            <img
              className="w-5 transition-transform group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
