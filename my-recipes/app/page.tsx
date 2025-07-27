import Link from 'next/link';
import './globals.css';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Nav Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-[#FFF7D1]">
        <div className="text-xl font-bold font-homemade">Recipe Stack</div>
        <div className="flex items-center gap-4">
          <Link href="/recipes">
            <button className="px-4 py-2 bg-[#FFF0AB] text-black rounded-md hover:opacity-80">
              Explore Recipes
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

      {/* Landing Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 font-homemade">Welcome to Recipe Stack</h1>
        <Image
  	    src="/landing.jpg"
            alt="Emily cooking in the kitchen"
  	    width={600}
  	    height={400}
  	    className="rounded-xl mb-8"
	/>
	<p className="text-lg mb-8">
          Hi! I am Emily, and I created this page to share my absolute favorite recipes. These recipes have been iterated upon and I try to include healthier replacements where I can. I hope you enjoy them as much as I do!
        </p>
        <Link href="/recipes">
          <button className="px-6 py-3 bg-[#FFF0AB] text-black text-lg font-semibold rounded-md hover:opacity-90">
            Explore Recipes
          </button>
        </Link>
      </section>
    </main>
  );
}
