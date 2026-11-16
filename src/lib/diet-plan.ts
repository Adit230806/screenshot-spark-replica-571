import { FOODS, FOOD_BY_ID, MEAL_SLOTS, type Food, type MealSlot } from "@/lib/foods";
import { SLOT_CALORIE_SHARE, scaleMacros, sumMacros, type Macros, type NutritionTargets } from "@/lib/nutrition";

export type DietPreference = "vegetarian" | "eggetarian" | "non_vegetarian";
export const DIET_PREFERENCES: { id: DietPreference; label: string }[] = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "eggetarian", label: "Eggetarian" },
  { id: "non_vegetarian", label: "Non-vegetarian" },
];

export function allowedFoods(pref: string | null | undefined): Food[] {
  if (pref === "non_vegetarian") return FOODS;
  if (pref === "eggetarian") return FOODS.filter((f) => f.isVeg || f.id.includes("egg"));
  return FOODS.filter((f) => f.isVeg);
}

export interface PlanItem extends Macros {
  foodId: string;
  servings: number;
  portion: string;
}

export interface PlanMeal {
  items: PlanItem[];
  note: string;
  totals: Macros;
}

export interface DietPlan {
  goal: string;
  targets: NutritionTargets;
  summary: string;
  tips: string[];
  meals: Record<MealSlot, PlanMeal>;
  totals: Macros;
  generatedAt: string;
}

export function roundServings(n: number): number {
  const r = Math.round(n * 2) / 2;
  return Math.min(3, Math.max(0.5, r));
}

export function portionLabel(food: Food, servings: number): string {
  return servings === 1 ? food.serving : `${servings} × ${food.serving}`;
}

/**
 * Build a meal from selected foods, nudging servings so the meal lands near its share of the
 * daily calorie target (only when it is more than 15% off).
 */
export function buildMeal(
  slot: MealSlot,
  selection: { foodId: string; servings: number }[],
  targetCalories: number,
  note: string,
): PlanMeal {
  const valid = selection.filter((s) => FOOD_BY_ID[s.foodId]).slice(0, 3);
  let items = valid.map((s) => ({ food: FOOD_BY_ID[s.foodId]!, servings: roundServings(s.servings || 1) }));
  const slotTarget = targetCalories * SLOT_CALORIE_SHARE[slot];
  const total = items.reduce((a, i) => a + i.food.calories * i.servings, 0);
  if (total > 0 && Math.abs(total - slotTarget) / slotTarget > 0.15) {
    const factor = slotTarget / total;
    items = items.map((i) => ({ ...i, servings: roundServings(i.servings * factor) }));
  }
  const planItems: PlanItem[] = items.map((i) => ({
    foodId: i.food.id,
    servings: i.servings,
    portion: portionLabel(i.food, i.servings),
    ...scaleMacros(i.food, i.servings),
  }));
  return { items: planItems, note, totals: sumMacros(planItems) };
}

export function planTotals(meals: Record<MealSlot, PlanMeal>): Macros {
  return sumMacros(MEAL_SLOTS.map((s) => meals[s].totals));
}
