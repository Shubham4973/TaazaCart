import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative w-full bg-gradient-to-r from-primary/5 via-white to-primary/5 overflow-hidden py-6 md:py-8 lg:py-10">
      <div
        className="max-w-6xl mx-auto px-4 lg:px-10 
                flex flex-col md:flex-row items-center 
                justify-between gap-6"
      >
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
            Freshness You Can Trust,{" "}
            <span className="text-primary">Savings You Will Love</span>
          </h1>
          <p className="mt-3 text-gray-600 max-w-md mx-auto md:mx-0 text-base md:text-lg leading-relaxed">
            Shop groceries, snacks, and essentials with unbeatable freshness —
            delivered fast, at prices you’ll love.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center md:justify-start gap-3 mt-5">
            <Link
              to={"/products"}
              className="group flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full shadow-md hover:bg-primary-dark hover:shadow-lg transition-all duration-300 text-base"
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
              className="group flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-full shadow hover:shadow-md transition-all duration-300 text-base"
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

        {/* Right Content - Product Showcase */}
        <div className="flex-1 relative flex justify-center md:justify-end">
          <div className="relative w-[160px] md:w-[220px] lg:w-[260px]">
            <img
              src={assets.featured_product}
              alt="Featured product"
              className="w-full object-contain drop-shadow-lg animate-float"
            />
            {/* Decorative Glow */}
            <div className="absolute -inset-3 bg-primary/15 blur-lg rounded-full -z-10"></div>
          </div>
        </div>
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dot-grid.png')] opacity-5 pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
