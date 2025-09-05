import React from "react";
import Categories from "../components/Categories";
import BestSellers from "../components/BestSellers";
import BottomBanner from "../components/BottomBanner";
import NewsLetter from "../components/NewsLetter";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div className="mt-10">
      <HeroSection />
      <Categories />
      <BestSellers />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
