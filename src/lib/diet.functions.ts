import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Json } from "@/integrations/supabase/types";
import { MEAL_SLOTS, type MealSlot } from "@/lib/foods";
import { allowedFoods, buildMeal, planTotals, type DietPlan, type PlanMeal } from "@/lib/diet-plan";
import { isProfileComplete, targetsFromProfile } from "@/lib/nutrition";

type Result = { ok: true; plan: DietPlan; id: string } | { ok: false; error: string };

async function loadProfile(supabase: any, userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) throw new Error("Could not load your health profile.");
  return data;
}

function profileContext(p: any, notes: string) {
  return {
    age: Number(p.age),
    gender: String(p.gender),
    heightCm: Number(p.height_cm),
    weightKg: Number(p.weight_kg),
    activity: String(p.activity_level ?? "moderate"),
    goal: String(p.goal ?? "balanced"),
    dietPreference: String(p.diet_preference ?? "vegetarian"),
    allergies: String(p.allergies ?? ""),
    conditions: String(p.health_conditions ?? ""),
    notes,
  };
}

export const generateDietPlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ notes: z.string().trim().max(500).default("") }).parse(d ?? {}))
  .handler(async ({ data, context }): Promise<Result> => {
    const { supabase, userId } = context;
    const profile = await loadProfile(supabase, userId);
    if (!isProfileComplete(profile)) return { ok: false, error: "Please complete your health profile first." };
    const targets = targetsFromProfile(profile)!;
    const foods = allowedFoods(profile.diet_preference);
    const { DietAiError, aiGeneratePlan } = await import("@/lib/diet-ai.server");
    try {
      const sel = await aiGeneratePlan(foods, profileContext(profile, data.notes), targets);
      const meals = Object.fromEntries(
        MEAL_SLOTS.map((s) => [s, buildMeal(s, sel.meals[s]?.items ?? [], targets.calories, sel.meals[s]?.note ?? "")]),
      ) as Record<MealSlot, PlanMeal>;
      const plan: DietPlan = {
        goal: String(profile.goal ?? "balanced"),
        targets,
        summary: sel.summary,
        tips: (sel.tips ?? []).slice(0, 3),
        meals,
        totals: planTotals(meals),
        generatedAt: new Date().toISOString(),
      };
      const { data: row, error } = await supabase
        .from("diet_plans")
        .insert({ user_id: userId, plan: plan as unknown as Json })
        .select("id")
        .single();
      if (error) throw new Error("Could not save your plan.");
      return { ok: true, plan, id: row.id };
    } catch (e) {
      if (e instanceof DietAiError) return { ok: false, error: e.message };
      throw e;
    }
  });

export const replacePlanMeal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ planId: z.string().uuid(), slot: z.enum(["breakfast", "lunch", "snacks", "dinner"]) }).parse(d),
  )
  .handler(async ({ data, context }): Promise<Result> => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase.from("diet_plans").select("id, plan").eq("id", data.planId).maybeSingle();
    if (error || !row) return { ok: false, error: "Plan not found." };
    const plan = row.plan as unknown as DietPlan;
    const profile = await loadProfile(supabase, userId);
    if (!isProfileComplete(profile)) return { ok: false, error: "Please complete your health profile first." };
    const foods = allowedFoods(profile.diet_preference);
    const { DietAiError, aiReplaceMeal } = await import("@/lib/diet-ai.server");
    try {
      const current = plan.meals[data.slot].items.map((i) => i.foodId);
      const sel = await aiReplaceMeal(foods, profileContext(profile, ""), plan.targets, data.slot, current);
      plan.meals[data.slot] = buildMeal(data.slot, sel.items, plan.targets.calories, sel.note);
      plan.totals = planTotals(plan.meals);
      const { error: upErr } = await supabase
        .from("diet_plans")
        .update({ plan: plan as unknown as Json })
        .eq("id", data.planId);
      if (upErr) throw new Error("Could not update your plan.");
      return { ok: true, plan, id: data.planId };
    } catch (e) {
      if (e instanceof DietAiError) return { ok: false, error: e.message };
      throw e;
    }
  });
