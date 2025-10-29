import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { ArrowLeft, CheckCircle } from "lucide-react";

const Payment = () => {
    const {
        cartItems,
        products,
        currency,
        getCartAmount,
        axios,
        setCartItems,
        navigate,
    } = useAppContext();

    const [cartArray, setCartArray] = useState([]);

    useEffect(() => {
        const tempArray = [];
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key);
            if (product) {
                product.quantity = cartItems[key];
                tempArray.push(product);
            }
        }
        setCartArray(tempArray);
    }, [cartItems, products]);

    const handleConfirmOrder = async () => {
        try {
            const items = cartArray.map((item) => ({
                product: item._id,
                quantity: item.quantity,
            }));

            const { data } = await axios.post("/api/order/place-cod", { items });

            if (data.success) {
                toast.success("Order confirmed successfully!");
                setCartItems({});
                await axios.post("/api/cart/update", { cartItems: {} });
                navigate("/my-orders");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to confirm order");
        }
    };

    return (
        <div className="mt-20 max-w-3xl mx-auto p-6 border rounded-lg shadow-sm bg-white">
            <h1 className="text-2xl font-semibold mb-4 text-center">🧾 Order Receipt</h1>
            <hr className="mb-4" />

            {cartArray.map((item) => (
                <div
                    key={item._id}
                    className="flex justify-between items-center border-b py-3 text-gray-700"
                >
                    <div className="flex items-center gap-3">
                        <img src={item.image[0]} alt={item.name} className="w-16 h-16 rounded object-cover" />
                        <p>{item.name}</p>
                    </div>
                    <p>
                        {currency}
                        {item.price * item.quantity}
                    </p>
                </div>
            ))}

            <div className="mt-6 space-y-2 text-gray-600">
                <p className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                        {currency}
                        {getCartAmount()}
                    </span>
                </p>
                <p className="flex justify-between">
                    <span>Tax (2%)</span>
                    <span>
                        {currency}
                        {(getCartAmount() * 0.02).toFixed(2)}
                    </span>
                </p>
                <p className="flex justify-between font-semibold text-lg mt-2">
                    <span>Total</span>
                    <span>
                        {currency}
                        {(getCartAmount() * 1.02).toFixed(2)}
                    </span>
                </p>
            </div>

            <div className="flex justify-between mt-8">
                <button
                    onClick={() => navigate("/cart")}
                    className="flex items-center gap-2 px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 transition"
                >
                    <ArrowLeft size={18} /> Back to Cart
                </button>

                <button
                    onClick={handleConfirmOrder}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    <CheckCircle size={18} /> Confirm Order
                </button>
            </div>
        </div>
    );
};

export default Payment;
