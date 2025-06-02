'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Banner {
    id: number;
    title: string;
    imageUrl: string;
}

// Sample banner data (you can replace this with your actual data)
const banners: Banner[] = [
    {
        id: 1,
        title: "Special Deal 1",
        imageUrl: "/baner-1.png"
    },
    {
        id: 2,
        title: "Special Deal 2",
        imageUrl: "/baner-2.png"
    },
    {
        id: 3,
        title: "Special Deal 3",
        imageUrl: "/baner-3.png"
    },
    {
        id: 4,
        title: "Special Deal 4",
        imageUrl: "/baner-4.png"
    },
    {
        id: 5,
        title: "Special Deal 5",
        imageUrl: "/baner-5.png"
    }
];

export default function BannerSlider() {
    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000); // Change banner every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const nextBanner = () => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
    };

    const prevBanner = () => {
        setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    };

    return (
        <div className="relative mt-16 bg-gray-100 overflow-hidden w-full">
            <div className="h-[170px] sm:h-[170px] md:h-[350px] lg:h-[400px] xl:h-[400px]">
                {/* Previous Button */}
                <button 
                    onClick={prevBanner}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-white rounded-r-3xl py-6 px-2 transition-all hidden sm:flex items-center justify-center bg-orange-500/20 hover:bg-orange-500/40"
                    aria-label="Previous banner"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Next Button */}
                <button 
                    onClick={nextBanner}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-white rounded-l-3xl py-6 px-2 transition-all hidden sm:flex items-center justify-center bg-orange-500/20 hover:bg-orange-500/40"
                    aria-label="Next banner"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div 
                    className="relative w-full h-full flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentBanner * 100}%)` }}
                >
                    {banners.map((banner, index) => (
                        <div 
                            key={banner.id}
                            className="min-w-full h-full flex-shrink-0"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={banner.imageUrl}
                                    alt={banner.title}
                                    fill
                                    className="object-cover object-center"
                                    priority={index === 0}
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
                                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{banner.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Navigation dots */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                                currentBanner === index ? 'bg-white scale-125' : 'bg-white/50'
                            }`}
                            onClick={() => setCurrentBanner(index)}
                            aria-label={`Go to banner ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
} 