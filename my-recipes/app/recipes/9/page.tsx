"use client";

// app/recipes/9/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import '../../../app/globals.css';
import { useEffect, useState } from 'react';

export default function PandanChiffonRecipePage() {
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
          src="/recipes/pandan_chiffon.jpg"
          alt="Pandan Chiffon Cake"
          width={800}
          height={500}
          className="rounded-xl mb-8 w-full h-auto object-cover"
        />

        <h1 className="text-3xl font-bold mb-4 font-homemade text-center">Pandan Chiffon Cake Recipe</h1>
        <p className="italic text-center mb-4">
          Adapted from fooddelicacy No Fail Pandan Chiffon Cake Recipe<br />
          Makes 1 chiffon cake
        </p>

        <div className="text-center mb-8">
          <button
            onClick={() => setCookingMode(!cookingMode)}
            className="px-6 py-3 bg-[#FFF0AB] text-black text-lg font-semibold rounded-md hover:opacity-90"
          >
            {cookingMode ? 'Exit Cooking Mode' : 'Enter Cooking Mode'}
          </button>
        </div>

      
        <h2 className="text-xl font-semibold mt-8 mb-2">Batter:</h2>
        <ul className="list-disc list-inside mb-6">
          <li>87g all purpose flour</li>
          <li>13g corn starch</li>
	        <li>5 egg yolks</li>
          <li>45g sugar</li>
          <li>82g coconut milk</li>
          <li>50g oil</li>
          <li>2 pandan leaves</li>
          <li>1 tsp pandan extract</li>
          <li>1 tsp baking powder</li>
          <li>A pinch of salt</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">Meringue:</h2>
        <ul className="list-disc list-inside mb-6">
          <li>5 egg whites</li>
          <li>55g sugar</li>
	        <li>½ tsp cream of tartar</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Steps:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Preheat your oven to 340℉</li>
          <li>Blend your pandan leaves with 2 tbsp of water. Strain the mixture and keep the liquid (pandan juice).</li>
          <li>Sift your flour, corn starch, baking powder, and salt in a bowl.</li>
          <li>In a different bowl, mix your egg yolks and sugar until thick and slightly foamy.</li>
          <li>Add in 1 tsp of the pandan juice, the pandan extract, coconut milk, oil. Mix until well combined.</li>
          <li>Add the dry ingredients mixture to this bowl of wet ingredients in 2 parts.</li>
	        <li>Combine the egg whites and cream of tartar to a bowl and mix with an electric mixer.</li>
          <li>Once the micture is frothy, add the sugar in little by little.</li>
          <li>Whisk until stiff peaks form.</li>
          <li>Add the meringue to the batter in three parts, mixing gently.</li>
          <li>Pour the batter into a chiffon tube pan and bake for 45min. Do not grease the pan.</li>
          <li>Once baked, allow your chiffon cake to cool upside down in the pan.</li>
          <li>Once fully cooled, remove the chiffon cake from the pan and enjoy!</li>
        </ol>
      </section>
    </main>
  );
}
