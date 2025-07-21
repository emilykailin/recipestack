"use client";

// app/recipes/3/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import '../../../app/globals.css';
import { useEffect, useState } from 'react';

export default function QuickSourdoughRecipePage() {
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
            Recipe Stack
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/recipes">
            <button className="px-4 py-2 bg-[#FFF0AB] text-black rounded-md hover:opacity-80">
              Find Recipes
            </button>
          </Link>
          <input
            type="text"
            placeholder="Search recipes..."
            className="px-3 py-2 rounded-md border border-black bg-white placeholder-black"
          />
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 py-10">
        <Image
          src="/recipes/sourdough.jpg"
          alt="Quick Sourdough"
          width={800}
          height={500}
          className="rounded-xl mb-8 w-full h-auto object-cover"
        />

        <h1 className="text-3xl font-bold mb-4 font-homemade text-center">Quick Sourdough Recipe</h1>
        <p className="italic text-center mb-4">
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
          <li>2g active dry yeast</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Steps:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Mix all the ingredients together and set aside for 30 minutes.</li>
          <li>Perform your first batch of stretch and folds (stretch the dough out and fold it over itself 3 times). Let your dough rest for 30 minutes.</li>
          <li>Repeat step 2 two more times.</li>
          <li>Next, shape the dough and create tension in it by pushing it away and then pulling it towards you. Repeat this 5 times.</li>
          <li>Set the bowl of dough aside in a floured banneton with a damp tea towel over it in a warm place. Leave this for 1 hour.</li>
          <li>Halfway your 1 hour wait, preheat your oven with your dutch oven inside it to 425℉.</li>
          <li>Once fully proofed, carefully transfer your dough to a piece of parchment paper/silicon mat and use a lame to score your sourdough.</li>
          <li>Then, transfer your dough to your preheated dutch oven, cover with a lid, and place back into the oven for 25 minutes.</li>
          <li>Remove from the oven and allow to cool on a wire rack for 30 minutes.</li>
        </ol>
      </section>
    </main>
  );
}
