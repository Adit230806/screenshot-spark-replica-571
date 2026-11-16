import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Leaf, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { FoodCard } from "@/components/site/FoodCard";
import { CtaBand } from "@/components/site/sections";
import { FOODS, MENU_CATEGORIES, foodsInCategory, type MenuCategory } from "@/lib/foods";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Healthy Indian Food Menu — NutriAI" },
      { name: "description", content: "Browse healthy Indian breakfasts, lunches, dinners and snacks with calories, protein, carbs and fat." },
      { property: "og:title", content: "Healthy Indian Food Menu — NutriAI" },
      { property: "og:description", content: "Nutritionally mapped Indian dishes: idli, dosa, poha, dal, paneer, salads, smoothies and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [cat, setCat] = useState<MenuCategory | "all">("all");
  const [q, setQ] = useState("");
  const foods = useMemo(() => {
    const list = cat === "all" ? FOODS : foodsInCategory(cat);
    const term = q.trim().toLowerCase();
    return term ? list.filter((f) => f.name.toLowerCase().includes(term) || f.ingredients.some((i) => i.toLowerCase().includes(term))) : list;
  }, [cat, q]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Food menu"
        title={<>Our healthy <span className="italic text-primary">Indian</span> food menu</>}
        description="Every dish is plated for flavour and mapped for nutrition — so you always know what's on your plate."
      />
      <section className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="tablist" aria-label="Menu categories" className="flex flex-wrap gap-2">
            {[{ id: "all" as const, label: "All dishes" }, ...MENU_CATEGORIES].map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={cat === c.id}
                onClick={() => setCat(c.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                  cat === c.id ? "bg-primary text-primary-foreground shadow-glow" : "bg-surface text-muted-foreground hover:bg-mint hover:text-primary-deep",
                )}
              >
                {c.id === "vegetarian" && <Leaf className="size-3.5" />}
                {c.label}
              </button>
            ))}
          </div>
          <div className="relative md:w-72">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes or ingredients" className="h-11 rounded-full pl-10" />
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{foods.length} dishes</p>
        <div key={cat} className="mt-4 grid animate-fade-up gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {foods.map((f) => (
            <FoodCard key={f.id} food={f} />
          ))}
        </div>
        {foods.length === 0 && <p className="py-20 text-center text-muted-foreground">No dishes match “{q}”.</p>}
      </section>
      <CtaBand />
    </SiteLayout>
  );
}
