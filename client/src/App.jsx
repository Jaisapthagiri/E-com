import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

import Navbar from "./components/Navbar";
import Login from "./components/Login";

import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import MyOrder from "./pages/MyOrder";
import Payment from "./pages/Payment";

const App = () => {
  const location = useLocation();
  const { showUserLogin, setShowUserLogin, user, loadingUser } = useAppContext();

  const isProtectedPath = ["/products", "/cart", "/my-orders", "/payment"].some(
    (path) => location.pathname.startsWith(path)
  );

  useEffect(() => {
    if (!loadingUser) {
      if (!user && isProtectedPath) {
        setShowUserLogin(true);
      } else {
        setShowUserLogin(false);
      }
    }
  }, [user, loadingUser, isProtectedPath, setShowUserLogin]);

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="no-scrollbar text-default min-h-screen text-gray-700 bg-white">
      {showUserLogin && <Login />}

      <Toaster />
      <Navbar />

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-6">
        <Routes>
          <Route path="/" element={<Home />} />

          {user ? (
            <>
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:category/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/my-orders" element={<MyOrder />} />
            </>
          ) : (
            <>
              <Route path="/products/*" element={<Navigate to="/" replace />} />
              <Route path="/cart" element={<Navigate to="/" replace />} />
              <Route path="/payment" element={<Navigate to="/" replace />} />
              <Route path="/my-orders" element={<Navigate to="/" replace />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
