'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { findMatchingRecipes, getIngredientSuggestions, type Recipe } from '../data/recipes';

export default function IngredientMatcherPage() {
  const [userIngredients, setUserIngredients] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [results, setResults] = useState<{
    canMake: Recipe[];
    partialMatch: Recipe[];
    missingIngredients: { recipe: Recipe; missing: string[] }[];
  } | null>(null);

  useEffect(() => {
    if (currentInput.trim()) {
      const newSuggestions = getIngredientSuggestions(currentInput);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [currentInput]);

  const handleAddIngredient = (ingredient: string) => {
    const trimmedIngredient = ingredient.trim();
    if (trimmedIngredient && !userIngredients.includes(trimmedIngredient)) {
      setUserIngredients([...userIngredients, trimmedIngredient]);
      setCurrentInput('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setUserIngredients(userIngredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const handleFindRecipes = () => {
    if (userIngredients.length > 0) {
      const matchingResults = findMatchingRecipes(userIngredients);
      setResults(matchingResults);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      handleAddIngredient(currentInput);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Nav Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-[#FFF7D1]">
        <Link href="/">
          <div className="text-xl font-bold font-homemade cursor-pointer">
            Recipe Stack
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/recipes">
            <button className="px-4 py-2 bg-[#FFF0AB] text-black rounded-md hover:opacity-80">
              Find Recipes
            </button>
          </Link>
          <Link href="/ingredient-matcher">
            <button className="px-4 py-2 bg-[#FFF0AB] text-black rounded-md hover:opacity-80">
              Recipe Matcher
            </button>
          </Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center font-homemade">
          Recipe Matcher
        </h1>
        <p className="text-center mb-8 text-gray-600">
          Enter the ingredients you have, and we'll find recipes you can make!
        </p>

        {/* Ingredient Input Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Ingredients</h2>
          
          {/* Input with suggestions */}
          <div className="relative mb-4">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type an ingredient (e.g., flour, eggs, butter)..."
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFF0AB]"
            />
            
            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddIngredient(suggestion)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Current ingredients */}
          <div className="flex flex-wrap gap-2 mb-4">
            {userIngredients.map((ingredient, index) => (
              <span
                key={index}
                className="bg-[#FFF0AB] px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {ingredient}
                <button
                  onClick={() => handleRemoveIngredient(ingredient)}
                  className="text-gray-600 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={handleFindRecipes}
            disabled={userIngredients.length === 0}
            className="px-6 py-3 bg-[#FFF0AB] text-black text-lg font-semibold rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  🎉 You can make these recipes!
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.canMake.map((recipe) => (
                    <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group">
                      <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="relative w-full h-48">
                          <Image
                            src={recipe.image}
                            alt={recipe.name}
                            fill
                            className="object-cover transition duration-300 group-hover:brightness-75"
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
                  🔍 Almost there! You're missing a few ingredients:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.partialMatch.map((recipe) => {
                    const missingInfo = results.missingIngredients.find(
                      item => item.recipe.id === recipe.id
                    );
                    return (
                      <div key={recipe.id} className="overflow-hidden rounded-lg shadow-md">
                        <div className="relative w-full h-48">
                          <Image
                            src={recipe.image}
                            alt={recipe.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-center mb-2">
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