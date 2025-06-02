'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-white mt-8 pt-8 pb-4">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 border-b-2 border-orange-500 pb-10">
                    {/* Logo and Contact Section */}
                    <div className="flex flex-col space-y-4">
                        <Image
                            src="/logo.png"
                            alt="Pizza Max"
                            width={120}
                            height={120}
                            className="object-contain lg:w-[160px] lg:h-[160px]"
                        />
                    </div>
                    <div className='lg:pr-20'>
                        <div className="space-y-2">
                            <p className="text-gray-600">
                                <span className="font-semibold text-black">Phone:</span>{" "}
                                <a href="tel:04211629111" className="hover:text-orange-500">04211629111</a>
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold text-black">Email:</span>{" "}
                                <a href="mailto:care@pizzamax.com.pk" className="hover:text-orange-500">care@pizzamax.com.pk</a>
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold text-black">Address:</span>{" "}
                                <span className="text-gray-500">Pizza Max - Bahria Town, J-1 G.F Shop 1 Gulbahar Near Talwar Chowk Corner Building, Bahria Town Lahore, Lahore</span>
                            </p>
                        </div>
                        <div className="flex justify-center space-x-4 mt-8">
                            <a href="https://play.google.com/store/apps/details?id=com.pizzamax" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                                <Image
                                    src="/playstore.png"
                                    alt="Get it on Google Play"
                                    width={140}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="https://apps.apple.com/app/pizzamax" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                                <Image
                                    src="/appstore.png"
                                    alt="Download on the App Store"
                                    width={130}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                        </div>
                    </div>
                    {/* Timings Section */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-xl font-semibold">Our Timings</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Monday - Sunday</span>
                            <span className="text-gray-500">11:00 AM - 04:55 AM</span>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <h3 className="text-xl font-semibold">Follow Us:</h3>
                            <div className="flex space-x-4">
                                <a href="https://facebook.com/pizzamax" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                                    <Image
                                        src="/facebook.png"
                                        alt="Facebook"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                        unoptimized
                                    />
                                </a>
                                <a href="https://instagram.com/pizzamax" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                                    <Image
                                        src="/instagram.png"
                                        alt="Instagram"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                        unoptimized
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row space-y-2 space-x-5">
                        <Link href="/privacy-policy" className="text-gray-600 hover:text-orange-500">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-of-use" className="text-gray-600 hover:text-orange-500">
                            Terms of Use
                        </Link>
                        <Link href="/faqs" className="text-gray-600 hover:text-orange-500">
                            FAQs
                        </Link>
                        <Link href="/sitemap" className="text-gray-600 hover:text-orange-500">
                            Sitemap
                        </Link>
                    </div>
                    </div>

                    {/* Links Section */}
                    
                </div>

                {/* App Store Links */}


                {/* Copyright */}
                <div className="pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
                    <p>© 2025 Powered by{" "}
                        <a href="https://blink.co" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
                            Tahir Mustafa co.
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
} 