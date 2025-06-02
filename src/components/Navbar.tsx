'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [cartCount] = useState(0);
    
    

    return (
        <nav className="fixed top-0 left-0 right-0 bg-orange-600 text-white" style={{ zIndex: 40 }}>
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left Section: Logo */}
                    <div className='flex flex-row gap-4'>
                        <Link href="/" className="flex-shrink-0">
                            <Image
                                src="/logo.png"
                                alt="Pizza Max"
                                width={65}
                                height={65}
                                className="object-contain"
                                priority
                            />
                        </Link>

                        {/* Middle Section: Delivery Location (hidden on mobile) */}
                        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs ml-8">
                            <div className="flex items-center cursor-pointer hover:opacity-80">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <div className="ml-2">
                                    <div className="text-sm font-medium">Deliver to</div>
                                    <div className="text-xs">Ghaziabad, Lahore</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Cart and Auth */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Mobile Location Icon */}
                        <button className="md:hidden p-2 hover:bg-[#d12609] rounded-full transition-colors">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                            </svg>
                        </button>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative p-2 hover:bg-orange-700 rounded-full transition-colors"
                        >
                            <ShoppingBag className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Sign In/Register - Desktop */}
                        <Link
                            href="/auth"
                            className="hidden md:flex bg-orange-600 hover:bg-orange-700 border border-white px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
                        >
                            Sign In / Register
                        </Link>

                        {/* Sign In/Register - Mobile */}
                        <Link
                            href="/auth"
                            className="md:hidden p-2 hover:bg-[#d12609] rounded-full transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
} 