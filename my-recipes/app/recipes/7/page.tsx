"use client";

// app/recipes/7/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import '../../../app/globals.css';
import { useEffect, useState } from 'react';

export default function BananaMultiseedCookieRecipePage() {
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
          src="/recipes/banana-multiseed-cookie.jpg"
          alt="Banana Multiseed Cookie"
          width={800}
          height={500}
          className="rounded-xl mb-8 w-full h-auto object-cover"
        />

        <h1 className="text-3xl font-bold mb-4 font-homemade text-center">Banana Multiseed Cookie Recipe</h1>
        <p className="italic text-center mb-4">
          Makes 12 cookies
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
          <li>2 browned bananas (mashed)</li>
          <li>2 dates (chopped)</li>
          <li>2 egg whites</li>
	        <li>1 cup of oats</li>
	        <li>A pinch of salt</li>
          <li>Cinnamon powder (to your heart's content)</li>
          <li>Hemp hearts, pumpkin seeds, any other seeds/nuts of your choosing</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Steps:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Preheat your oven to 350℉ and grease a sheet pan.</li>
          <li>Combine all ingredients, adjust the amount of oats if the batter is too wet.</li>
          <li>Place the mixture in the fridge for 10-20min to allow the oats to hydrate.</li>
          <li>Next, take the mixture out of the fridge and scope the batter out onto the sheet pan in circular shapes.</li>
          <li>Bake the cookies in the oven for ~20min.</li>
	        <li>Once out of the oven, let your cookies cool for 10 minutes before serving.</li>
        </ol>
      </section>
    </main>
  );
}
