export type Gender = "male" | "female" | "other";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
export type Goal = "weight_loss" | "weight_gain" | "muscle_gain" | "balanced";

export const ACTIVITY_LEVELS: { id: ActivityLevel; label: string; hint: string; factor: number }[] = [
  { id: "sedentary", label: "Sedentary", hint: "Desk job, little exercise", factor: 1.2 },
  { id: "light", label: "Lightly active", hint: "Exercise 1–3 days/week", factor: 1.375 },
  { id: "moderate", label: "Moderately active", hint: "Exercise 3–5 days/week", factor: 1.55 },
  { id: "active", label: "Very active", hint: "Exercise 6–7 days/week", factor: 1.725 },
  { id: "very_active", label: "Athlete", hint: "Hard training or physical job", factor: 1.9 },
];

export const GOALS: { id: Goal; label: string; adjustment: number; split: MacroSplit }[] = [
  { id: "weight_loss", label: "Lose weight", adjustment: -500, split: { protein: 30, carbs: 40, fat: 30 } },
  { id: "weight_gain", label: "Gain weight", adjustment: 400, split: { protein: 20, carbs: 50, fat: 30 } },
  { id: "muscle_gain", label: "Build muscle", adjustment: 300, split: { protein: 30, carbs: 45, fat: 25 } },
  { id: "balanced", label: "Eat balanced", adjustment: 0, split: { protein: 20, carbs: 50, fat: 30 } },
];

export interface MacroSplit {
  protein: number;
  carbs: number;
  fat: number;
}

export const MIN_DAILY_CALORIES = 1200;

/** Body Mass Index, rounded to one decimal. */
export function calculateBmi(weightKg: number, heightCm: number): number {
  if (weightKg <= 0 || heightCm <= 0) return 0;
  const m = heightCm / 100;
  return Math.round((weightKg / (m * m)) * 10) / 10;
}

export type BmiCategory = "Underweight" | "Normal" | "Overweight" | "Obese";

/** WHO adult BMI categories. */
export function bmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

/** Mifflin–St Jeor basal metabolic rate (kcal/day). */
export function calculateBmr(p: { weightKg: number; heightCm: number; age: number; gender: Gender }): number {
  const base = 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age;
  const offset = p.gender === "male" ? 5 : p.gender === "female" ? -161 : -78;
  return Math.round(base + offset);
}

export function activityFactor(level: ActivityLevel): number {
  return ACTIVITY_LEVELS.find((a) => a.id === level)?.factor ?? 1.55;
}

export function goalInfo(goal: Goal) {
  return GOALS.find((g) => g.id === goal) ?? GOALS[3]!;
}

export interface NutritionTargets {
  bmr: number;
  tdee: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  split: MacroSplit;
}

/** Daily calorie and macro targets from a health profile. */
export function calculateTargets(p: {
  weightKg: number;
  heightCm: number;
  age: number;
  gender: Gender;
  activity: ActivityLevel;
  goal: Goal;
}): NutritionTargets {
  const bmr = calculateBmr(p);
  const tdee = Math.round(bmr * activityFactor(p.activity));
  const g = goalInfo(p.goal);
  const calories = Math.max(MIN_DAILY_CALORIES, Math.round((tdee + g.adjustment) / 10) * 10);
  return {
    bmr,
    tdee,
    calories,
    protein: Math.round((calories * g.split.protein) / 100 / 4),
    carbs: Math.round((calories * g.split.carbs) / 100 / 4),
    fat: Math.round((calories * g.split.fat) / 100 / 9),
    split: g.split,
  };
}

/** Share of the daily calorie target given to each meal. */
export const SLOT_CALORIE_SHARE = { breakfast: 0.25, lunch: 0.35, snacks: 0.1, dinner: 0.3 } as const;

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function scaleMacros(m: Macros, servings: number): Macros {
  return {
    calories: Math.round(m.calories * servings),
    protein: Math.round(m.protein * servings * 10) / 10,
    carbs: Math.round(m.carbs * servings * 10) / 10,
    fat: Math.round(m.fat * servings * 10) / 10,
  };
}

export function sumMacros(list: Macros[]): Macros {
  return list.reduce(
    (acc, m) => ({
      calories: acc.calories + Number(m.calories),
      protein: Math.round((acc.protein + Number(m.protein)) * 10) / 10,
      carbs: Math.round((acc.carbs + Number(m.carbs)) * 10) / 10,
      fat: Math.round((acc.fat + Number(m.fat)) * 10) / 10,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

export interface ProfileLike {
  age: number | null;
  gender: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  activity_level: string | null;
  goal: string | null;
}

export function isProfileComplete(p: ProfileLike | null | undefined): boolean {
  return !!p && !!p.age && !!p.height_cm && !!p.weight_kg && !!p.gender;
}

export function targetsFromProfile(p: ProfileLike | null | undefined): NutritionTargets | null {
  if (!p || !isProfileComplete(p)) return null;
  return calculateTargets({
    weightKg: Number(p.weight_kg),
    heightCm: Number(p.height_cm),
    age: Number(p.age),
    gender: (p.gender as Gender) ?? "other",
    activity: (p.activity_level as ActivityLevel) ?? "moderate",
    goal: (p.goal as Goal) ?? "balanced",
  });
}
