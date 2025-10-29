import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Trash2, ArrowLeft, ArrowRightCircle } from "lucide-react";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);

  const getCart = () => {
    const tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        product.quantity = cartItems[key];
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) getCart();
  }, [products, cartItems]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3 border-b border-gray-300">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-700 items-center text-sm md:text-base font-medium pt-3 border-b border-gray-200 pb-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <div className="flex items-center gap-2">
                    <p>Qty:</p>
                    <select
                      className="outline-none border border-gray-300 rounded px-2 py-1"
                      onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                      value={cartItems[product._id]}
                    >
                      {Array.from({ length: Math.max(9, cartItems[product._id]) }).map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center">
              {currency}
              {product.price * product.quantity}
            </p>

            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto text-red-500 hover:text-red-600"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition" />
          Continue Shopping
        </button>
      </div>

      {/* ✅ Order Summary + Checkout */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70 rounded-lg">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 0.02).toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>
              {currency}
              {(getCartAmount() * 1.02).toFixed(2)}
            </span>
          </p>
        </div>

        {/* ✅ Go to Payment Page */}
        <button
          onClick={() => {
            navigate("/payment");
            scrollTo(0, 0);
          }}
          className="w-full py-3 mt-6 bg-black text-white font-medium transition flex items-center justify-center gap-2 rounded"
        >
          <ArrowRightCircle size={18} /> Proceed to Checkout
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
