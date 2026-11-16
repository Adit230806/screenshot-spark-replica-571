import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FoodCard } from "@/components/site/FoodCard";
import { getPlan } from "@/lib/plans";
import { FOOD_BY_ID } from "@/lib/foods";

export const Route = createFileRoute("/plans/$planId")({
  loader: ({ params }) => {
    const plan = getPlan(params.planId);
    if (!plan) throw notFound();
    return { planId: plan.id, title: plan.title, description: plan.description };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — NutriAI` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.title} — NutriAI` },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Plan unavailable — NutriAI" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-page py-32 text-center">
        <h1 className="text-4xl text-primary-deep">Plan not found</h1>
        <Button asChild variant="hero" className="mt-6">
          <Link to="/plans">See all plans</Link>
        </Button>
      </div>
    </SiteLayout>
  ),
  component: PlanDetail,
});

function PlanDetail() {
  const { planId } = Route.useLoaderData();
  const plan = getPlan(planId)!;
  const macros = [
    { label: "Protein", v: plan.split.protein, cls: "bg-macro-protein" },
    { label: "Carbs", v: plan.split.carbs, cls: "bg-macro-carbs" },
    { label: "Fat", v: plan.split.fat, cls: "bg-macro-fat" },
  ];
  return (
    <SiteLayout>
      <section className="bg-hero">
        <div className="container-page grid items-center gap-12 py-12 md:py-20 lg:grid-cols-2">
          <div className="animate-fade-up">
            <Link to="/plans" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-deep">
              <ArrowLeft className="size-4" /> All plans
            </Link>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-saffron">{plan.tagline}</p>
            <h1 className="mt-2 text-5xl font-medium leading-[1.05] text-primary-deep md:text-6xl">{plan.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{plan.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-semibold text-primary-deep shadow-soft">
              <Flame className="size-4 text-saffron" /> {plan.calories}
            </div>
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Macro split</p>
              <div className="mt-3 flex h-3 overflow-hidden rounded-full">
                {macros.map((m) => (
                  <div key={m.label} className={m.cls} style={{ width: `${m.v}%` }} />
                ))}
              </div>
              <div className="mt-3 flex gap-5 text-sm">
                {macros.map((m) => (
                  <span key={m.label} className="flex items-center gap-1.5">
                    <span className={`size-2.5 rounded-full ${m.cls}`} /> {m.label} {m.v}%
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/auth" search={{ mode: "signup" }}>
                  Start this plan <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="line" size="xl">
                <Link to="/menu">Browse the menu</Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
            <img src={plan.image} alt={plan.title} width={900} height={900} className="aspect-square w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="container-page mt-20 grid gap-8 md:grid-cols-2">
        {[
          { t: "Key nutrition benefits", items: plan.benefits },
          { t: "Ideal for", items: plan.idealFor },
        ].map((b) => (
          <div key={b.t} className="rounded-[1.75rem] border border-border/70 bg-surface p-8">
            <h2 className="text-2xl font-medium text-primary-deep">{b.t}</h2>
            <ul className="mt-5 space-y-3">
              {b.items.map((i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3.5" />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="container-page mt-20">
        <span className="eyebrow">A sample day</span>
        <h2 className="mt-3 text-4xl font-medium text-primary-deep">What a day on this plan looks like</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plan.sampleDay.map((d) => {
            const food = FOOD_BY_ID[d.foodId]!;
            return (
              <div key={d.slot}>
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">{d.slot}</p>
                <FoodCard food={food} />
              </div>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
