"use client";

// app/recipes/3/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import '../../../app/globals.css';
import { useEffect, useState } from 'react';

export default function SourdoughRecipePage() {
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
          src="/recipes/sourdough.jpg"
          alt="Sourdough"
          width={800}
          height={500}
          className="rounded-xl mb-8 w-full h-auto object-cover"
        />

        <h1 className="text-3xl font-bold mb-4 font-homemade text-center">Sourdough Recipe</h1>
        <p className="italic text-center mb-4">
          Adapted from "Beginner's Sourdough Bread Recipe" by Farmhouse on Boone <br />
          Makes one loaf of sourdough that bakes in a 5qt dutch oven
        </p>

        <div className="text-center mb-8">
          <button
            onClick={() => setCookingMode(!cookingMode)}
            className="px-6 py-3 bg-[#FFF0AB] text-black text-lg font-semibold rounded-md hover:opacity-90"
          >
            {cookingMode ? 'Exit Cooking Mode' : 'Enter Cooking Mode'}
          </button>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-2">Ingredients</h2>
        <ul className="list-disc list-inside mb-6">
          <li>100g sourdough starter</li>
          <li>475g all-purpose flour</li>
          <li>325g water</li>
          <li>10g salt</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Steps:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>24 hours before you start mixing ingredients together, feed your sourdough starter.</li>
          <li>The next day, mix all the ingredients together and set aside for 30 minutes.</li>
          <li>Perform your first batch of stretch and folds (stretch the dough out and fold it over itself 5 times). Let your dough rest for 30 minutes.</li>
          <li>Repeat step 2 two more times.</li>
          <li>Let your dough proof in a warm place until it doubles in size. This usually takes 3-4 hours in my kitchen (74℉).</li>
          <li>Next, shape the dough and create tension in it by pushing it away and then pulling it towards you. Repeat this 5 times.</li>
          <li>Set the bowl of dough aside in a floured banneton with a damp tea towel over it and place it in the fridge for 15 hours.</li>
          <li>1 hour before you remove your bread from the fridge preheat your oven (with your dutch oven inside it) to 500℉.</li>
          <li>Carefully transfer your dough to a piece of parchment paper/silicon mat. Feel free to add decorative scores to your sourdough at this point.</li>
          <li>Then, transfer your dough to your preheated dutch oven, cover with a lid, and place back into the oven for 7 minutes.</li>
          <li>At the 7 minute mark, remove your dutch oven from the oven and add your expansion score to your loaf. This will allow the loaf to expand predictably.</li>
          <li>Place your dutch oven back into the oven (covered) for an additional 13 minutes.</li>
          <li>After 13 minutes, remove the lid from your dutch oven and bake for an additional 15 minutes.</li>
          <li>Remove from the oven and allow to cool on a wire rack for at least 1 hour but preferably until the loaf is completely cool.</li>
        </ol>
      </section>
    </main>
  );
}
