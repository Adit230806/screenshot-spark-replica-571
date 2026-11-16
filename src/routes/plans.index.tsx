import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { PlanCard } from "@/components/site/PlanCard";
import { CtaBand } from "@/components/site/sections";
import { MEAL_PLANS } from "@/lib/plans";

export const Route = createFileRoute("/plans/")({
  head: () => ({
    meta: [
      { title: "Our Meal Plans — NutriAI" },
      { name: "description", content: "Weight loss, weight gain, muscle building, balanced nutrition and custom AI diet plans with Indian meals." },
      { property: "og:title", content: "Our Meal Plans — NutriAI" },
      { property: "og:description", content: "Goal-based Indian meal plans: weight loss, weight gain, muscle building, balanced and custom AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlansPage,
});

function PlansPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our plans"
        title={<>A plan for every goal, <span className="italic text-primary">and every plate.</span></>}
        description="Each plan uses real Indian meals with calculated portions. Pick a starting point — NutriAI personalises it once you build your health profile."
      />
      <section className="container-page mt-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MEAL_PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>
      </section>
      <CtaBand />
    </SiteLayout>
  );
}
