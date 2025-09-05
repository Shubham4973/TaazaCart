import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // new state

  useEffect(() => {
    // Extract unique categories dynamically
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    setCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    let updatedProducts = products;

    // Search filter
    if (searchQuery.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sorting
    if (sortOrder === "lowToHigh") {
      updatedProducts = [...updatedProducts].sort(
        (a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price)
      );
    } else if (sortOrder === "highToLow") {
      updatedProducts = [...updatedProducts].sort(
        (a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price)
      );
    }

    setFilteredProducts(updatedProducts);
  }, [products, searchQuery, selectedCategory, sortOrder]);

  return (
    <div className="mt-10 flex flex-col px-4 md:px-8 lg:px-12">
      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        {/* Title */}
        <div>
          <p className="text-2xl md:text-3xl font-semibold uppercase text-gray-800">
            All Products
          </p>
          <div className="w-16 h-0.5 bg-primary rounded-full mt-1"></div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          {/* Category Dropdown */}
          <div className="hidden md:flex items-center gap-2">
            <label htmlFor="category" className="text-gray-600 font-medium">
              Category:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="">All</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-gray-600 font-medium">
              Sort:
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="">Default</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
             gap-4 md:gap-6"
      >
        {filteredProducts.filter((product) => product.inStock).length > 0 ? (
          filteredProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
