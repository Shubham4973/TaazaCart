import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0 && product) {
      let filtered = products.filter(
        (item) => item.category === product.category && item._id !== product._id
      );

      for (let i = filtered.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
      }
      setRelatedProducts(filtered.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);

  // 🔹 Discount calculation
  const getDiscountPercentage = (price, offerPrice) => {
    if (!price || !offerPrice || price <= offerPrice) return null;
    return Math.round(((price - offerPrice) / price) * 100);
  };

  const discount = getDiscountPercentage(product?.price, product?.offerPrice);

  return (
    product && (
      <div className="mt-12">
        {/* Breadcrumbs */}
        <p className="text-sm text-gray-500">
          <Link to={"/"} className="hover:text-primary">
            Home
          </Link>{" "}
          /
          <Link to={"/products"} className="hover:text-primary">
            {" "}
            Products
          </Link>{" "}
          /
          <Link
            to={`/products/${product.category.toLowerCase()}`}
            className="hover:text-primary"
          >
            {product.category}
          </Link>{" "}
          /<span className="text-primary font-medium"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-12 mt-6">
          {/* Image Section */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`border w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden cursor-pointer flex items-center justify-center transition hover:border-primary ${
                    thumbnail === image ? "border-primary" : "border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            <div className="border border-gray-300 rounded-lg overflow-hidden w-72 md:w-96 h-72 md:h-96 flex items-center justify-center bg-gray-50">
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-semibold text-gray-800">
              {product.name}
            </h1>

            {/* Price + Discount */}
            <div className="mt-5">
              <p className="text-gray-500 line-through">
                MRP: {currency}
                {product.price}
              </p>
              <div className="flex items-baseline gap-3 mt-1">
                <p className="text-2xl font-bold text-primary">
                  {currency}
                  {product.offerPrice}
                </p>
                {discount && (
                  <span className="text-sm font-medium text-green-600">
                    {discount}% OFF
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500">
                (Inclusive of all taxes)
              </span>
            </div>

            {/* About Product */}
            <p className="text-lg font-medium mt-8 mb-2 text-gray-800">
              About Product
            </p>
            <ul className="list-disc ml-5 text-gray-600 space-y-1">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex items-center mt-8 gap-4 text-base">
              <button
                onClick={() => addToCart(product._id)}
                className="w-1/2 py-3 font-medium border border-gray-300 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="w-1/2 py-3 font-medium rounded-lg bg-primary text-white hover:bg-primary-dull transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="flex flex-col items-center mt-20">
          <div className="flex flex-col items-center w-max">
            <p className="text-3xl font-semibold uppercase text-gray-800">
              Related Products
            </p>
            <div className="w-20 h-0.5 bg-primary rounded-full mt-2 "></div>
          </div>
          <div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
             gap-6 md:gap-8 mt-10"
          >
            {relatedProducts
              .filter((product) => product.inStock)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="mx-auto cursor-pointer px-10 mt-12 py-2.5 border rounded-lg text-primary hover:bg-primary/10 transition"
          >
            See More
          </button>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
