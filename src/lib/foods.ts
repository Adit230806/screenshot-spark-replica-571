import heroThali from "@/assets/food/hero-thali.jpg";
import weightLoss from "@/assets/food/plan-weight-loss.jpg";
import weightGain from "@/assets/food/plan-weight-gain.jpg";
import muscle from "@/assets/food/plan-muscle.jpg";
import balanced from "@/assets/food/plan-balanced.jpg";
import custom from "@/assets/food/plan-custom.jpg";
import idli from "@/assets/food/idli-sambar.jpg";
import dosa from "@/assets/food/masala-dosa.jpg";
import poha from "@/assets/food/poha.jpg";
import upma from "@/assets/food/upma.jpg";
import paneerTikka from "@/assets/food/paneer-tikka.jpg";
import rajma from "@/assets/food/rajma-chawal.jpg";
import fruitBowl from "@/assets/food/fruit-bowl.jpg";
import smoothie from "@/assets/food/smoothie.jpg";
import moongChilla from "@/assets/food/moong-chilla.jpg";
import rotiSabzi from "@/assets/food/roti-sabzi.jpg";
import chole from "@/assets/food/chole.jpg";
import eggBhurji from "@/assets/food/egg-bhurji.jpg";
import chickenCurry from "@/assets/food/chicken-curry.jpg";
import khichdi from "@/assets/food/khichdi.jpg";
import makhana from "@/assets/food/makhana.jpg";
import curdBowl from "@/assets/food/curd-bowl.jpg";

export const foodImages = {
  heroThali,
  weightLoss,
  weightGain,
  muscle,
  balanced,
  custom,
} as const;

export type MealSlot = "breakfast" | "lunch" | "snacks" | "dinner";
export const MEAL_SLOTS: MealSlot[] = ["breakfast", "lunch", "snacks", "dinner"];
export const MEAL_SLOT_LABEL: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  snacks: "Snacks",
  dinner: "Dinner",
};

export interface Food {
  id: string;
  name: string;
  description: string;
  image: string;
  serving: string;
  meals: MealSlot[];
  isVeg: boolean;
  highProtein: boolean;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  ingredients: string[];
}

