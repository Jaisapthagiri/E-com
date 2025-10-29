import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Star, StarOff } from "lucide-react";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    setThumbnail(product?.image?.[0] || null);
  }, [product]);

  return (
    product && (
      <div className="mt-12">
        <p className="text-sm text-gray-600">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/products" className="hover:text-primary transition">
            Products
          </Link>{" "}
          /{" "}
          <Link
            to={`/products/${product.category?.toLowerCase()}`}
            className="hover:text-primary transition"
          >
            {product.category}
          </Link>{" "}
          / <span className="text-primary font-medium">{product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-6">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(img)}
                  className={`border rounded overflow-hidden cursor-pointer max-w-24 ${thumbnail === img ? "border-primary" : "border-gray-300"
                    }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="border border-gray-300 rounded overflow-hidden max-w-100">
              <img src={thumbnail} alt="Selected product" />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium text-gray-800">
              {product.name}
            </h1>

            <div className="flex items-center gap-1 mt-2">
              {Array(5)
                .fill("")
                .map((_, i) =>
                  i < 4 ? (
                    <Star key={i} size={18} className="text-yellow-500" />
                  ) : (
                    <StarOff key={i} size={18} className="text-gray-400" />
                  )
                )}
              <p className="ml-2 text-gray-600">(4)</p>
            </div>

            <div className="mt-6">
              <p className="text-2xl font-semibold text-primary">
                Price: {currency}
                {product.price}
              </p>
              <span className="text-gray-500 text-sm">
                (inclusive of all taxes)
              </span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-5 text-gray-600 space-y-1">
              {product.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => addToCart(product._id)}
                className="w-full py-3.5 font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 rounded transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="w-full py-3.5 font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 rounded transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
