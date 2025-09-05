import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSellers = () => {
  const { products } = useAppContext();

  // ✅ Shuffle helper function
  const shuffleArray = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  // ✅ Get 4 random in-stock products
  const bestSellerProducts = shuffleArray(
    products.filter((product) => product.inStock)
  ).slice(0, 5);

  return (
    <div className="mt-6">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
      <div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
             gap-6 md:gap-8 mt-10"
      >
        {bestSellerProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
