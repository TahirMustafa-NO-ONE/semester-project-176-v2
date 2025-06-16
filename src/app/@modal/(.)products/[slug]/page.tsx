import ProductModalClient from './ProductModalClient';

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

async function fetchProduct(slug: string): Promise<Product | null> {
  const res = await fetch(
    `https://sparkling-creativity-3a00661c57.strapiapp.com/api/products?filters[slug][$eq]=${slug}&populate[category]=true&populate[image]=true`,
    { cache: 'no-store' }
  );
  const json = await res.json();
  return json.data && json.data.length > 0 ? json.data[0] : null;
}

export default async function ProductModalPage({ params }: { params: { slug: string } }) {
  const product = await fetchProduct(params.slug);

  return <ProductModalClient product={product} />;
}