'use client';

import { useState } from 'react';
import Image from 'next/image';
import Select from '../../../components/slugcomponent/select';
import pizzaflavors from '../../../components/optionsdata/pizzaFlavorsData';
import crustoption from '../../../components/optionsdata/crustoptionData';
import softDrinkOptions from '../../../components/optionsdata/softdrinkOption';
import sauceOptions from '../../../components/optionsdata/sauceOption';
import { getDescriptionText } from '../utils';

interface Description {
  type: string;
  children: {
    text: string;
    type: string;
  }[];
}

interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
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
}

interface Product {
  id: number;
  documentId: string;
  title: string;
  price: number;
  description: Description[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category?: Category;
  image?: Image;
}

export default function ProductPageClient({ product }: { product: Product | null }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600">Product not found.</h2>
      </div>
    );
  }

  const imageUrl =
    product.image?.formats?.small?.url
      ? product.image.formats.small.url.startsWith('http')
        ? product.image.formats.small.url
        : `https://sparkling-creativity-3a00661c57.strapiapp.com${product.image.formats.small.url}`
      : product.image?.url
        ? product.image.url.startsWith('http')
          ? product.image.url
          : `https://sparkling-creativity-3a00661c57.strapiapp.com${product.image.url}`
        : '/placeholder.png';

  const totalPrice = product.price * quantity;

  return (
    <div className="min-h-[800px] min-w-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-2xl shadow-orange-500 overflow-hidden mx-6">
        <div className="flex flex-col lg:flex-row h-[90vh] lg:h-[650px]">
          {/* Left: Image */}
          <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-full flex-shrink-0">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2 hover:underline cursor-pointer">{product.title}</h1>
              <p className="text-base lg:text-lg text-white/90 line-clamp-2">{getDescriptionText(product.description)}</p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col flex-1 h-[50vh] lg:h-full relative">
            {/* Options */}
            <div className="flex-1 p-6 lg:p-8 overflow-y-auto hide-scrollbar">
              {((product.category?.slug === 'festival-deal') || (product.category?.slug === 'max-value-deals') || (product.category?.slug === '2b2b-deals')) && (
                <div className="space-y-4">
                  <Select selecttitle="Select Pizza Crust" options={crustoption} />
                  <Select selecttitle="Select Pizza Flavor" options={pizzaflavors} />
                  <Select selecttitle="Select Soft Drink" options={softDrinkOptions} />
                </div>
              )}
              {((product.category?.slug === 'royal-crown-pizza') || (product.category?.slug === 'beverages') || (product.category?.slug === 'appetizers') || (product.category?.slug === 'chicken-pizza') || (product.category?.slug === 'beef-veggie-pizza')) && (
                <div className="space-y-4">
                  <Select selecttitle="Select Soft Drink" options={softDrinkOptions} />
                </div>
              )}
              {((product.category?.slug === 'max-platter') || (product.category?.slug === 'promo-deals') || (product.category?.slug === 'lasagne-and-pasta')) && (
                <div className="space-y-4">
                  <Select selecttitle="Select Sauce" options={sauceOptions} />
                </div>
              )}
            </div>

            {/* Add to Cart Section */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 shadow-t-lg shadow-orange-300 p-2 lg:p-4 bg-white z-50">
              <div className="flex flex-col sm:flex-row items-center gap-2 lg:gap-4">
                <div className="flex items-center gap-3">
                  <button
                    className="w-8 h-8 lg:w-10 lg:h-10 text-white font-bold bg-orange-600 rounded-md hover:bg-black transition flex items-center justify-center text-xl cursor-pointer"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-md lg:text-lg font-bold px-6 lg:py-1 text-center rounded-md border hover:border-orange-500">{quantity}</span>
                  <button
                    className="w-8 h-8 lg:w-10 lg:h-10 text-white font-bold bg-orange-600 rounded-md hover:bg-black transition flex items-center justify-center text-xl cursor-pointer"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button className="flex-1 flex justify-between items-center w-full bg-orange-600 hover:bg-black text-white px-2 lg:px-6 py-1 lg:py-2 rounded-lg transition cursor-pointer">
                  <span className="text-md lg:text-lg font-bold">Rs. {totalPrice.toFixed(2)}</span>
                  <span className="text-md lg:text-lg font-bold">Add To Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}