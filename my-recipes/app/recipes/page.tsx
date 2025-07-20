import Link from 'next/link';
import Image from 'next/image';

const recipes = [
  {
    id: '1',
    name: 'Cheesecake',
    image: '/recipes/cheesecake.jpg',
  },
  {
    id: '2',
    name: 'Banana Bread',
    image: '/recipes/banana-bread.jpg',
  },
  {
    id: '3',
    name: 'Quick Sourdough',
    image: '/recipes/sourdough.jpg',
  },
];

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
          <input
            type="text"
            placeholder="Search recipes..."
            className="px-3 py-2 rounded-md border border-black bg-white placeholder-black"
          />
        </div>
      </nav>

      <section className="px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center font-homemade">
          Explore Recipes
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group">
              <div className="overflow-hidden rounded-lg shadow-md">
                <div className="relative w-full h-64">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="object-cover transition duration-300 group-hover:brightness-75"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-center group-hover:underline">
                    {recipe.name}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
