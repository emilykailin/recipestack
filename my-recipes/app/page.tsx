import Link from 'next/link';
import './globals.css';
import Image from 'next/image';

export default function Home() {
  // Array of the first 3 images to display statically
  const displayImages = [
    '/rotating carosell/1.JPG',
    '/rotating carosell/2.JPG',
    '/rotating carosell/3.JPG'
  ];
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Nav Bar */}
      <nav className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 bg-[#FFF7D1] gap-4">
        <div className="text-xl font-bold font-homemade">One More Loaf</div>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <Link href="/recipes" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 py-2 bg-[#FFF0AB] text-black rounded-md hover:opacity-80 text-sm sm:text-base">
              Explore Recipes
            </button>
          </Link>
          <Link href="/ingredient-matcher" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 py-2 bg-[#FFF0AB] text-black rounded-md hover:opacity-80 text-sm sm:text-base">
              Ingredient Matcher
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

      {/* Landing Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-10 sm:py-20 max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 font-homemade">Welcome to One More Loaf!</h1>
        
        {/* Static 3 Images Display */}
        <div className="w-full max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            {displayImages.map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl">
                <Image
                  src={image}
                  alt={`Display image ${index + 1}`}
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover"
                  priority={true}
                />
              </div>
            ))}
          </div>
        </div>
	<p className="text-base sm:text-lg mb-6 sm:mb-8 px-2">
          Hi! I am Emily, and I created this page to share my favorite recipes. These recipes have been iterated upon and I try to include healthier replacements where I can. I hope you enjoy them as much as I do!
        </p>
        <Link href="/recipes">
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-[#FFF0AB] text-black text-base sm:text-lg font-semibold rounded-md hover:opacity-90 w-full sm:w-auto">
            Explore Recipes
          </button>
        </Link>
      </section>
    </main>
  );
}