export const FOODS: Food[] = [
  {
    id: "idli-sambar",
    name: "Idli with Sambar",
    description: "Steamed rice-lentil cakes with vegetable sambar and coconut chutney. Light, fermented and gut-friendly.",
    image: idli,
    serving: "3 idlis + 1 bowl sambar",
    meals: ["breakfast"],
    isVeg: true,
    highProtein: false,
    calories: 280,
    protein: 10,
    carbs: 52,
    fat: 4,
    fiber: 6,
    ingredients: ["Rice", "Urad dal", "Toor dal", "Vegetables", "Coconut"],
  },
  {
    id: "masala-dosa",
    name: "Masala Dosa",
    description: "Crisp fermented crepe filled with spiced potato, served with sambar and chutneys.",
    image: dosa,
    serving: "1 dosa + sambar",
    meals: ["breakfast", "dinner"],
    isVeg: true,
    highProtein: false,
    calories: 390,
    protein: 9,
    carbs: 58,
    fat: 13,
    fiber: 5,
    ingredients: ["Rice", "Urad dal", "Potato", "Onion", "Curry leaves"],
  },
  {
    id: "poha",
    name: "Kanda Poha",
    description: "Flattened rice tempered with onion, peanuts, turmeric and lemon. A classic quick breakfast.",
    image: poha,
    serving: "1 bowl (250 g)",
    meals: ["breakfast", "snacks"],
    isVeg: true,
    highProtein: false,
    calories: 270,
    protein: 6,
    carbs: 45,
    fat: 8,
    fiber: 3,
    ingredients: ["Poha", "Onion", "Peanuts", "Pomegranate", "Lemon"],
  },
  {
    id: "upma",
    name: "Vegetable Upma",
    description: "Roasted semolina cooked with carrots, peas, curry leaves and cashews.",
    image: upma,
    serving: "1 bowl (250 g)",
    meals: ["breakfast"],
    isVeg: true,
    highProtein: false,
    calories: 290,
    protein: 7,
    carbs: 44,
    fat: 9,
    fiber: 4,
    ingredients: ["Semolina", "Carrot", "Peas", "Cashew", "Curry leaves"],
  },
  {
    id: "moong-chilla",
    name: "Moong Dal Chilla with Paneer",
    description: "Protein-packed green gram pancakes stuffed with herbed paneer and mint chutney.",
    image: moongChilla,
    serving: "2 chillas",
    meals: ["breakfast", "dinner"],
    isVeg: true,
    highProtein: true,
    calories: 320,
    protein: 20,
    carbs: 34,
    fat: 11,
    fiber: 7,
    ingredients: ["Moong dal", "Paneer", "Coriander", "Ginger", "Green chilli"],
  },
  {
    id: "egg-bhurji",
    name: "Egg Bhurji with Multigrain Toast",
    description: "Masala scrambled eggs with tomato, onion and green chilli, served with toasted multigrain bread.",
    image: eggBhurji,
    serving: "3 eggs + 2 toasts",
    meals: ["breakfast"],
    isVeg: false,
    highProtein: true,
    calories: 380,
    protein: 24,
    carbs: 28,
    fat: 18,
    fiber: 5,
    ingredients: ["Eggs", "Tomato", "Onion", "Multigrain bread"],
  },
  {
    id: "curd-bowl",
    name: "Hung Curd Granola Bowl",
    description: "Thick curd layered with granola, banana, berries, chia seeds and a drizzle of honey.",
    image: curdBowl,
    serving: "1 bowl",
    meals: ["breakfast", "snacks"],
    isVeg: true,
    highProtein: true,
    calories: 300,
    protein: 16,
    carbs: 42,
    fat: 8,
    fiber: 6,
    ingredients: ["Hung curd", "Granola", "Banana", "Berries", "Chia"],
  },
  {
    id: "green-smoothie",
    name: "Green Spinach Smoothie",
    description: "Spinach, banana, flaxseed and curd blended into a refreshing, fibre-rich drink.",
    image: smoothie,
    serving: "1 glass (350 ml)",
    meals: ["breakfast", "snacks"],
    isVeg: true,
    highProtein: false,
    calories: 220,
    protein: 8,
    carbs: 38,
    fat: 4,
    fiber: 6,
    ingredients: ["Spinach", "Banana", "Curd", "Flaxseed"],
  },
  {
    id: "mango-protein-lassi",
    name: "Mango Protein Lassi",
    description: "Alphonso mango blended with curd, whey and chia — a creamy post-workout favourite.",
    image: smoothie,
    serving: "1 glass (350 ml)",
    meals: ["breakfast", "snacks"],
    isVeg: true,
    highProtein: true,
    calories: 310,
    protein: 24,
    carbs: 42,
    fat: 5,
    fiber: 4,
    ingredients: ["Mango", "Curd", "Whey protein", "Chia"],
  },
  {
    id: "fruit-bowl",
    name: "Seasonal Fruit Bowl",
    description: "Papaya, mango, kiwi, berries, banana and pomegranate with fresh mint.",
    image: fruitBowl,
    serving: "1 bowl (300 g)",
    meals: ["snacks", "breakfast"],
    isVeg: true,
    highProtein: false,
    calories: 160,
    protein: 2,
    carbs: 38,
    fat: 1,
    fiber: 7,
    ingredients: ["Papaya", "Mango", "Kiwi", "Berries", "Pomegranate"],
  },
  {
    id: "roasted-makhana",
    name: "Roasted Masala Makhana",
    description: "Fox nuts dry-roasted with a touch of ghee and spices. Crunchy, light and satisfying.",
    image: makhana,
    serving: "1 bowl (40 g)",
    meals: ["snacks"],
    isVeg: true,
    highProtein: false,
    calories: 150,
    protein: 5,
    carbs: 22,
    fat: 5,
    fiber: 4,
    ingredients: ["Makhana", "Ghee", "Black pepper", "Chaat masala"],
  },
  {
    id: "sprouts-paneer-salad",
    name: "Sprouts & Paneer Salad",
    description: "Sprouted moong, grilled paneer, cucumber, tomato and pomegranate with lemon-mint dressing.",
    image: weightLoss,
    serving: "1 large bowl",
    meals: ["lunch", "snacks", "dinner"],
    isVeg: true,
    highProtein: true,
    calories: 290,
    protein: 19,
    carbs: 24,
    fat: 13,
    fiber: 9,
    ingredients: ["Moong sprouts", "Paneer", "Cucumber", "Pomegranate", "Mint"],
  },
  {
    id: "paneer-tikka",
    name: "Grilled Paneer Tikka",
    description: "Yogurt-marinated paneer and peppers char-grilled in the tandoor, with mint chutney.",
    image: paneerTikka,
    serving: "6 pieces (150 g)",
    meals: ["snacks", "dinner"],
    isVeg: true,
    highProtein: true,
    calories: 300,
    protein: 22,
    carbs: 10,
    fat: 19,
    fiber: 2,
    ingredients: ["Paneer", "Hung curd", "Capsicum", "Onion", "Spices"],
  },
  {
    id: "dal-rice-roti",
    name: "Dal Tadka, Rice & Roti",
    description: "Yellow dal tempered with cumin and garlic, steamed rice, phulkas, sabzi, raita and salad.",
    image: balanced,
    serving: "1 plate",
    meals: ["lunch", "dinner"],
    isVeg: true,
    highProtein: false,
    calories: 520,
    protein: 18,
    carbs: 86,
    fat: 11,
    fiber: 11,
    ingredients: ["Toor dal", "Rice", "Whole wheat", "Vegetables", "Curd"],
  },
  {
    id: "rajma-chawal",
    name: "Rajma Chawal",
    description: "Slow-cooked kidney beans in onion-tomato gravy with fluffy basmati rice.",
    image: rajma,
    serving: "1 bowl rajma + 1 cup rice",
    meals: ["lunch"],
    isVeg: true,
    highProtein: true,
    calories: 520,
    protein: 19,
    carbs: 88,
    fat: 9,
    fiber: 13,
    ingredients: ["Rajma", "Basmati rice", "Onion", "Tomato"],
  },
  {
    id: "roti-sabzi",
    name: "Roti with Aloo Gobi & Bhindi",
    description: "Whole wheat rotis with dry-roasted cauliflower-potato and okra masala, plus fresh curd.",
    image: rotiSabzi,
    serving: "2 rotis + 2 sabzis",
    meals: ["lunch", "dinner"],
    isVeg: true,
    highProtein: false,
    calories: 420,
    protein: 12,
    carbs: 60,
    fat: 14,
    fiber: 12,
    ingredients: ["Whole wheat", "Cauliflower", "Okra", "Potato", "Curd"],
  },
  {
    id: "chana-masala",
    name: "Chana Masala with Kulcha",
    description: "Punjabi-style chickpea curry with ginger and onion, served with soft whole wheat kulcha.",
    image: chole,
    serving: "1 bowl + 1 kulcha",
    meals: ["lunch"],
    isVeg: true,
    highProtein: true,
    calories: 540,
    protein: 18,
    carbs: 80,
    fat: 15,
    fiber: 14,
    ingredients: ["Chickpeas", "Onion", "Tomato", "Ginger", "Whole wheat"],
  },
  {
    id: "moong-khichdi",
    name: "Moong Dal Khichdi",
    description: "Comforting rice and moong dal porridge with vegetables and a spoon of ghee.",
    image: khichdi,
    serving: "1 large bowl",
    meals: ["dinner", "lunch"],
    isVeg: true,
    highProtein: false,
    calories: 380,
    protein: 14,
    carbs: 62,
    fat: 8,
    fiber: 7,
    ingredients: ["Rice", "Moong dal", "Carrot", "Peas", "Ghee"],
  },
  {
    id: "chicken-curry",
    name: "Home-style Chicken Curry",
    description: "Lean chicken in a light tomato-onion gravy, with brown rice and cucumber salad.",
    image: chickenCurry,
    serving: "1 bowl + 1 cup brown rice",
    meals: ["lunch", "dinner"],
    isVeg: false,
    highProtein: true,
    calories: 520,
    protein: 38,
    carbs: 48,
    fat: 18,
    fiber: 5,
    ingredients: ["Chicken breast", "Tomato", "Onion", "Brown rice"],
  },
  {
    id: "tandoori-protein-plate",
    name: "Tandoori Protein Plate",
    description: "Chicken tikka, boiled eggs, chana salad, grilled vegetables and brown rice with mint chutney.",
    image: muscle,
    serving: "1 plate",
    meals: ["lunch", "dinner"],
    isVeg: false,
    highProtein: true,
    calories: 560,
    protein: 48,
    carbs: 46,
    fat: 18,
    fiber: 9,
    ingredients: ["Chicken", "Eggs", "Chickpeas", "Zucchini", "Brown rice"],
  },
  {
    id: "healthy-thali",
    name: "Classic Healthy Thali",
    description: "Dal, palak paneer, bhindi, mixed sabzi, raita, kachumber, rice and rotis — balanced in one plate.",
    image: heroThali,
    serving: "1 thali",
    meals: ["lunch"],
    isVeg: true,
    highProtein: true,
    calories: 650,
    protein: 24,
    carbs: 92,
    fat: 20,
    fiber: 15,
    ingredients: ["Dal", "Spinach", "Paneer", "Okra", "Rice", "Whole wheat"],
  },
  {
    id: "paneer-butter-masala",
    name: "Paneer Makhani with Paratha",
    description: "Paneer in a rich tomato-cashew gravy with jeera rice and parathas — ideal for healthy weight gain.",
    image: weightGain,
    serving: "1 bowl + 2 parathas",
    meals: ["lunch", "dinner"],
    isVeg: true,
    highProtein: true,
    calories: 780,
    protein: 26,
    carbs: 80,
    fat: 38,
    fiber: 8,
    ingredients: ["Paneer", "Tomato", "Cashew", "Butter", "Whole wheat"],
  },
  {
    id: "quinoa-chana-bowl",
    name: "Quinoa Chana Power Bowl",
    description: "Quinoa, roasted sweet potato, spiced chickpeas, avocado, spinach and beetroot hummus.",
    image: custom,
    serving: "1 bowl",
    meals: ["lunch", "dinner"],
    isVeg: true,
    highProtein: true,
    calories: 470,
    protein: 19,
    carbs: 62,
    fat: 16,
    fiber: 14,
    ingredients: ["Quinoa", "Chickpeas", "Sweet potato", "Avocado", "Beetroot"],
  },
];

export const FOOD_BY_ID: Record<string, Food> = Object.fromEntries(FOODS.map((f) => [f.id, f]));

export function getFood(id: string | null | undefined): Food | undefined {
  return id ? FOOD_BY_ID[id] : undefined;
}

export type MenuCategory = "breakfast" | "lunch" | "dinner" | "snacks" | "high-protein" | "vegetarian";
export const MENU_CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "snacks", label: "Snacks" },
  { id: "high-protein", label: "High Protein" },
  { id: "vegetarian", label: "Vegetarian" },
];

export function foodsInCategory(category: MenuCategory): Food[] {
  switch (category) {
    case "high-protein":
      return FOODS.filter((f) => f.highProtein);
    case "vegetarian":
      return FOODS.filter((f) => f.isVeg);
    default:
      return FOODS.filter((f) => f.meals.includes(category));
  }
}
