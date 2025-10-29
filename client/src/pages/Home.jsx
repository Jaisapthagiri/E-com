import React from "react";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-pink-100 via-white to-blue-100">

      <section
        className="relative bg-cover  h-[80vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-purple-500/40 via-pink-400/30 to-blue-500/40"></div>
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-4">
            Elevate Your Shopping Experience
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-6">
            Discover amazing products at unbeatable prices.
          </p>
          <NavLink
            to="/products"
            className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-full hover:bg-purple-100 transition-all shadow-md"
          >
            Shop Now
          </NavLink>
        </div>
      </section>

      <section className="py-20 px-8 md:px-16 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">
          Explore Our Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            {
              name: "Men's Fashion",
              img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Women's Collection",
              img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Accessories",
              img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
            }
          ].map((category, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer transform hover:scale-105 transition-transform duration-500"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-6">
                <h3 className="text-white text-2xl font-semibold drop-shadow-md">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-linear-to-r from-purple-600 to-blue-500 text-white py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          New Season, New Style ✨
        </h2>
        <p className="text-white/90 mb-6 text-lg">
          Get ready to explore the latest arrivals and exclusive discounts.
        </p>
        <button className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-full hover:bg-purple-100 transition-all shadow-md">
          Explore Now
        </button>
      </section>

      <Footer />
    </div>

  );
};

export default Home;
