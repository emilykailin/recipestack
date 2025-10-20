"use client";

// app/recipes/6/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import '../../../app/globals.css';
import { useEffect, useState } from 'react';

export default function EarlGrayCookieRecipePage() {
  const [cookingMode, setCookingMode] = useState(false);
  let wakeLock: WakeLockSentinel | null = null;

  useEffect(() => {
    if (cookingMode && 'wakeLock' in navigator) {
      (async () => {
        try {
          wakeLock = await (navigator as any).wakeLock.request('screen');
        } catch (err) {
          console.error(`Wake Lock error:`, err);
        }
      })();
    }
    return () => {
      if (wakeLock) {
        wakeLock.release().catch(console.error);
        wakeLock = null;
      }
    };
  }, [cookingMode]);

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
          <form
  	    action="/recipes"
  	    method="GET"
  	    className="flex items-center w-full sm:w-auto"
	  >
  	  <input
    	    type="text"
    	    name="search"
    	    placeholder="Search recipes..."
    	    className="w-full sm:w-auto px-3 py-2 rounded-md border border-black bg-white placeholder-black text-sm"
  	  />
	</form>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Image
          src="/recipes/tofu-bagel.jpg"
          alt="Tofu Bagels"
          width={800}
          height={500}
          className="rounded-xl mb-8 w-full h-auto object-cover"
        />

        <h1 className="text-3xl font-bold mb-4 font-homemade text-center">Tofu Bagel Recipe</h1>
        <p className="italic text-center mb-4">
          Makes 4 large bagels
        </p>

        <div className="text-center mb-8">
          <button
            onClick={() => setCookingMode(!cookingMode)}
            className="px-6 py-3 bg-[#FFF0AB] text-black text-lg font-semibold rounded-md hover:opacity-90"
          >
            {cookingMode ? 'Exit Cooking Mode' : 'Enter Cooking Mode'}
          </button>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-2">Ingredients:</h2>
        <ul className="list-disc list-inside mb-6">
          <li>2½ cups all-purpose flour</li>
          <li>16 oz silken tofu</li>
          <li>2 tsp yeast</li>
	  <li>½ tsp salt</li>
	  <li>2 tsp baking soda</li>
          <li>1 tbsp honey</li>
          <li>Toppings of your choosing</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Steps:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Preheat your oven to 400℉ and grease a sheet pan.</li>
          <li>Heat the tofu in a bowl and add the yeast to it.</li>
          <li>Add the flour and salt to the tofu yeast mixture.</li>
          <li>Set a pot of water to boil and add the baking soda and honey to it.</li>
          <li>While your water is coming to a boil, knead the dough till smooth, divide into 4, and shape.</li>
          <li>Once your water has come to a boil, turn the heat down to keep the water on a simmer.</li>
	  <li>Gently place the bagels into the simmering water for 30 seconds each before removing and placing on the sheet pan.</li>
          <li>While letting your bagels rest on the sheet pan, sprinkle them with your preferred toppings (seseame seeds, everything but the bagel seasoning, poppy seeds, flaky salt, etc.).</li>
	  <li>After resting for 3 minutes, bake the bagels for 20 minutes.</li>
	  <li>Once out of the oven, let your bagels cool for 10 minutes before serving.</li>
        </ol>
      </section>
    </main>
  );
}
