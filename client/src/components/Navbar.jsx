import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Search, ShoppingCart, Menu, User } from "lucide-react";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, logout } = useAppContext();

    const [userMenuOpen, setUserMenuOpen] = useState(false);


    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products");
        }
    }, [searchQuery]);

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to="/">
                <img
                    className="h-9"
                    src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                    alt="Ecom Logo"
                />
            </NavLink>

            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">All Products</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                    />
                    <Search className="w-4 h-4 text-gray-600" />
                </div>

                <div
                    onClick={() => navigate("/cart")}
                    className="relative cursor-pointer"
                >
                    <ShoppingCart className="w-6 opacity-80" />
                    <button className="absolute -top-2 -right-3 text-xs text-black bg-primary w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </button>
                </div>

                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-black rounded-full"
                    >
                        Login
                    </button>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="flex items-center justify-center w-8 h-8 text-gray-700 hover:bg-gray-100 rounded-full transition"
                        >
                            <User className="w-6 h-6" />
                        </button>

                        {userMenuOpen && (
                            <ul className="absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-40">
                                <li
                                    onClick={() => {
                                        navigate("/my-orders");
                                        setUserMenuOpen(false);
                                    }}
                                    className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                                >
                                    My Orders
                                </li>
                                <li
                                    onClick={() => {
                                        logout();
                                        setUserMenuOpen(false);
                                    }}
                                    className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                                >
                                    Logout
                                </li>
                            </ul>
                        )}
                    </div>

                )}
            </div>

            <div className="flex items-center gap-4 sm:hidden">
                <div
                    onClick={() => navigate("/cart")}
                    className="relative cursor-pointer"
                >
                    <ShoppingCart className="w-6 opacity-80" />
                    <button className="absolute -top-2 -right-3 text-xs text-black bg-primary w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </button>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                    className="sm:hidden"
                >
                    <Menu className="w-6 h-6 text-gray-700 cursor-pointer" />
                </button>
            </div>

            {open && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 px-6 flex flex-col gap-4 text-sm z-50 border-t border-gray-200 md:hidden">
                    <NavLink
                        to="/"
                        onClick={() => setOpen(false)}
                        className="hover:text-primary"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        onClick={() => setOpen(false)}
                        className="hover:text-primary"
                    >
                        All Products
                    </NavLink>
                    {user && (
                        <NavLink
                            to="/my-orders"
                            onClick={() => setOpen(false)}
                            className="hover:text-primary"
                        >
                            My Orders
                        </NavLink>
                    )}


                    {!user ? (
                        <button
                            onClick={() => {
                                setOpen(false);
                                setShowUserLogin(true);
                            }}
                            className="mt-3 px-4 py-2 bg-primary text-black rounded-full hover:bg-primary-dull transition cursor-pointer"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={logout}
                            className="mt-3 px-4 py-2 bg-primary text-black rounded-full hover:bg-primary-dull transition cursor-pointer"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
