"use client";

// app/recipes/1/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import '../../../app/globals.css';
import { useEffect, useState } from 'react';

export default function CheesecakeRecipePage() {
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
          src="/recipes/cheesecake.jpg"
          alt="Cheesecake"
          width={800}
          height={500}
          className="rounded-xl mb-8 w-full h-auto object-cover"
        />

        <h1 className="text-2xl sm:text-3xl font-bold mb-4 font-homemade text-center">Cheesecake Recipe</h1>
        <p className="italic text-center mb-4 text-sm sm:text-base">
          Adapted from the King Arthur Baking Easy Cheesecake Recipe<br />
          Makes one 9 inch cheesecake
        </p>

        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={() => setCookingMode(!cookingMode)}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-[#FFF0AB] text-black text-base sm:text-lg font-semibold rounded-md hover:opacity-90 w-full sm:w-auto"
          >
            {cookingMode ? 'Exit Cooking Mode' : 'Enter Cooking Mode'}
          </button>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8 mb-2">Base:</h2>
        <ul className="list-disc list-inside mb-4 sm:mb-6 text-sm sm:text-base space-y-1">
          <li>8 whole graham crackers (crushed)</li>
          <li>6 to 8 biscoff cookies (crushed)</li>
          <li>¼ cup powdered sugar</li>
          <li>6 tbsp butter (melted)</li>
          <li>a pinch of salt</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mb-2">Filling:</h2>
        <ul className="list-disc list-inside mb-4 sm:mb-6 text-sm sm:text-base space-y-1">
          <li>12 oz cream cheese (room temp)</li>
          <li>4 oz greek yogurt</li>
          <li>⅔ cup white sugar</li>
          <li>2 eggs (room temp)</li>
          <li>1 tsp vanilla extract</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mb-2">Steps:</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base">
          <li>Preheat your oven to 350℉ and grease a 9 inch cake pan.</li>
          <li>Mix all the base ingredients together and press into the bottom of the cake pan.</li>
          <li>In a mixing bowl, cream together the cream cheese and sugar until smooth. Make sure the cream cheese is room temperature to avoid lumps.</li>
          <li>Next, mix in the remaining filling ingredients, mixing gently to avoid adding too much air.</li>
          <li>Pour the filling mixture on top of the base layer in the cake pan.</li>
          <li>Place the cake pan onto a baking sheet and place in the preheated oven.</li>
          <li>Bake for 20 minutes. The cheesecake should still be jiggly in the center when removed.</li>
          <li>Refrigerate for at least 5 hours before serving. It should be fully set when ready.</li>
          <li>Enjoy on its own or serve with a berry compote.</li>
        </ol>
      </section>
    </main>
  );
}
