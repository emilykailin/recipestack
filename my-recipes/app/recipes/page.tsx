import Link from 'next/link';
import { Suspense } from 'react';
import Recipesclient from './Recipesclient';

export default function RecipesPage() {
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
          <Link href="/ingredient-matcher">
            <button className="px-4 py-2 bg-[#FFF0AB] text-black rounded-md hover:opacity-80">
              Recipe Matcher
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

      <section className="px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center font-homemade">
          Explore Recipes
        </h1>
        <Suspense fallback={<p className="text-center">Loading recipes...</p>}>
          <Recipesclient />
        </Suspense>
      </section>
    </main>
  );
}
