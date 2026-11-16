import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BrainCircuit, Check, Flame, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout, SectionHeading } from "@/components/site/SiteLayout";
import { PlanCard } from "@/components/site/PlanCard";
import { FoodCard } from "@/components/site/FoodCard";
import { CtaBand, HowItWorksSteps, Testimonials, WhySection } from "@/components/site/sections";
import { MEAL_PLANS } from "@/lib/plans";
import { MENU_CATEGORIES, foodImages, foodsInCategory, type MenuCategory } from "@/lib/foods";
import { cn } from "@/lib/utils";
import lifestyle from "@/assets/lifestyle-kitchen.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NutriAI — Eat Healthy. Live Better. Powered by AI." },
      {
        name: "description",
        content: "Personalised Indian diet plans built around your health, lifestyle and fitness goals — powered by AI.",
      },
      { property: "og:title", content: "NutriAI — Eat Healthy. Live Better. Powered by AI." },
      {
        property: "og:description",
        content: "Personalised Indian diet plans built around your health, lifestyle and fitness goals — powered by AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <PlansSection />
      <MenuSection />
      <AboutSection />
      <section className="container-page mt-28">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps to your perfect plate."
          description="From profile to plate in minutes — no guesswork, no bland diet food."
        />
        <div className="mt-12">
          <HowItWorksSteps />
        </div>
      </section>
      <WhySection />
      <section className="mt-28 bg-mint-fade py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Loved by members" title="Real food. Real results." />
          <div className="mt-12">
            <Testimonials />
          </div>
        </div>
      </section>
      <CtaBand />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative -mt-[4.5rem] overflow-hidden bg-hero pt-[4.5rem]">
      <div className="container-page grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3.5 py-1.5 text-xs font-semibold text-primary-deep backdrop-blur">
            <Sparkles className="size-3.5 text-saffron" /> AI nutritionist for Indian kitchens
          </span>
          <h1 className="mt-6 text-[2.9rem] font-medium leading-[1.02] text-primary-deep sm:text-6xl xl:text-7xl">
            Eat Healthy.
            <br />
            Live Better.
            <br />
            <span className="italic text-primary">Powered by AI.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Discover personalized nutrition plans designed around your health, lifestyle, and fitness goals.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/auth" search={{ mode: "signup" }}>
                Get Your Diet Plan <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="line" size="xl">
              <Link to="/menu">Explore Our Menu</Link>
            </Button>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              ["20+", "Indian dishes mapped"],
              ["5", "Goal-based plans"],
              ["2 min", "To your first plan"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-medium text-primary-deep">{n}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-mint" />
          <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
            <img
              src={foodImages.heroThali}
              alt="A healthy Indian thali with dal, palak paneer, sabzi, raita, rice and roti"
              width={1200}
              height={1000}
              className="aspect-[6/5] w-full object-cover"
            />
          </div>
          <div className="animate-float absolute -left-4 top-10 hidden rounded-2xl bg-background/95 p-4 shadow-card backdrop-blur sm:block">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-mint text-primary">
                <BrainCircuit className="size-5" />
              </div>
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">AI match</p>
                <p className="text-sm font-bold text-primary-deep">Balanced thali · 98%</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 right-4 rounded-2xl bg-background/95 p-4 shadow-card backdrop-blur sm:right-8">
            <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
              <Flame className="size-3.5 text-saffron" /> Today's target
            </p>
            <p className="mt-1 font-display text-2xl font-medium text-primary-deep">1,850 kcal</p>
            <div className="mt-2 flex gap-1.5 text-[0.7rem] font-semibold">
              <span className="rounded-full bg-mint px-2 py-0.5 text-primary-deep">P 110g</span>
              <span className="rounded-full bg-saffron-soft px-2 py-0.5 text-primary-deep">C 210g</span>
              <span className="rounded-full bg-surface px-2 py-0.5 text-primary-deep">F 60g</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlansSection() {
  const [featured, ...rest] = [MEAL_PLANS[4]!, ...MEAL_PLANS.slice(0, 4)];
  return (
    <section className="container-page mt-24">
      <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
        <SectionHeading
          align="left"
          eyebrow="Our meal plans"
          title="Plans designed for every goal."
          description="Science-backed nutrition plans made with the Indian food you already love."
        />
        <Button asChild variant="line">
          <Link to="/plans">
            View all plans <ArrowRight />
          </Link>
        </Button>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((p) => (
          <PlanCard key={p.id} plan={p} />
        ))}
      </div>
      <div className="mt-6 grid overflow-hidden rounded-[2rem] border border-border/70 bg-surface shadow-soft md:grid-cols-2">
        <div className="relative min-h-72 overflow-hidden">
          <img src={featured.image} alt={featured.title} loading="lazy" width={900} height={900} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12">
          <span className="eyebrow">
            <Sparkles className="size-3.5" /> Most personal
          </span>
          <h3 className="mt-3 font-display text-4xl font-medium text-primary-deep">{featured.title}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{featured.description}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {[...featured.benefits, "Downloadable PDF plan"].map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm">
                <Check className="size-4 text-primary" /> {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/auth" search={{ mode: "signup" }}>Build my AI plan</Link>
            </Button>
            <Button asChild variant="line" size="lg">
              <Link to="/plans/$planId" params={{ planId: featured.id }}>Explore Plan</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const [cat, setCat] = useState<MenuCategory>("breakfast");
  const foods = foodsInCategory(cat).slice(0, 8);
  return (
    <section className="mt-28 bg-surface py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our healthy food menu"
          title="Beautiful food, honest nutrition."
          description="Every dish is nutritionally mapped — calories, protein, carbs and fat — so healthy eating never feels like a guess."
        />
        <div role="tablist" aria-label="Menu categories" className="mt-10 flex flex-wrap justify-center gap-2">
          {MENU_CATEGORIES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cat === c.id}
              onClick={() => setCat(c.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                cat === c.id ? "bg-primary text-primary-foreground shadow-glow" : "bg-background text-muted-foreground shadow-soft hover:text-primary-deep",
              )}
            >
              {c.id === "vegetarian" && <Leaf className="size-3.5" />}
              {c.label}
            </button>
          ))}
        </div>
        <div key={cat} className="mt-10 grid animate-fade-up gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {foods.map((f) => (
            <FoodCard key={f.id} food={f} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="deep" size="lg">
            <Link to="/menu">
              See the full menu <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="container-page mt-28 grid items-center gap-14 lg:grid-cols-2">
      <div className="relative">
        <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
          <img src={lifestyle} alt="A woman preparing a healthy salad while checking her NutriAI plan" loading="lazy" width={840} height={1200} className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="absolute -bottom-8 -right-2 hidden w-56 rounded-3xl bg-primary-deep p-6 text-primary-foreground shadow-lift sm:block">
          <p className="font-display text-2xl font-medium leading-snug">Built for Indian kitchens</p>
          <p className="mt-2 text-sm text-primary-foreground/75">Dal, dosa, paneer, poha — your plan speaks your food language.</p>
        </div>
      </div>
      <div>
        <span className="eyebrow">About NutriAI</span>
        <h2 className="mt-3 text-4xl font-medium leading-[1.1] text-primary-deep md:text-5xl">Your Health Journey, Powered by Intelligence.</h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          NutriAI combines nutrition science, machine learning and diet optimization to turn your health profile into
          meals you'll genuinely enjoy — dal, dosa, paneer and all.
        </p>
        <div className="mt-8 space-y-5">
          {[
            ["Our mission", "Make expert, personalised nutrition accessible to every Indian household — affordable, practical and rooted in local food."],
            ["Our technology", "Evidence-based energy equations, a mapped Indian food database and AI models that balance taste, culture and your targets."],
          ].map(([t, d]) => (
            <div key={t} className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
              <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-xl bg-mint text-primary">
                <Check className="size-4" />
              </span>
              <div>
                <h3 className="font-display text-lg font-medium text-primary-deep">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
        <Button asChild variant="line" size="lg" className="mt-8">
          <Link to="/about">
            Learn more about us <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
