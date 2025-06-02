'use client';
import { Category } from './types';
import React, { RefObject, useEffect, useState } from 'react';

type Props = {
    categories: Category[];
    loading: boolean;
    scrollRef: RefObject<HTMLDivElement | null>;
    scrollLeft: () => void;
    scrollRight: () => void;
};

export default function CategoryScroll({
    categories,
    loading,
    scrollRef,
    scrollLeft,
    scrollRight,
}: Props) {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    const handleCategoryClick = (catId: number) => {
        setActiveCategory(catId);
        const element = document.getElementById(`cat-${catId}`);
        if (element) {
            const headerOffset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Update active category based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            // Find the current category in view
            for (const category of categories) {
                const element = document.getElementById(`cat-${category.id}`);
                if (element) {
                    const { top, bottom } = element.getBoundingClientRect();
                    if (top <= 120 && bottom >= 120) {
                        setActiveCategory(category.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [categories]);

    return (
        <div className="sticky top-16 z-40 w-full bg-gray-100 shadow-md shadow-red-300" style={{ height: '56px', minHeight: '56px', maxHeight: '56px' }}>
            {/* Scroll Left Button */}
            {!loading && categories.length > 0 && (
                <button
                    className="hidden lg:flex items-center justify-center absolute left-0 top-0 h-full px-2 z-10 bg-gray-100 hover:bg-red-100 transition-colors"
                    style={{ minWidth: '40px' }}
                    onClick={scrollLeft}
                    aria-label="Scroll left"
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}

            <div
                ref={scrollRef}
                className="flex h-full bg-transparent space-x-2 sm:space-x-4 px-1 sm:px-1 lg:px-5 mx-0 sm:mx-5 overflow-x-auto hide-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
            >
                {loading ? (
                    <span className='flex flex-col justify-center'>Loading categories...</span>
                ) : categories.length === 0 ? (
                    <span>No categories found.</span>
                ) : (
                    categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className={`relative flex items-center justify-center whitespace-nowrap text-md lg:text-xl xl:text-xl sm:text-base px-3 sm:px-3 py-1 sm:py-1 cursor-pointer transition-colors duration-200
                                ${activeCategory === cat.id ? 'bg-red-100' : 'bg-transparent'}
                                focus:outline-none hover:text-red-600
                            `}
                        >
                            {cat.name}
                            <span
                                className={`absolute left-0 bottom-0 w-full h-1 rounded-t transition-all duration-300
                                    ${activeCategory === cat.id ? 'bg-red-500 scale-x-100 opacity-100' : 'bg-red-500 scale-x-0 opacity-0'}
                                `}
                                style={{
                                    transformOrigin: 'center',
                                }}
                            />
                        </button>
                    ))
                )}
            </div>

            {/* Scroll Right Button */}
            {!loading && categories.length > 0 && (
                <button
                    className="hidden lg:flex items-center justify-center absolute right-0 top-0 h-full px-2 z-10 bg-gray-100 hover:bg-red-100 transition-colors"
                    style={{ minWidth: '40px' }}
                    onClick={scrollRight}
                    aria-label="Scroll right"
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}
        </div>
    );
}