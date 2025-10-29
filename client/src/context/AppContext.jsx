import React, { useEffect, useContext, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../api/axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [myOrders, setMyOrders] = useState([]);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoadingUser(false);
                return;
            }

            const { data } = await axios.get("/api/user/is-auth", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.success && data.user) {
                setUser(data.user);
                setCartItems(data.user.cartItems || {});
            } else {
                localStorage.removeItem("token");
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed:", error.message);
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoadingUser(false);
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem("token");
            setUser(null);
            setCartItems({});
            toast.success("Logged out successfully");
            navigate("/");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/api/product/list");
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const addToCart = async (itemId) => {
        try {
            let cartData = structuredClone(cartItems);
            cartData[itemId] = (cartData[itemId] || 0) + 1;
            setCartItems(cartData);

            if (user) {
                await axios.post("/api/cart/update", { cartItems: cartData });
            }

            toast.success("Added to Cart");
        } catch (error) {
            toast.error("Failed to add to cart");
        }
    };

    const updateCartItem = async (itemId, quantity) => {
        try {
            let cartData = structuredClone(cartItems);
            cartData[itemId] = quantity;
            setCartItems(cartData);

            if (user) {
                await axios.post("/api/cart/update", { cartItems: cartData });
            }

            toast.success("Cart Updated");
        } catch (error) {
            toast.error("Failed to update cart");
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            let cartData = structuredClone(cartItems);
            if (cartData[itemId]) {
                cartData[itemId] -= 1;
                if (cartData[itemId] === 0) delete cartData[itemId];
            }
            setCartItems(cartData);

            if (user) {
                await axios.post("/api/cart/update", { cartItems: cartData });
            }

            toast.success("Removed from Cart");
        } catch (error) {
            toast.error("Failed to remove from cart");
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo && cartItems[itemId] > 0) {
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };

    const fetchMyOrders = async () => {
        try {
            const { data } = await axios.get("/api/order/user");
            if (data.success) setMyOrders(data.orders);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser();
        }else{
            setLoadingUser(false)
        }
        fetchProducts();
    }, []);

    useEffect(() => {
        if (!user) setCartItems({});
    }, [user]);

    const value = {
        currency,
        navigate,
        user,
        setUser,
        showUserLogin,
        setShowUserLogin,
        products,
        setProducts,
        cartItems,
        setCartItems,
        searchQuery,
        setSearchQuery,
        fetchUser, loadingUser, setLoadingUser,
        fetchProducts,
        addToCart,
        removeFromCart,
        myOrders,
        setMyOrders,
        getCartAmount,
        getCartCount,
        fetchMyOrders,
        updateCartItem,
        logout,
        axios,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
