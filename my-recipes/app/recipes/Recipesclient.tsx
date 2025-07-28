'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const recipes = [
  {
    id: '1',
    name: 'Cheesecake',
    image: '/recipes/cheesecake.jpg',
  },
  {
    id: '2',
    name: 'Banana Bread',
    image: '/recipes/banana-bread.jpg',
  },
  {
    id: '3',
    name: 'Quick Sourdough',
    image: '/recipes/sourdough.jpg',
  },
  {
    id: '4',
    name: 'Matcha Chip Cookies',
    image: '/recipes/matcha-chip-cookie.jpeg',
  },
  {
    id: '5',
    name: 'Earl Gray Cookies',
    image: '/recipes/earl-gray-cookie.jpg',
  },
  {
    id: '6',
    name: 'Tofu Bagels',
    image: '/recipes/tofu-bagel.jpg',
  },
];

export default function Recipesclient() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group">
                <div className="overflow-hidden rounded-lg shadow-md">
                  <div className="relative w-full h-64">
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      fill
                      className="object-cover transition duration-300 group-hover:brightness-75"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-center group-hover:underline">
                      {recipe.name}
                    </h2>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No matching recipes found.
            </p>
          )}
    </div>
  );
}
