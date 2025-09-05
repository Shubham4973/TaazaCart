import React from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("❌ " + error.message);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between bg-gray-50">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-6 text-2xl font-semibold text-gray-800">
          All Products
        </h2>

        <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-xl bg-white shadow-md border border-gray-200">
          {products.length === 0 ? (
            <p className="text-gray-500 py-10 text-lg">No products found.</p>
          ) : (
            <table className="table-auto w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                <tr>
                  <th className="px-5 py-3 text-left font-medium">Product</th>
                  <th className="px-5 py-3 text-left font-medium">Category</th>
                  <th className="px-5 py-3 text-left font-medium hidden md:table-cell">
                    Selling Price
                  </th>
                  <th className="px-5 py-3 text-left font-medium">In Stock</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600 divide-y divide-gray-100">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Product cell */}
                    <td className="px-5 py-4 flex items-center gap-3">
                      <div className="w-16 h-16 border border-gray-200 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="truncate font-medium text-gray-800">
                        {product.name}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">{product.category}</td>

                    {/* Price */}
                    <td className="px-5 py-4 hidden md:table-cell font-semibold text-gray-900">
                      {currency}
                      {product.offerPrice}
                    </td>

                    {/* Stock toggle */}
                    <td className="px-5 py-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={product.inStock}
                          onChange={() =>
                            toggleStock(product._id, !product.inStock)
                          }
                        />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out peer-checked:translate-x-6"></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
