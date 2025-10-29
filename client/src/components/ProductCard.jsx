import { useAppContext } from "../context/AppContext";
import { Star, StarOff, ShoppingCart } from "lucide-react"; 

const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    return product && (
        <div
            onClick={() => {
                navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                scrollTo(0, 0);
            }}
            className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2  w-full"
        >
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img
                    className="group-hover:scale-105 transition max-w-26 md:max-w-36"
                    src={product.image[0]}
                    alt={product.name}
                />
            </div>

            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">
                    {product.name}
                </p>

                <div className="flex items-center gap-0.5">
                    {Array(5)
                        .fill("")
                        .map((_, i) =>
                            i < 4 ? (
                                <Star key={i} size={14} fill="gold" stroke="gold" />
                            ) : (
                                <StarOff key={i} size={14} />
                            )
                        )}
                    <p className="ml-1 text-gray-600 text-xs">(4)</p>
                </div>

                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                        {currency}{product.price}
                    </p>

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="text-primary"
                    >
                        {!cartItems[product._id] ? (
                            <button
                                className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-20 w-16 h-[34px] rounded cursor-pointer"
                                onClick={() => addToCart(product._id)}
                            >
                                <ShoppingCart size={16} />
                                <span className="text-sm">Add</span>
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                <button
                                    onClick={() => removeFromCart(product._id)}
                                    className="cursor-pointer text-md px-2 h-full"
                                >
                                    -
                                </button>
                                <span className="w-5 text-center">
                                    {cartItems[product._id]}
                                </span>
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
        </div>
    );
};

export default ProductCard;
