'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { findMatchingRecipes, getAllUniqueIngredients, type Recipe } from '../data/recipes';

export default function IngredientMatcherPage() {
  const [userIngredients, setUserIngredients] = useState<string[]>([]);
  const [results, setResults] = useState<{
    canMake: Recipe[];
    partialMatch: Recipe[];
    missingIngredients: { recipe: Recipe; missing: string[] }[];
  } | null>(null);

  const allIngredients = getAllUniqueIngredients();

  const handleIngredientToggle = (ingredient: string) => {
    setUserIngredients(prev => {
      if (prev.includes(ingredient)) {
        return prev.filter(ing => ing !== ingredient);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  const handleFindRecipes = () => {
    if (userIngredients.length > 0) {
      const matchingResults = findMatchingRecipes(userIngredients);
      setResults(matchingResults);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Nav Bar */}
      <nav className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 bg-[#FFF7D1] gap-4">
        <Link href="/">
          <div className="text-xl font-bold font-homemade cursor-pointer">
            One More Loaf
          </div>
        </Link>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <Link href="/recipes" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 py-2 bg-[#FFF0AB] text-black rounded-md hover:opacity-80 text-sm sm:text-base">
              Find Recipes
            </button>
          </Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center font-homemade">
          Ingredient Matcher
        </h1>
        <p className="text-center mb-6 sm:mb-8 text-gray-600 text-sm sm:text-base px-2">
          Select the ingredients you have, and we'll find recipes you can make!
        </p>

        {/* Ingredient Selection Section */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Select Your Ingredients</h2>
          
          {/* Checkbox grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
            {allIngredients.map((ingredient) => (
              <label
                key={ingredient}
                className="flex items-center space-x-2 p-2 sm:p-3 rounded-md hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
              >
                <input
                  type="checkbox"
                  checked={userIngredients.includes(ingredient)}
                  onChange={() => handleIngredientToggle(ingredient)}
                  className="w-4 h-4 text-[#FFF0AB] bg-gray-100 border-gray-300 rounded focus:ring-[#FFF0AB] focus:ring-2 flex-shrink-0"
                />
                <span className="text-sm sm:text-base text-gray-700 capitalize">{ingredient}</span>
              </label>
            ))}
          </div>

          {/* Selected ingredients summary */}
          {userIngredients.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Selected {userIngredients.length} ingredient{userIngredients.length !== 1 ? 's' : ''}:
              </p>
              <div className="flex flex-wrap gap-2">
                {userIngredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-[#FFF0AB] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
                  >
                    <span className="truncate max-w-20 sm:max-w-none">{ingredient}</span>
                    <button
                      onClick={() => handleIngredientToggle(ingredient)}
                      className="text-gray-600 hover:text-red-500 flex-shrink-0"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleFindRecipes}
            disabled={userIngredients.length === 0}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#FFF0AB] text-black text-base sm:text-lg font-semibold rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Find Matching Recipes
          </button>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-8">
            {/* Can Make Section */}
            {results.canMake.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600">
                  You can make these recipes!
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.canMake.map((recipe) => (
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
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-center group-hover:underline">
                            {recipe.name}
                          </h3>
                          <p className="text-sm text-gray-600 text-center mt-1">
                            {recipe.difficulty} • {recipe.prepTime}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Partial Match Section */}
            {results.partialMatch.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-yellow-600">
                  Almost there! You're missing a few ingredients:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.partialMatch.map((recipe) => {
                    const missingInfo = results.missingIngredients.find(
                      item => item.recipe.id === recipe.id
                    );
                    return (
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
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-center mb-2 group-hover:underline">
                              {recipe.name}
                            </h3>
                            <p className="text-sm text-gray-600 text-center mb-2">
                              {recipe.difficulty} • {recipe.prepTime}
                            </p>
                            <div className="text-sm">
                              <p className="font-semibold text-yellow-600 mb-1">Missing:</p>
                              <div className="flex flex-wrap gap-1">
                                {missingInfo?.missing.map((ingredient, index) => (
                                  <span
                                    key={index}
                                    className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs"
                                  >
                                    {ingredient}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No matches */}
            {results.canMake.length === 0 && results.partialMatch.length === 0 && (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-600">
                  😔 No matching recipes found
                </h2>
                <p className="text-gray-500 mb-4">
                  Try adding more ingredients or check out our full recipe collection!
                </p>
                <Link href="/recipes">
                  <button className="px-6 py-3 bg-[#FFF0AB] text-black text-lg font-semibold rounded-md hover:opacity-90">
                    Browse All Recipes
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
} 