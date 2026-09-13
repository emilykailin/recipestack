"use client";

// app/recipes/8/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import '../../../app/globals.css';
import { useEffect, useState } from 'react';

export default function BaguetteRecipePage() {
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
          src="/recipes/baguette.jpg"
          alt="Baguette"
          width={800}
          height={500}
          className="rounded-xl mb-8 w-full h-auto object-cover"
        />

        <h1 className="text-3xl font-bold mb-4 font-homemade text-center">Baguette Recipe</h1>
        <p className="italic text-center mb-4">
          Adapted from Momsdish No Knead Bread-Baguette Recipe<br />
          Makes 4 loaves
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
          <li>720g all purpose flour</li>
          <li>530g water</li>
	        <li>6g active dry yeast</li>
	        <li>12g salt</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Steps:</h2>
        <h4 className="text-l font-semibold mb-2">Day 1 Evening</h4>
        <ol className="list-decimal list-inside space-y-2">
          <li>Mix all ingredients in a mixing bowl.</li>
          <li>Cover with plastic wrap and leave on the counter overnight (12-15 hours).</li>
        </ol>
        <h4 className="text-l font-semibold mb-2">Day 2 Morning</h4>
        <ol className="list-decimal list-inside space-y-2">
          <li>Flour your countertop and place dough on the counter.</li>
          <li>Divide into 4 equal portions, roll the dough out lengthwise and crosswise, and pinch the dough crosswise to shape.</li>
          <li>Place the shaped dough onto your floured baguette pan, cover, and let proof on the countertop for 1 hour. </li>
          <li>Preheat your oven to 450℉</li>
	        <li>After an hour, score your loaves. </li>
          <li>Place in the oven on the middle rack. Place a pan of hot water on the lower rack to create steam in the oven.</li>
          <li>Bake for 10min, then remove the pan of hot water and continue to bake for 20min.</li>
          <li>Once baked, allow your bread to cool on a baking rack for 10min before enjoying.</li>
        </ol>
      </section>
    </main>
  );
}
