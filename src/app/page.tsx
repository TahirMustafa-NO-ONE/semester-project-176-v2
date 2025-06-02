'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Category, Product } from '../components/types';
import CategoryScroll from '../components/CategoryScroll';
import ProductGrid from '../components/ProductGrid';
import LoadingSpinner from '@/components/LoadingSpinner';


interface ApiProduct {
  id: number;
  title: string;
  slug: string;
  description: {
    type: string;
    children: {
      text: string;
      type: string;
    }[];
  }[];
  price: number;
  image: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: Record<string, unknown> | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  category: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export default function Menu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://sparkling-creativity-3a00661c57.strapiapp.com/api/products?populate[category]=true&populate[image]=true');
        const json = await res.json();
        console.log(json.data);

        if (Array.isArray(json.data) && json.data.length > 0) {
          // Extract products
          const prodData = json.data.map((item: ApiProduct) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            description: item.description,
            price: item.price,
            image: item.image,
            category: item.category,
          }));
          setProducts(prodData);

          // Extract categories
          const catMap = new Map<number, Category>();
          json.data.forEach((item: ApiProduct) => {
            const cat = item.category;
            if (cat && !catMap.has(cat.id)) {
              catMap.set(cat.id, {
                id: cat.id,
                documentId: cat.documentId,
                name: cat.name,
                slug: cat.slug,
                description: cat.description,
                createdAt: cat.createdAt,
                updatedAt: cat.updatedAt,
                publishedAt: cat.publishedAt,
              });
            }
          });
          setCategories(Array.from(catMap.values()));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      {loading ? (
        <LoadingSpinner message="Loading menu items..." fullScreen={true} />
      ) : (
        <>
          

          <CategoryScroll
            categories={categories}
            loading={loading}
            scrollRef={scrollRef}
            scrollLeft={scrollLeft}
            scrollRight={scrollRight}
          />
          {/* Search Bar */}
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
      )}
    </div>
  );
}