'use client';
import React from 'react';
import { Product, Category } from './types';
import ProductGrid from './ProductGrid';

export default function SearchAndGrid({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="w-full max-w-7xl px-5 mt-4 group">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 focus:outline-none placeholder:text-red-600"
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 absolute left-2 top-1/2 transform -translate-y-1/2 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="w-full h-[2px] block transition-all duration-300 bg-gray-300 group-hover:bg-gray-500 group-focus-within:bg-red-500 group-focus-within:group-hover:bg-red-500 origin-center scale-x-100 group-hover:scale-x-100 group-focus-within:scale-x-100"></div>
      </div>
      <div className="w-full flex flex-col items-center justify-center pt-6 px-2 sm:px-4 bg-gray-100">
        <ProductGrid products={filteredProducts} categories={categories} />
      </div>
    </>
  );
}