import { generateResponse, GatewayError, PaymentRequiredError, RateLimitError } from "@lovable.dev/ai-gateway";
import { MEAL_SLOTS, type Food, type MealSlot } from "@/lib/foods";
import { SLOT_CALORIE_SHARE, type NutritionTargets } from "@/lib/nutrition";

const MODEL = "openai/gpt-6-astra" as const;

export class DietAiError extends Error {}

function catalogText(foods: Food[]) {
  return foods
    .map(
      (f) =>
        `${f.id} | ${f.name} | suits: ${f.meals.join("/")} | per serving (${f.serving}): ${f.calories} kcal, P${f.protein} C${f.carbs} F${f.fat}, fibre ${f.fiber}g | ${f.isVeg ? "veg" : "non-veg"} | ingredients: ${f.ingredients.join(", ")}`,
    )
    .join("\n");
}

export interface ProfileContext {
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  activity: string;
  goal: string;
  dietPreference: string;
  allergies: string;
  conditions: string;
  notes: string;
}

function profileText(p: ProfileContext, t: NutritionTargets) {
  return [
    `Age ${p.age}, ${p.gender}, ${p.heightCm} cm, ${p.weightKg} kg, activity: ${p.activity}.`,
    `Goal: ${p.goal}. Diet preference: ${p.dietPreference}.`,
    `Allergies/intolerances: ${p.allergies || "none"}. Health conditions: ${p.conditions || "none"}.`,
    p.notes ? `Extra request from user: ${p.notes}` : "",
    `Daily targets: ${t.calories} kcal, protein ${t.protein} g, carbs ${t.carbs} g, fat ${t.fat} g (BMR ${t.bmr}, TDEE ${t.tdee}).`,
    `Calorie share per meal: ${MEAL_SLOTS.map((s) => `${s} ${Math.round(SLOT_CALORIE_SHARE[s] * 100)}% ≈ ${Math.round(t.calories * SLOT_CALORIE_SHARE[s])} kcal`).join(", ")}.`,
  ]
    .filter(Boolean)
    .join("\n");
}

function extractText(res: unknown): string {
  const r = res as { output_text?: string; output?: { type: string; content?: { type: string; text?: string }[] }[] };
  if (typeof r.output_text === "string" && r.output_text) return r.output_text;
  const parts: string[] = [];
  for (const item of r.output ?? []) {
    if (item.type !== "message") continue;
    for (const c of item.content ?? []) if (c.type === "output_text" && c.text) parts.push(c.text);
  }
  return parts.join("");
}

async function callJson<T>(instructions: string, input: string, name: string, schema: Record<string, unknown>): Promise<T> {
  try {
    const res = await generateResponse({
      model: MODEL,
      instructions,
      input: [{ role: "user", content: input }],
      text: { format: { type: "json_schema", name, strict: true, schema } },
    });
    const text = extractText(res);
    return JSON.parse(text) as T;
  } catch (e) {
    console.error("Diet AI error", e);
    if (e instanceof PaymentRequiredError) throw new DietAiError("AI credits have run out for this workspace. Please top up and try again.");
    if (e instanceof RateLimitError) throw new DietAiError("NutriAI is busy right now. Please try again in a minute.");
    if (e instanceof GatewayError) throw new DietAiError("We couldn't reach the AI nutritionist. Please try again.");
    if (e instanceof SyntaxError) throw new DietAiError("The AI returned an unexpected answer. Please try again.");
    throw e;
  }
}

const SYSTEM = `You are NutriAI, an expert Indian clinical nutritionist. You build practical, delicious daily meal plans using ONLY foods from the provided catalog (refer to them by id). Respect diet preference, allergies and health conditions strictly (e.g. diabetes → prefer lower-GI, high-fibre options; hypertension → avoid heavy/rich gravies). Hit the per-meal calorie share and the daily protein target as closely as possible using 1–3 items per meal and servings in steps of 0.5 (0.5 to 3). Prefer variety across meals. Write warm, concise, encouraging English.`;

const itemSchema = (ids: string[]) => ({
  type: "object",
  additionalProperties: false,
  required: ["foodId", "servings"],
  properties: {
    foodId: { type: "string", enum: ids },
    servings: { type: "number", description: "0.5 to 3 in steps of 0.5" },
  },
});

const mealSchema = (ids: string[]) => ({
  type: "object",
  additionalProperties: false,
  required: ["items", "note"],
  properties: {
    items: { type: "array", items: itemSchema(ids) },
    note: { type: "string", description: "One sentence on why this meal fits the user." },
  },
});

export interface AiPlanSelection {
  summary: string;
  tips: string[];
  meals: Record<MealSlot, { items: { foodId: string; servings: number }[]; note: string }>;
}

export async function aiGeneratePlan(foods: Food[], profile: ProfileContext, targets: NutritionTargets) {
  const ids = foods.map((f) => f.id);
  const schema = {
    type: "object",
    additionalProperties: false,
    required: ["summary", "tips", "meals"],
    properties: {
      summary: { type: "string", description: "2–3 sentence personalised nutrition summary addressed to the user." },
      tips: { type: "array", items: { type: "string" }, description: "Exactly 3 short, practical tips." },
      meals: {
        type: "object",
        additionalProperties: false,
        required: [...MEAL_SLOTS],
        properties: Object.fromEntries(MEAL_SLOTS.map((s) => [s, mealSchema(ids)])),
      },
    },
  };
  return callJson<AiPlanSelection>(
    SYSTEM,
    `USER PROFILE\n${profileText(profile, targets)}\n\nFOOD CATALOG (id | name | suitable meals | nutrition)\n${catalogText(foods)}\n\nCreate today's plan with breakfast, lunch, snacks and dinner. Pick foods whose "suits" list includes the meal. Return JSON.`,
    "diet_plan",
    schema,
  );
}

export async function aiReplaceMeal(
  foods: Food[],
  profile: ProfileContext,
  targets: NutritionTargets,
  slot: MealSlot,
  excludeIds: string[],
) {
  const pool = foods.filter((f) => f.meals.includes(slot) && !excludeIds.includes(f.id));
  const usable = pool.length > 0 ? pool : foods.filter((f) => f.meals.includes(slot));
  const ids = usable.map((f) => f.id);
  return callJson<{ items: { foodId: string; servings: number }[]; note: string }>(
    SYSTEM,
    `USER PROFILE\n${profileText(profile, targets)}\n\nFOOD CATALOG\n${catalogText(usable)}\n\nSuggest a different ${slot} (about ${Math.round(targets.calories * SLOT_CALORIE_SHARE[slot])} kcal) than the current one. Return JSON.`,
    "replacement_meal",
    mealSchema(ids),
  );
}
