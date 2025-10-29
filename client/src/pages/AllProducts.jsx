import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { X } from 'lucide-react';

const AllProducts = () => {
    const { products, searchQuery, fetchProducts } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        let updatedProducts = products;

        if (searchQuery.length > 0) {
            updatedProducts = updatedProducts.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(updatedProducts);
    }, [products, searchQuery]);

    return (
        <div className="mt-16 flex flex-col px-4 sm:px-6 lg:px-10">

            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-2xl font-semibold uppercase text-gray-800">
                        All Products
                    </p>
                    <div className="w-16 h-0.5 bg-primary rounded-full mt-1"></div>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                ) : (
                    <p className="text-gray-500">No products found.</p>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
