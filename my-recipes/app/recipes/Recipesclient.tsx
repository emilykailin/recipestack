'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { recipes } from '../data/recipes';

export default function Recipesclient() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group">
                <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative w-full">
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover transition duration-300 group-hover:brightness-75"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h2 className="text-base sm:text-lg font-semibold text-center group-hover:underline">
                      {recipe.name}
                    </h2>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 text-sm sm:text-base">
              No matching recipes found.
            </p>
          )}
    </div>
  );
}
