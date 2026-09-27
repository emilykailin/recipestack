"use client";

// app/recipes/10/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import '../../../app/globals.css';
import { useEffect, useState } from 'react';

export default function NYBagelRecipePage() {
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
          src="/recipes/ny_bagels.jpg"
          alt="New York Bagels"
          width={800}
          height={500}
          className="rounded-xl mb-8 w-full h-auto object-cover"
        />

        <h1 className="text-3xl font-bold mb-4 font-homemade text-center">New York Bagel Recipe</h1>
        <p className="italic text-center mb-4">
          Makes 12 bagels
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
          <li>940g bread flour (or any high protein flour)</li>
          <li>12g vital wheat gluten</li>
	        <li>4g active dry yeast</li>
	        <li>20g salt</li>
          <li>25g barley malt syrup</li>
          <li>562g water (warmed)</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Steps:</h2>
        <h4 className="text-l font-semibold mb-2">Day 1 Evening</h4>
        <ol className="list-decimal list-inside space-y-2">
          <li>Add the active dry yeast to the warm water.</li>
          <li>Mix in the barley malt syrup.</li>
          <li>Add the bread flour, vital wheat gluten, and salt to the mixture and combine.</li>
          <li>Cover with plastic wrap and leave on the counter for 30 minutes.</li>
          <li>After the 30 minutes, pour the dough onto the counter and knead for 10 minutes until the dough is smooth.</li>
          <li>Cover again with plastic wrap and leave on the counter for one hour.</li>
          <li>After the hour is up, place the dough onto the counter and divide into 12 equal portions.</li>
          <li>Shape each portion into a rectangle/square and roll it up into a cylinder.</li>
          <li>Join the two ends of the cylinder and roll on the counter again to shape your dough into bagels.</li>
          <li>Repeat for all 12 dough portions and let them proof in the fridge overnight (12 hours).</li>
        </ol>
        <br></br>
        <h4 className="text-l font-semibold mb-2">Day 2 Morning</h4>
        <ol className="list-decimal list-inside space-y-2">
          <li>Take your dough out of the fridge.</li>
          <li>Preheat your oven to 450℉</li>
          <li>Add 50g barley malt, a pinch of salt, and 2 tbsp of baking soda to your water and bring to a boil.</li>
          <li>Place your shaped dough into the boiling water (3 at a time as long as your pot permits), boiling each side for 30 seconds. </li>
	        <li>Place the boiled dough onto your baking sheet and sprinkle with any preferred toppings. </li>
          <li>Place in the oven on the middle rack. Place a pan of hot water on the lower rack to create steam in the oven.</li>
          <li>Bake for 6min, then remove the pan of hot water and continue to bake for 14min.</li>
          <li>Once baked, allow your bagels to cool on a baking rack for 10min before enjoying.</li>
        </ol>
      </section>
    </main>
  );
}
