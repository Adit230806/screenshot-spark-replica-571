import { describe, expect, it } from "vitest";
import { bmiCategory, calculateBmi, calculateBmr, calculateTargets, scaleMacros } from "./nutrition";

describe("nutrition rules", () => {
  it("computes BMI from kg and cm", () => {
    expect(calculateBmi(70, 175)).toBe(22.9);
  });

  it("uses WHO BMI categories", () => {
    expect(bmiCategory(18.4)).toBe("Underweight");
    expect(bmiCategory(24.9)).toBe("Normal");
    expect(bmiCategory(25)).toBe("Overweight");
    expect(bmiCategory(30)).toBe("Obese");
  });

  it("uses Mifflin–St Jeor for BMR", () => {
    expect(calculateBmr({ weightKg: 70, heightCm: 175, age: 30, gender: "male" })).toBe(1649);
    expect(calculateBmr({ weightKg: 60, heightCm: 160, age: 30, gender: "female" })).toBe(1289);
  });

  it("applies a 500 kcal deficit for weight loss", () => {
    const t = calculateTargets({ weightKg: 70, heightCm: 175, age: 30, gender: "male", activity: "moderate", goal: "weight_loss" });
    expect(t.tdee).toBe(2556);
    expect(t.calories).toBe(2060);
  });

  it("never goes below 1200 kcal", () => {
    const t = calculateTargets({ weightKg: 40, heightCm: 145, age: 70, gender: "female", activity: "sedentary", goal: "weight_loss" });
    expect(t.calories).toBe(1200);
  });

  it("scales macros by servings", () => {
    expect(scaleMacros({ calories: 300, protein: 20, carbs: 30, fat: 10 }, 1.5)).toEqual({ calories: 450, protein: 30, carbs: 45, fat: 15 });
  });
});
