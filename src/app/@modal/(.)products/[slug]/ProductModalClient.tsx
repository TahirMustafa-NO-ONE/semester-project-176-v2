'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Select from '../../../../components/slugcomponent/select';
import pizzaflavors from '../../../../components/optionsdata/pizzaFlavorsData';
import crustoption from '../../../../components/optionsdata/crustoptionData';
import softDrinkOptions from '../../../../components/optionsdata/softdrinkOption';
import sauceOptions from '../../../../components/optionsdata/sauceOption';
import { getDescriptionText } from '../../../products/utils';

interface Description {
  type: string;
  children: {
    text: string;
    type: string;
  }[];
}

interface Product {
  id: number;
  title: string;
  slug: string;
  description: Description[];
  price: number;
  image: {
    formats?: {
      small?: {
        url: string;
      };
    };
    url: string;
  };
  category: {
    name: string;
    slug: string;
  };
}

export default function ProductModalClient({ product }: { product: Product | null }) {
  const [isOpen, setIsOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const loading = !product;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      router.back();
    }
  };

  const LoadingContent = () => (
    <DialogHeader className="w-full h-full">
      <div className="flex flex-col lg:flex-row w-full h-full">
        <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-[600px] flex-shrink-0 bg-gray-100 animate-pulse">
          <div className="absolute bottom-0 p-4 lg:p-6 w-full">
            <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex flex-col flex-1 lg:h-[600px] relative p-4 lg:p-8">
          <DialogTitle className="sr-only">Loading Product Details</DialogTitle>
          <div className="animate-pulse space-y-4 flex-1">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="fixed lg:absolute bottom-0 left-0 right-0 border-t border-gray-200 p-2 lg:p-4 bg-white">
            <div className="flex justify-between items-center">
              <div className="h-10 bg-gray-200 rounded w-32"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </DialogHeader>
  );

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange} modal>
        <DialogContent className="sm:max-w-[1000px] lg:max-w-[1200px] p-0 overflow-hidden bg-white rounded-xl w-full h-[95vh] lg:h-auto">
          <LoadingContent />
        </DialogContent>
      </Dialog>
    );
  }

  if (!product) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange} modal>
        <DialogContent className="sm:max-w-[1000px] lg:max-w-[1200px] p-0 overflow-hidden bg-white rounded-xl w-full h-[95vh] lg:h-auto">
          <DialogHeader className="w-full h-full flex items-center justify-center">
            <span className="text-lg text-red-600 font-bold">Product not found.</span>
          </DialogHeader>
        </DialogContent>
      </Dialog>
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
    <Dialog open={isOpen} onOpenChange={handleOpenChange} modal>
      <DialogContent className="sm:max-w-[1000px] lg:max-w-[1200px] p-0 overflow-hidden bg-white rounded-xl w-full h-[95vh] lg:h-auto">
        <DialogHeader className="w-full h-full">
          <div className="flex flex-col lg:flex-row w-full h-full">
            {/* Left: Image + Promo */}
            <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-[600px] flex-shrink-0">
              <div className="absolute inset-0 bg-gray-100" />
              <Image
                src={imageUrl}
                alt={product.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              <div className="absolute bottom-0 p-4 lg:p-6 text-white">
                <DialogTitle className="text-xl lg:text-3xl font-bold mb-2 hover:underline cursor-pointer">
                  {product.title}
                </DialogTitle>
                <DialogDescription className="text-sm lg:text-base text-white/80 line-clamp-2 lg:line-clamp-2">
                  {getDescriptionText(product.description)}
                </DialogDescription>
              </div>
            </div>

            {/* Right: Options */}
            <div className="flex flex-col flex-1 lg:h-[600px] relative">
              {/* Scrollable Options Section */}
              <div className="flex-1 min-h-0 pb-[80px] lg:pb-0">
                <div className="h-full p-4 lg:p-8 overflow-y-auto hide-scrollbar">
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
              </div>

              {/* Fixed Add to Cart Bar */}
              <div className="fixed lg:absolute bottom-0 left-0 right-0 border-t-2 border-gray-300 p-2 lg:p-4 bg-white z-50">
                <div className="flex flex-col sm:flex-row items-center gap-2 lg:gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      className="w-8 h-8 lg:w-10 lg:h-10 text-white font-bold bg-orange-600 rounded-md hover:bg-black transition ease-in-out flex items-center justify-center text-xl cursor-pointer"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="text-md lg:text-lg font-bold px-6 lg:py-1 text-center rounded-md border hover:border-orange-500">{quantity}</span>
                    <button
                      className="w-8 h-8 lg:w-10 lg:h-10 text-white font-bold bg-orange-600 rounded-md hover:bg-black transition ease-in-out flex items-center justify-center text-xl cursor-pointer"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button className="flex-1 flex justify-between items-center w-full bg-orange-600 hover:bg-black text-white px-2 lg:px-6 py-1 lg:py-2 rounded-lg transition ease-in-out cursor-pointer">
                    <span className="text-md lg:text-lg font-bold">Rs. {totalPrice.toFixed(2)}</span>
                    <span className="text-md lg:text-lg font-bold">Add To Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}