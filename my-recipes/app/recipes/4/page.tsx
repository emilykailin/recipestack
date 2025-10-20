"use client";

// app/recipes/4/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import '../../../app/globals.css';
import { useEffect, useState } from 'react';

export default function MatchaChipCookieRecipePage() {
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
      <nav className="flex items-center justify-between px-6 py-4 bg-[#FFF7D1]">
        <Link href="/">
          <div className="text-xl font-bold font-homemade cursor-pointer">
            One More Loaf
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/recipes">
            <button className="px-4 py-2 bg-[#FFF0AB] text-black rounded-md hover:opacity-80">
              Find Recipes
            </button>
          </Link>
          <form
  	    action="/recipes"
  	    method="GET"
  	    className="flex items-center"
	  >
  	  <input
    	    type="text"
    	    name="search"
    	    placeholder="Search recipes..."
    	    className="px-3 py-2 rounded-md border border-black bg-white placeholder-black"
  	  />
	</form>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 py-10">
        <Image
          src="/recipes/matcha-chip-cookie.jpeg"
          alt="Matcha Chip Cookie"
          width={800}
          height={500}
          className="rounded-xl mb-8 w-full h-auto object-cover"
        />

        <h1 className="text-3xl font-bold mb-4 font-homemade text-center">Matcha White Chocolate Chip Cookie Recipe</h1>
        <p className="italic text-center mb-4">
          Makes one dozen cookies
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
          <li>1¾ cups all-purpose flour</li>
          <li>½ cup white sugar</li>
          <li>1 cup brown sugar</li>
          <li>¾ cup salted butter</li>
	  <li>1 tsp baking soda</li>
	  <li>½ tsp salt</li>
	  <li>1 tsp vanilla extract</li>
	  <li>¼ cup matcha powder</li>
	  <li>1 cup white chocolate chips</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Steps:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Grease a cookie sheet.</li>
          <li>Cream together the butter, white sugar, and brown sugar until fluffy. Add the egg and vanilla extract into this mixture.</li>
          <li>Mix in all remaining dry ingredients and stir till just combined.</li>
          <li>Fold in the white chocolate chips. Once combined, shape the cookie dough into 12 balls and place on a cookie sheet and store in the fridge for 1 hour.</li>
          <li>Halfway through the wait, preheat your oven to 350℉.</li>
          <li>Once chilled, bake your cookie dough in the oven for 12 minutes.</li>
          <li>When ready, place your cookies on a wire rack to cool for 20 minutes.</li>
        </ol>
      </section>
    </main>
  );
}
