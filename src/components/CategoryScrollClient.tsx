'use client';
import { useRef } from 'react';
import CategoryScroll from './CategoryScroll';
import { Category } from './types';

export default function CategoryScrollClient({ categories }: { categories: Category[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <CategoryScroll
      categories={categories}
      loading={false}
      scrollRef={scrollRef}
      scrollLeft={scrollLeft}
      scrollRight={scrollRight}
    />
  );
}