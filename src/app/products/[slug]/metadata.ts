import { getDescriptionText } from '../utils';
import type { Metadata } from 'next';

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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const res = await fetch(
    `https://sparkling-creativity-3a00661c57.strapiapp.com/api/products?filters[slug][$eq]=${params.slug}&populate[category]=true&populate[image]=true`
  );
  const json = await res.json();
  const product: Product | null = json.data && json.data.length > 0 ? json.data[0] : null;

  const title = product?.title || 'Product | Pizza Max';
  const description = product?.description
    ? getDescriptionText(product.description)
    : 'View product details, deals, and more!';
  const imageUrl =
    product?.image?.formats?.small?.url
      ? product.image.formats.small.url.startsWith('http')
        ? product.image.formats.small.url
        : `https://sparkling-creativity-3a00661c57.strapiapp.com${product.image.formats.small.url}`
      : product?.image?.url
        ? product.image.url.startsWith('http')
          ? product.image.url
          : `https://sparkling-creativity-3a00661c57.strapiapp.com${product.image.url}`
        : 'https://sparkling-creativity-3a00661c57.media.strapiapp.com/Festive_Deal_Large_3d16d78751.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://semester-project-176-v2.vercel.app/products/${params.slug}`,
      siteName: 'Pizza Max',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}