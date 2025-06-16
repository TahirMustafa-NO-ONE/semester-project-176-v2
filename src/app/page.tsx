import { Category, Product } from '../components/types';
import CategoryScrollClient from '../components/CategoryScrollClient';
import SearchAndGrid from '../components/SearchAndGrid';
import type { Metadata } from 'next';

// --- Add this metadata export ---
export const metadata: Metadata = {
  title: 'Menu | Pizza Max',
  description: 'Browse our delicious pizza menu, deals, and more!',
  openGraph: {
    title: 'Menu | Pizza Max',
    description: 'Browse our delicious pizza menu, deals, and more!',
    url: 'https://semester-project-176-v2.vercel.app/',
    siteName: 'Pizza Max',
    images: [
      {
        url: 'https://sparkling-creativity-3a00661c57.media.strapiapp.com/Festive_Deal_Large_3d16d78751.png',
        width: 800,
        height: 600,
        alt: 'Pizza Menu',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Menu | Pizza Max',
    description: 'Browse our delicious pizza menu, deals, and more!',
    images: [
      'https://sparkling-creativity-3a00661c57.media.strapiapp.com/Festive_Deal_Large_3d16d78751.png',
    ],
  },
};
// --- End metadata export ---

async function fetchProductsAndCategories() {
  try {
    const res = await fetch(
      'https://sparkling-creativity-3a00661c57.strapiapp.com/api/products?populate[category]=true&populate[image]=true',
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) throw new Error('Failed to fetch data');
    const json = await res.json();

    let products: Product[] = [];
    let categories: Category[] = [];

    // ...existing code...

    if (Array.isArray(json.data) && json.data.length > 0) {
      products = json.data.map((item: Product) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        description: item.description,
        price: item.price,
        image: item.image,
        category: item.category,
        documentId: item.documentId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
      }));

      const catMap = new Map<number, Category>();
      json.data.forEach((item: { category: Category }) => {
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
      categories = Array.from(catMap.values());
    }

    // ...existing code...

    return { products, categories, error: null };
  } catch (error) {
    return { products: [], categories: [], error: (error as Error).message };
  }
}

export default async function Menu() {
  const { products, categories, error } = await fetchProductsAndCategories();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 font-bold text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <CategoryScrollClient categories={categories} />
      <SearchAndGrid products={products} categories={categories} />
       </div>
  );
}