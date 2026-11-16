import { describe, expect, it } from "vitest";
import { allowedFoods, buildMeal, roundServings } from "./diet-plan";

describe("diet plan rules", () => {
  it("vegetarian plans only contain vegetarian foods", () => {
    expect(allowedFoods("vegetarian").every((f) => f.isVeg)).toBe(true);
    expect(allowedFoods("vegetarian").some((f) => f.id === "chicken-curry")).toBe(false);
  });

  it("eggetarian plans allow eggs but not chicken", () => {
    const ids = allowedFoods("eggetarian").map((f) => f.id);
    expect(ids).toContain("egg-bhurji");
    expect(ids).not.toContain("chicken-curry");
  });

  it("servings are clamped between 0.5 and 3 in half steps", () => {
    expect(roundServings(0.1)).toBe(0.5);
    expect(roundServings(1.3)).toBe(1.5);
    expect(roundServings(9)).toBe(3);
  });

  it("ignores foods that are not in the catalog", () => {
    const meal = buildMeal("breakfast", [{ foodId: "pizza", servings: 1 }, { foodId: "poha", servings: 1 }], 1080, "");
    expect(meal.items.map((i) => i.foodId)).toEqual(["poha"]);
  });
});
