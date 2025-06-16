import ProductPageClient from './ProductPageClient';

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

interface Props {
  params: { slug: string };
}

async function fetchProduct(slug: string): Promise<Product | null> {
  const res = await fetch(
    `https://sparkling-creativity-3a00661c57.strapiapp.com/api/products?filters[slug][$eq]=${slug}&populate[category]=true&populate[image]=true`,
    { cache: 'no-store' }
  );
  const json = await res.json();
  return json.data && json.data.length > 0 ? json.data[0] : null;
}

export default async function ProductPage({ params }: Props) {
  const product = await fetchProduct(params.slug);

  return <ProductPageClient product={product} />;
}