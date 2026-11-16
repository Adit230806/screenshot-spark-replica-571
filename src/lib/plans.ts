import { foodImages } from "@/lib/foods";
import type { Goal } from "@/lib/nutrition";

export interface MealPlanInfo {
  id: string;
  goal: Goal | "custom";
  title: string;
  tagline: string;
  description: string;
  image: string;
  calories: string;
  split: { protein: number; carbs: number; fat: number };
  benefits: string[];
  idealFor: string[];
  sampleDay: { slot: string; foodId: string }[];
}

export const MEAL_PLANS: MealPlanInfo[] = [
  {
    id: "weight-loss",
    goal: "weight_loss",
    title: "Weight Loss Plan",
    tagline: "Lose fat, keep the flavour",
    description:
      "A gentle calorie deficit built on high-fibre Indian meals, lean protein and smart portions so you stay full and energised.",
    image: foodImages.weightLoss,
    calories: "1,300 – 1,700 kcal/day",
    split: { protein: 30, carbs: 40, fat: 30 },
    benefits: ["High-fibre, low-GI meals", "Protein at every meal", "No crash dieting"],
    idealFor: ["Steady fat loss of 0.5 kg/week", "Managing cravings", "Improving energy levels"],
    sampleDay: [
      { slot: "Breakfast", foodId: "moong-chilla" },
      { slot: "Lunch", foodId: "sprouts-paneer-salad" },
      { slot: "Snacks", foodId: "roasted-makhana" },
      { slot: "Dinner", foodId: "moong-khichdi" },
    ],
  },
  {
    id: "weight-gain",
    goal: "weight_gain",
    title: "Weight Gain Plan",
    tagline: "Healthy mass, clean calories",
    description:
      "A calorie surplus from wholesome, nutrient-dense foods — nuts, dairy, legumes and grains — to gain weight the healthy way.",
    image: foodImages.weightGain,
    calories: "2,400 – 3,000 kcal/day",
    split: { protein: 20, carbs: 50, fat: 30 },
    benefits: ["Nutrient-dense surplus", "Easy-to-eat portions", "Balanced healthy fats"],
    idealFor: ["Underweight individuals", "Fast metabolisms", "Recovery after illness"],
    sampleDay: [
      { slot: "Breakfast", foodId: "masala-dosa" },
      { slot: "Lunch", foodId: "paneer-butter-masala" },
      { slot: "Snacks", foodId: "mango-protein-lassi" },
      { slot: "Dinner", foodId: "rajma-chawal" },
    ],
  },
  {
    id: "muscle-building",
    goal: "muscle_gain",
    title: "Muscle Building Plan",
    tagline: "Fuel strength and recovery",
    description:
      "Higher protein from paneer, eggs, chicken and legumes, timed around training to support lean muscle growth.",
    image: foodImages.muscle,
    calories: "2,200 – 2,800 kcal/day",
    split: { protein: 30, carbs: 45, fat: 25 },
    benefits: ["1.6–2 g protein per kg", "Pre & post workout meals", "Optimised carb timing"],
    idealFor: ["Gym-goers and athletes", "Strength training", "Body recomposition"],
    sampleDay: [
      { slot: "Breakfast", foodId: "egg-bhurji" },
      { slot: "Lunch", foodId: "tandoori-protein-plate" },
      { slot: "Snacks", foodId: "mango-protein-lassi" },
      { slot: "Dinner", foodId: "paneer-tikka" },
    ],
  },
  {
    id: "balanced-nutrition",
    goal: "balanced",
    title: "Balanced Nutrition Plan",
    tagline: "Everyday wellness, Indian style",
    description:
      "Traditional home-style meals with the right balance of macros, micronutrients and variety for long-term health.",
    image: foodImages.balanced,
    calories: "1,800 – 2,300 kcal/day",
    split: { protein: 20, carbs: 50, fat: 30 },
    benefits: ["Home-style recipes", "Rich in micronutrients", "Sustainable for life"],
    idealFor: ["Maintaining weight", "Families", "Busy professionals"],
    sampleDay: [
      { slot: "Breakfast", foodId: "idli-sambar" },
      { slot: "Lunch", foodId: "dal-rice-roti" },
      { slot: "Snacks", foodId: "fruit-bowl" },
      { slot: "Dinner", foodId: "roti-sabzi" },
    ],
  },
  {
    id: "custom-ai",
    goal: "custom",
    title: "Custom AI Diet Plan",
    tagline: "Built around you, by AI",
    description:
      "Tell us about your body, goals, preferences and health conditions — NutriAI builds and adapts a plan uniquely for you.",
    image: foodImages.custom,
    calories: "Personalised to your needs",
    split: { protein: 25, carbs: 45, fat: 30 },
    benefits: ["Personal calorie target", "Allergy-aware choices", "Swap any meal instantly"],
    idealFor: ["Specific health goals", "Dietary restrictions", "Anyone who wants precision"],
    sampleDay: [
      { slot: "Breakfast", foodId: "curd-bowl" },
      { slot: "Lunch", foodId: "quinoa-chana-bowl" },
      { slot: "Snacks", foodId: "green-smoothie" },
      { slot: "Dinner", foodId: "moong-chilla" },
    ],
  },
];

export function getPlan(id: string) {
  return MEAL_PLANS.find((p) => p.id === id);
}
