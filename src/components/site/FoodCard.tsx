import { useState } from "react";
import { Leaf, Flame, Drumstick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { MEAL_SLOT_LABEL, type Food } from "@/lib/foods";
import { cn } from "@/lib/utils";

export function MacroStat({ label, value, unit, tone }: { label: string; value: number; unit: string; tone: "calories" | "protein" | "carbs" | "fat" }) {
  const dot = {
    calories: "bg-macro-calories",
    protein: "bg-macro-protein",
    carbs: "bg-macro-carbs",
    fat: "bg-macro-fat",
  }[tone];
  return (
    <div className="rounded-xl bg-surface px-2 py-2 text-center">
      <div className="flex items-center justify-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
        <span className={cn("size-1.5 rounded-full", dot)} />
        {label}
      </div>
      <div className="mt-0.5 text-sm font-bold text-foreground">
        {value}
        <span className="ml-0.5 text-xs font-medium text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}

export function FoodBadge({ food }: { food: Food }) {
  return (
    <div className="absolute left-3 top-3 flex gap-1.5">
      <span className="inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[0.7rem] font-semibold text-primary-deep backdrop-blur">
        {food.isVeg ? <Leaf className="size-3 text-primary" /> : <Drumstick className="size-3 text-saffron" />}
        {food.isVeg ? "Veg" : "Non-veg"}
      </span>
      {food.highProtein && (
        <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-[0.7rem] font-semibold text-primary-foreground">
          High protein
        </span>
      )}
    </div>
  );
}

export function FoodCard({ food, action }: { food: Food; action?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <article className="card-lift group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={food.image} alt={food.name} loading="lazy" width={900} height={900} className="food-img" />
          <FoodBadge food={food} />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-3 py-1 text-xs font-bold text-primary-deep shadow-soft">
            <Flame className="size-3.5 text-saffron" /> {food.calories} kcal
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-xl font-medium leading-snug text-primary-deep">{food.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{food.serving}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <MacroStat label="Protein" value={food.protein} unit="g" tone="protein" />
            <MacroStat label="Carbs" value={food.carbs} unit="g" tone="carbs" />
            <MacroStat label="Fat" value={food.fat} unit="g" tone="fat" />
          </div>
          <div className="mt-5 flex gap-2">
            <Button variant="soft" className="flex-1" onClick={() => setOpen(true)}>
              View Details
            </Button>
            {action}
          </div>
        </div>
      </article>
      <FoodDetailDialog food={food} open={open} onOpenChange={setOpen} />
    </>
  );
}

export function FoodDetailDialog({ food, open, onOpenChange }: { food: Food; open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden rounded-3xl p-0 sm:rounded-3xl">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto">
            <img src={food.image} alt={food.name} className="h-full w-full object-cover" width={900} height={900} />
            <FoodBadge food={food} />
          </div>
          <div className="p-7">
            <div className="flex flex-wrap gap-1.5">
              {food.meals.map((m) => (
                <span key={m} className="rounded-full bg-mint px-2.5 py-0.5 text-xs font-semibold text-primary-deep">
                  {MEAL_SLOT_LABEL[m]}
                </span>
              ))}
            </div>
            <DialogTitle className="mt-3 font-display text-3xl font-medium text-primary-deep">{food.name}</DialogTitle>
            <DialogDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">{food.description}</DialogDescription>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Per serving · {food.serving}</p>
            <div className="mt-2 grid grid-cols-4 gap-2">
              <MacroStat label="Kcal" value={food.calories} unit="" tone="calories" />
              <MacroStat label="Protein" value={food.protein} unit="g" tone="protein" />
              <MacroStat label="Carbs" value={food.carbs} unit="g" tone="carbs" />
              <MacroStat label="Fat" value={food.fat} unit="g" tone="fat" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Fibre <span className="font-semibold text-foreground">{food.fiber} g</span>
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key ingredients</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {food.ingredients.map((i) => (
                <span key={i} className="rounded-full border border-border px-3 py-1 text-xs text-foreground">
                  {i}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
