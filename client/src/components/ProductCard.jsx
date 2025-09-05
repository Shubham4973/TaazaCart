import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItems, currency } = useAppContext();

  // ✅ Calculate discount percentage
  const discount =
    product.price > 0
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  return (
    <div
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        scrollTo(0, 0);
      }}
      className="border border-gray-300 rounded-lg bg-white 
                 px-4 md:px-6 py-4 
                 hover:shadow-xl transition-shadow duration-300 
                 cursor-pointer flex flex-col justify-between w-full"
    >
      {/* Product Image */}
      <div className="group flex items-center justify-center mb-2">
        <img
          className="group-hover:scale-105 transition-transform duration-300 
                     w-full max-h-40 object-contain"
          src={product.image[0]}
          alt={product.name}
        />
      </div>

      {/* Category */}
      <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wide text-center mb-1">
        {product.category}
      </p>

      {/* Divider */}
      <hr className="border-gray-200 mb-2" />

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-gray-800 font-medium text-sm md:text-base mb-0.5 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs md:text-sm mb-1">{product.brand}</p>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-2">
          <p className="text-primary font-semibold text-sm md:text-base">
            {currency}
            {product.offerPrice}
          </p>
          <span className="text-gray-400 text-xs md:text-sm line-through">
            {currency}
            {product.price}
          </span>
          {discount > 0 && (
            <span className="text-green-600 font-medium text-xs ml-3 md:text-sm">
              {discount}% off
            </span>
          )}
        </div>

        {/* Cart Button */}
        <div onClick={(e) => e.stopPropagation()} className="mt-auto">
          {!cartItems[product._id] ? (
            <button
              className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 
                         px-3 py-1.5 rounded-md text-primary font-medium text-xs md:text-sm 
                         cursor-pointer hover:bg-primary/20 transition w-full"
              onClick={() => addToCart(product._id)}
            >
              <img src={assets.cart_icon} alt="" className="w-4 h-4" />
              Add
            </button>
          ) : (
            <div className="flex items-center justify-between gap-2 w-full h-[34px] bg-primary/25 rounded select-none px-2">
              <button
                onClick={() => removeFromCart(product._id)}
                className="cursor-pointer text-md px-2 h-full"
              >
                -
              </button>
              <span className="w-5 text-center">{cartItems[product._id]}</span>
              <button
                onClick={() => addToCart(product._id)}
                className="cursor-pointer text-md px-2 h-full"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
