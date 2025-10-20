import { areIngredientsSame, getAllSynonyms } from './ingredient-synonyms';

export interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  description?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  prepTime?: string;
  cookTime?: string;
}

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Cheesecake',
    image: '/recipes/cheesecake.jpg',
    description: 'Adapted from the King Arthur Baking Easy Cheesecake Recipe',
    difficulty: 'medium',
    prepTime: '20 minutes',
    cookTime: '20 minutes',
    ingredients: [
      'graham crackers',
      'biscoff cookies',
      'powdered sugar',
      'butter',
      'salt',
      'cream cheese',
      'greek yogurt',
      'white sugar',
      'eggs',
      'vanilla extract'
    ]
  },
  {
    id: '2',
    name: 'Banana Bread',
    image: '/recipes/banana-bread.jpg',
    difficulty: 'easy',
    prepTime: '15 minutes',
    cookTime: '60 minutes',
    ingredients: [
      'bananas',
      'flour',
      'brown sugar',
      'eggs',
      'butter',
      'baking soda',
      'salt',
      'vanilla extract'
    ]
  },
  {
    id: '3',
    name: 'Sourdough',
    image: '/recipes/sourdough.jpg',
    difficulty: 'hard',
    prepTime: '2 days',
    cookTime: '45 minutes',
    ingredients: [
      'flour',
      'water',
      'salt',
      'sourdough starter'
    ]
  },
  {
    id: '4',
    name: 'Matcha Chip Cookies',
    image: '/recipes/matcha-chip-cookie.jpeg',
    difficulty: 'easy',
    prepTime: '15 minutes',
    cookTime: '12 minutes',
    ingredients: [
      'flour',
      'matcha powder',
      'butter',
      'brown sugar',
      'eggs',
      'vanilla extract',
      'chocolate chips',
      'baking soda',
      'salt'
    ]
  },
  {
    id: '5',
    name: 'Earl Gray Cookies',
    image: '/recipes/earl-gray-cookie.jpg',
    difficulty: 'medium',
    prepTime: '20 minutes',
    cookTime: '15 minutes',
    ingredients: [
      'flour',
      'butter',
      'brown sugar',
      'eggs',
      'earl gray tea',
      'vanilla extract',
      'baking soda',
      'salt'
    ]
  },
  {
    id: '6',
    name: 'Tofu Bagels',
    image: '/recipes/tofu-bagel.jpg',
    difficulty: 'hard',
    prepTime: '30 minutes',
    cookTime: '25 minutes',
    ingredients: [
      'flour',
      'tofu',
      'water',
      'salt',
      'yeast',
      'honey',
      'olive oil'
    ]
  }
];

export function findMatchingRecipes(userIngredients: string[]): {
  canMake: Recipe[];
  partialMatch: Recipe[];
  missingIngredients: { recipe: Recipe; missing: string[] }[];
} {
  const canMake: Recipe[] = [];
  const partialMatch: Recipe[] = [];
  const missingIngredients: { recipe: Recipe; missing: string[] }[] = [];

  recipes.forEach(recipe => {
    // Check how many ingredients the user has using improved matching
    const matchingIngredients = recipe.ingredients.filter(recipeIngredient =>
      userIngredients.some(userIngredient =>
        areIngredientsSame(userIngredient, recipeIngredient)
      )
    );

    const missing = recipe.ingredients.filter(recipeIngredient =>
      !userIngredients.some(userIngredient =>
        areIngredientsSame(userIngredient, recipeIngredient)
      )
    );

    const matchPercentage = (matchingIngredients.length / recipe.ingredients.length) * 100;

    if (matchPercentage === 100) {
      canMake.push(recipe);
    } else if (matchPercentage >= 70) {
      partialMatch.push(recipe);
      missingIngredients.push({
        recipe,
        missing: missing
      });
    }
  });

  return { canMake, partialMatch, missingIngredients };
}



export function getAllUniqueIngredients(): string[] {
  const allIngredients = recipes.flatMap(recipe => recipe.ingredients);
  return [...new Set(allIngredients)].sort();
}

export function getIngredientSuggestions(userInput: string): string[] {
  const allIngredients = recipes.flatMap(recipe => recipe.ingredients);
  const uniqueIngredients = [...new Set(allIngredients)];
  
  // Get all possible ingredient names including synonyms
  const allPossibleNames = uniqueIngredients.flatMap(ingredient => 
    getAllSynonyms(ingredient)
  );
  
  return [...new Set(allPossibleNames)]
    .filter(ingredient => 
      ingredient.toLowerCase().includes(userInput.toLowerCase())
    )
    .slice(0, 5);
} 