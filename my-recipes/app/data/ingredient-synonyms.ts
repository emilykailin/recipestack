// Ingredient synonyms to improve matching accuracy
export const ingredientSynonyms: Record<string, string[]> = {
  'flour': ['all-purpose flour', 'plain flour', 'wheat flour', 'bread flour'],
  'brown sugar': ['sugar', 'light brown sugar', 'dark brown sugar'],
  'butter': ['unsalted butter', 'salted butter', 'margarine'],
  'eggs': ['egg', 'large eggs', 'medium eggs'],
  'vanilla extract': ['vanilla', 'vanilla essence'],
  'salt': ['table salt', 'kosher salt', 'sea salt'],
  'baking soda': ['sodium bicarbonate', 'bicarbonate of soda'],
  'cream cheese': ['philadelphia cream cheese', 'soft cheese'],
  'greek yogurt': ['yogurt', 'plain yogurt', 'natural yogurt'],
  'matcha powder': ['matcha', 'green tea powder'],
  'chocolate chips': ['chocolate chips', 'chocolate morsels', 'chocolate pieces'],
  'earl gray tea': ['earl grey tea', 'earl gray', 'earl grey'],
  'sourdough starter': ['starter', 'levain', 'sourdough culture'],
  'yeast': ['active dry yeast', 'instant yeast', 'fresh yeast'],
  'honey': ['raw honey', 'organic honey'],
  'olive oil': ['extra virgin olive oil', 'evoo'],
  'tofu': ['silken tofu', 'firm tofu', 'soft tofu'],
  'bananas': ['banana', 'ripe bananas'],
  'graham crackers': ['graham cracker', 'digestive biscuits'],
  'biscoff cookies': ['biscoff', 'speculoos cookies'],
  'powdered sugar': ['confectioners sugar', 'icing sugar']
};

// Function to get all synonyms for an ingredient
export function getAllSynonyms(ingredient: string): string[] {
  const normalizedIngredient = ingredient.toLowerCase().trim();
  
  // Check if the ingredient is a key in our synonyms
  for (const [key, synonyms] of Object.entries(ingredientSynonyms)) {
    if (key === normalizedIngredient || synonyms.includes(normalizedIngredient)) {
      return [key, ...synonyms];
    }
  }
  
  // If not found, return the original ingredient
  return [normalizedIngredient];
}

// Function to check if two ingredients are the same (including synonyms)
export function areIngredientsSame(ingredient1: string, ingredient2: string): boolean {
  const synonyms1 = getAllSynonyms(ingredient1);
  const synonyms2 = getAllSynonyms(ingredient2);
  
  return synonyms1.some(syn1 => 
    synonyms2.some(syn2 => 
      syn1.includes(syn2) || syn2.includes(syn1)
    )
  );
} 