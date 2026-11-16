import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  ChartLine,
  ClipboardList,
  Database,
  HeartPulse,
  Salad,
  Sparkles,
  Star,
  Target,
  UserRound,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SiteLayout";
import { FOOD_BY_ID } from "@/lib/foods";
import priya from "@/assets/people/priya.jpg";
import arjun from "@/assets/people/arjun.jpg";
import meera from "@/assets/people/meera.jpg";

const STEPS = [
  {
    icon: UserRound,
    title: "Create Your Health Profile",
    text: "Share your age, height, weight, activity, goals, food preferences, allergies and health conditions.",
    image: FOOD_BY_ID["curd-bowl"]!.image,
  },
  {
    icon: BrainCircuit,
    title: "AI Analyzes Your Nutrition Requirements",
    text: "NutriAI calculates your BMR, daily energy needs and ideal macro split using proven nutrition science.",
    image: FOOD_BY_ID["sprouts-paneer-salad"]!.image,
  },
  {
    icon: ClipboardList,
    title: "Receive Your Personalized Diet Plan",
    text: "Get a full day of Indian meals with portions and nutrition — swap any meal and download it as a PDF.",
    image: FOOD_BY_ID["healthy-thali"]!.image,
  },
];

export function HowItWorksSteps() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {STEPS.map((s, i) => (
        <article key={s.title} className="card-lift group relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-soft">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img src={s.image} alt="" loading="lazy" width={900} height={900} className="food-img" />
            <div className="absolute inset-0 bg-image-fade opacity-70" />
            <span className="absolute bottom-4 left-5 font-display text-6xl font-medium text-primary-foreground/95">0{i + 1}</span>
          </div>
          <div className="p-6">
            <div className="grid size-11 place-items-center rounded-2xl bg-mint text-primary">
              <s.icon className="size-5" />
            </div>
            <h3 className="mt-4 font-display text-xl font-medium text-primary-deep">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

const WHY = [
  { icon: Sparkles, title: "AI-powered recommendations", text: "Meal suggestions that learn from your profile, goals and feedback." },
  { icon: Target, title: "Personalized meal plans", text: "Calorie and macro targets calculated precisely for your body." },
  { icon: Database, title: "Indian food database", text: "Curated, nutritionally-mapped dishes from every corner of India." },
  { icon: Salad, title: "Nutrition tracking", text: "Log meals in seconds and see calories, protein, carbs and fat." },
  { icon: ChartLine, title: "Health progress monitoring", text: "Track weight, BMI and calorie trends with clear charts." },
  { icon: HeartPulse, title: "Smart diet optimization", text: "Allergy- and condition-aware swaps that keep you on target." },
];

export function WhyChooseGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {WHY.map((w) => (
        <div key={w.title} className="group rounded-3xl border border-border/70 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card">
          <div className="grid size-12 place-items-center rounded-2xl bg-mint text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <w.icon className="size-5" />
          </div>
          <h3 className="mt-5 font-display text-xl font-medium text-primary-deep">{w.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
        </div>
      ))}
    </div>
  );
}

const TESTIMONIALS = [
  {
    name: "Priya S.",
    role: "Software engineer, Pune",
    photo: priya,
    quote: "I lost 6 kg in three months without giving up poha or dal-chawal. The plans feel like home food, just smarter.",
    rating: 5,
  },
  {
    name: "Arjun M.",
    role: "Fitness enthusiast, Bengaluru",
    photo: arjun,
    quote: "Hitting 130 g of protein as a near-vegetarian used to be hard. NutriAI's swaps made it effortless.",
    rating: 5,
  },
  {
    name: "Meera K.",
    role: "Retired teacher, Chennai",
    photo: meera,
    quote: "With my sugar levels in mind it suggested lower-GI breakfasts. My readings have never been this steady.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="flex flex-col rounded-[1.75rem] border border-border/70 bg-card p-7 shadow-soft">
            <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={i < t.rating ? "size-4 fill-saffron text-saffron" : "size-4 text-border"} />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed text-primary-deep">“{t.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <img src={t.photo} alt={t.name} loading="lazy" width={400} height={400} className="size-12 rounded-full object-cover ring-2 ring-mint" />
              <div>
                <div className="text-sm font-bold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">Demonstration testimonials for illustration purposes.</p>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="container-page mt-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-brand px-8 py-14 text-primary-foreground md:px-16 md:py-20">
        <img
          src={FOOD_BY_ID["quinoa-chana-bowl"]!.image}
          alt=""
          loading="lazy"
          width={900}
          height={900}
          className="pointer-events-none absolute -right-16 -top-10 hidden h-[130%] w-auto rounded-full object-cover opacity-90 shadow-lift md:block"
        />
        <div className="relative max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]">
            <Utensils className="size-3.5" /> Start free today
          </span>
          <h2 className="mt-4 text-4xl font-medium leading-tight md:text-5xl">Your personal AI nutritionist is ready.</h2>
          <p className="mt-4 text-primary-foreground/80">Build your health profile in two minutes and get a complete Indian diet plan instantly.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="light">
              <Link to="/auth" search={{ mode: "signup" }}>
                Get Your Diet Plan <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost-light">
              <Link to="/menu">Explore Our Menu</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhySection() {
  return (
    <section className="container-page mt-28">
      <SectionHeading
        eyebrow="Why NutriAI"
        title="Nutrition science, made personal."
        description="Everything you need to eat better — from smart recommendations to progress tracking — in one beautifully simple place."
      />
      <div className="mt-12">
        <WhyChooseGrid />
      </div>
    </section>
  );
}
