import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <section className="relative mt-24 bg-gradient-to-r from-primary/5 via-white to-primary/5 rounded-2xl shadow-lg overflow-hidden">
      <div
        className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 
        flex flex-col md:flex-row items-center justify-between gap-10 py-12"
      >
        {/* Left: Text + Features */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">
            Why <span className="text-primary">We Are the Best?</span>
          </h1>

          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 mt-2">
              <img
                src={feature.icon}
                alt={feature.title}
                className="md:w-11 w-9"
              />
              <div className="flex flex-col">
                <h3 className="text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-500/70 text-xs md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Featured Product PNG */}
        <div className="flex-1 relative flex justify-center md:justify-end">
          <div className="relative w-[200px] md:w-[280px] lg:w-[320px]">
            <img
              src={assets.featured_product2} // <-- Add your featured PNG here
              alt="Featured Product"
              className="w-full object-contain drop-shadow-xl animate-float"
            />
            {/* Decorative Glow */}
            <div className="absolute -inset-6 bg-primary/10 blur-2xl rounded-full -z-10"></div>
          </div>
        </div>
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dot-grid.png')] opacity-5 pointer-events-none"></div>
    </section>
  );
};

export default BottomBanner;
