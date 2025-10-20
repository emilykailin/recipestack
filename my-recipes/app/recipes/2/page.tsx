"use client";

// app/recipes/2/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import '../../../app/globals.css';
import { useEffect, useState } from 'react';

export default function BananaBreadRecipePage() {
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
          src="/recipes/banana-bread.jpg"
          alt="Banana Bread"
          width={800}
          height={500}
          className="rounded-xl mb-8 w-full h-auto object-cover"
        />

        <h1 className="text-3xl font-bold mb-4 font-homemade text-center">Banana Bread Recipe</h1>
        <p className="italic text-center mb-4">
          Adapted from Simply Recipes' Banana Bread Recipe<br />
          Makes one 8x4inch loaf
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
          <li>3 mashed very ripe bananas</li>
          <li>5.33 tbsp salted butter (melted)</li>
          <li>½ cup brown sugar</li>
          <li>½ tsp baking soda</li>
          <li>a pinch of salt</li>
	  <li>1 egg (beaten)</li>
	  <li>1 tsp vanilla extract</li>
	  <li>1½ cups all-purpose flour</li>
          <li>¼ cup ground flax seeds/hemp seeds/sunflower seeds/walnuts/pecans/coconut flakes (be creative!)</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Steps:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Preheat your oven to 350℉ and grease a 8x4 inch loaf pan.</li>
          <li>Mash your ripe bananas with a fork and add to a mixing bowl.</li>
          <li>Add the remaining ingredients to the mixing bowl and mix till smooth.</li>
          <li>Pour the mixture into the greased loaf pan.</li>
          <li>Bake for 55 minutes. A toothpick stuck into the center should come out clean when ready.</li>
          <li>Allow to cool on a cooling rack before slicing.</li>
        </ol>
      </section>
    </main>
  );
}
