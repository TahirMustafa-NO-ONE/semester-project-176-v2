'use client';
import Image from 'next/image';
import { Product } from './types';
import Link from 'next/link';
import { useState } from 'react';
import base64Image from './base64blurimg';

interface Description {
    type: string;
    children: {
        text: string;
        type: string;
    }[];
}

function getDescriptionText(desc: Description[]): string {
    if (!Array.isArray(desc)) return '';
    return desc
        .map((block) =>
            Array.isArray(block.children)
                ? block.children.map((child) => child.text).join(' ')
                : ''
        )
        .join(' ');
}

export default function ProductCard({ product }: { product: Product }) {
    const [isImageLoading, setImageLoading] = useState(true);

    const imageUrl =
        product.image?.formats?.small?.url
            ? product.image.formats.small.url.startsWith('http')
                ? product.image.formats.small.url
                : `https://sparkling-creativity-3a00661c57.strapiapp.com${product.image.formats.small.url}`
            : product.image?.url
                ? product.image.url.startsWith('http')
                    ? product.image.url
                    : `https://sparkling-creativity-3a00661c57.strapiapp.com${product.image.url}`
                : '/blur-img.png';

    return (
        <Link
            href={`/products/${product.slug}`}
            scroll={false}
            prefetch={false}
            className="block"
        >
            <div className="flex flex-row w-full max-w-[600px] h-auto rounded-xl shadow-md bg-white shadow-red-200 hover:shadow-xl hover:shadow-red-500 transition overflow-hidden cursor-pointer transform hover:-translate-y-2 ease-in-out duration-200">
                {/* Image Section with Fixed Width */}
                <div className="relative min-w-[100px] max-w-[100px] aspect-square m-2 sm:min-w-[160px] sm:max-w-[160px]">
                    <div className="w-full h-full relative overflow-hidden rounded-2xl">
                        {isImageLoading && (
                            <div className="absolute inset-0 shimmer z-10 rounded-2xl" />
                        )}
                        <Image
                            src={imageUrl}
                            alt={product.title}
                            width={100}
                            height={100}
                            className="object-cover rounded-2xl sm:w-[160px] sm:h-[176px]"
                            placeholder="blur"
                            blurDataURL={base64Image}
                            priority
                            onLoadingComplete={() => setImageLoading(false)}
                        />
                    </div>
                </div>

                {/* Right Content Section */}
                <div className="flex flex-col justify-between py-2 px-1 flex-1 relative">
                    <div>
                        <h3 className="text-md md:text-lg lg:text-xl xl:text-xl font-bold text-black line-clamp-1">{product.title}</h3>
                        <p className="text-sm md:text-md lg:text-base xl:text-base text-gray-600 line-clamp-1 md:line-clamp-1 lg:line-clamp-2 xl:line-clamp-2">
                            {getDescriptionText(product.description)}
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-between gap-1">
                        <span className="bg-black text-white text-xs md:text-xs lg:text-lg xl:text-lg font-bold px-3 py-1 rounded-xl">
                            Rs. {product.price.toFixed(2)}
                        </span>
                        <button 
                            className="bg-red-600 hover:bg-black transition-colors ease-in-out text-white text-xs md:text-xs lg:text-lg xl:text-lg px-3 py-1 rounded-xl font-semibold cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                // Add to cart logic here
                            }}
                        >
                            Add To Cart
                        </button>
                    </div>

                    <button
                        className="absolute bottom-1 right-1 p-2 cursor-pointer"
                        aria-label="Add to favorites"
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            // Add to favorites logic here
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-red-600 hover:fill-red-600 transition-colors ease-in-out cursor-pointer"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 3.75a5.25 5.25 0 00-4.5 2.472A5.25 5.25 0 007.5 3.75 5.25 5.25 0 003 9c0 7.25 9 11.25 9 11.25s9-4 9-11.25a5.25 5.25 0 00-5.25-5.25z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Shimmer Animation CSS */}
            <style jsx>{`
                .shimmer {
                    background: linear-gradient(
                        90deg,
                        rgba(226, 153, 153, 0) 0%,
                        rgba(226, 153, 153, 0.8) 50%,
                        rgba(226, 153, 153, 0) 100%
                    );
                    animation: shimmer 1.5s infinite;
                }

                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </Link>
    );
}
