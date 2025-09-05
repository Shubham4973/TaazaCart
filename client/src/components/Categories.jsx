import React, { useState, useEffect } from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Categories = () => {
  const { navigate } = useAppContext();
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Adjust items per page based on screen size
  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 640) setItemsPerPage(2); // mobile
      else if (window.innerWidth < 1024) setItemsPerPage(3); // tablet
      else if (window.innerWidth < 1280) setItemsPerPage(4); // small desktop
      else setItemsPerPage(5); // large desktop
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const endIndex = startIndex + itemsPerPage;
  const visibleCategories = categories.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < categories.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <div className="mt-16 relative">
      <p className="text-2xl md:text-3xl font-medium mb-10">Categories</p>

      {/* Carousel with buttons */}
      <div className="relative flex items-center mt-6">
        {/* Left Button */}
        {startIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute -left-4 md:-left-8 z-10 p-2 rounded-full bg-white shadow hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Visible Categories */}
        <div className="flex gap-6 w-full justify-center">
          {visibleCategories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer w-40 md:w-48 lg:w-52 aspect-square 
                         rounded-lg flex flex-col justify-center items-center
                         hover:scale-105 hover:shadow-lg transition"
              style={{ backgroundColor: category.bgColor }}
              onClick={() => {
                navigate(`/products/${category.path.toLowerCase()}`);
                scrollTo(0, 0);
              }}
            >
              <img
                className="group-hover:scale-110 transition-transform w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
                src={category.image}
                alt={category.text}
              />
              <p className="mt-3 text-sm md:text-base font-medium text-center">
                {category.text}
              </p>
            </div>
          ))}
        </div>

        {/* Right Button */}
        {endIndex < categories.length && (
          <button
            onClick={handleNext}
            className="absolute -right-4 md:-right-8 z-10 p-2 rounded-full bg-white shadow hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Categories;
