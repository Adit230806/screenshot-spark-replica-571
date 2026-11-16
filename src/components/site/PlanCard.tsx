import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MealPlanInfo } from "@/lib/plans";

export function PlanCard({ plan }: { plan: MealPlanInfo }) {
  return (
    <article className="card-lift group flex flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-soft">
      <div className="relative aspect-[5/4] overflow-hidden">
        <img src={plan.image} alt={plan.title} loading="lazy" width={900} height={900} className="food-img" />
        <div className="absolute inset-0 bg-image-fade opacity-60" />
        <span className="absolute bottom-4 left-4 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-primary-deep">
          {plan.calories}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-saffron">{plan.tagline}</p>
        <h3 className="mt-2 font-display text-2xl font-medium text-primary-deep">{plan.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
        <ul className="mt-4 space-y-2">
          {plan.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-foreground">
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-mint">
                <Check className="size-3 text-primary" />
              </span>
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <Button asChild variant="deep" className="w-full">
            <Link to="/plans/$planId" params={{ planId: plan.id }}>
              Explore Plan <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
