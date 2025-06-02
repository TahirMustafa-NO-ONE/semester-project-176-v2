'use client';
import { Product, Category } from './types';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
  categories: Category[];
};

export default function ProductGrid({ products, categories }: Props) {
  return (
    <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-16 px-5">
      {categories.length === 0 ? (
        <p className="text-gray-500 col-span-full text-center">
          No categories found.
        </p>
      ) : (
        categories.map((cat) => {
          const catProducts = products.filter((p) => p.category?.id === cat.id);
          if (catProducts.length === 0) return null;
          
          return (
            <div key={cat.id} className="contents">
              <h2 id={`cat-${cat.id}`} className="col-span-full underline text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-black mb-4 mt-8 pt-4 text-left border-t border-gray-200 first:border-t-0 first:mt-4 cursor-pointer">
                {cat.name}
              </h2>
              {catProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}