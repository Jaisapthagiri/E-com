import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-blue-400 mt-20 to-blue-300 text-white pt-12  pb-6 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">FreshMart</h2>
          <p className="text-white/80 leading-relaxed">
            Your one-stop destination for fresh groceries and organic products.
            We deliver quality and freshness right to your doorstep. 🥦🍎
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-white/80">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/products" className="hover:text-white transition">Shop</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-white/80">
            <li><a href="/faq" className="hover:text-white transition">FAQs</a></li>
            <li><a href="/shipping" className="hover:text-white transition">Shipping & Returns</a></li>
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="bg-white text-green-600 p-2 rounded-full hover:bg-green-100 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-white text-green-600 p-2 rounded-full hover:bg-green-100 transition">
              <FaInstagram />
            </a>
            <a href="#" className="bg-white text-green-600 p-2 rounded-full hover:bg-green-100 transition">
              <FaTwitter />
            </a>
            <a href="#" className="bg-white text-green-600 p-2 rounded-full hover:bg-green-100 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-white/20"></div>

      {/* Bottom Section */}
      <div className="text-center text-white/80 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-white">FreshMart</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
