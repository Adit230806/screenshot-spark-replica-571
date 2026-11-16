import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit, FlaskConical, HeartHandshake, Leaf } from "lucide-react";
import { PageHero, SiteLayout, SectionHeading } from "@/components/site/SiteLayout";
import { CtaBand, WhyChooseGrid } from "@/components/site/sections";
import lifestyle from "@/assets/lifestyle-kitchen.jpg";
import { foodImages } from "@/lib/foods";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NutriAI — Your Health Journey, Powered by Intelligence" },
      { name: "description", content: "How NutriAI combines nutrition science, machine learning and diet optimization for personalised Indian meal plans." },
      { property: "og:title", content: "About NutriAI" },
      { property: "og:description", content: "Nutrition science + machine learning + Indian food = personalised meal plans you'll love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  { icon: FlaskConical, t: "Nutrition science", d: "Mifflin–St Jeor energy equations, evidence-based macro ranges and WHO BMI guidance form the foundation of every plan." },
  { icon: BrainCircuit, t: "Machine learning", d: "AI models read your profile — goals, conditions, allergies, preferences — and select meals that fit like a glove." },
  { icon: Leaf, t: "Diet optimization", d: "Portions are tuned so every meal lands on its calorie share while protein, carbs and fat stay on target." },
  { icon: HeartHandshake, t: "Rooted in Indian food", d: "From South Indian breakfasts to North Indian thalis — we optimise the food you grew up with, not replace it." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About us"
        title={<>Your Health Journey, <span className="italic text-primary">Powered by Intelligence.</span></>}
        description="NutriAI is an AI-powered nutrition platform that turns your health profile into personalised, practical Indian meal plans."
      />
      <section className="container-page grid items-center gap-14 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
          <img src={lifestyle} alt="Preparing a healthy meal at home" width={840} height={1200} className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="space-y-10">
          <div>
            <span className="eyebrow">Who we are</span>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              We're a team of nutritionists, engineers and food lovers who believe healthy eating should feel familiar.
              Generic diet charts ignore how India actually eats — NutriAI starts from your kitchen and your goals.
            </p>
          </div>
          <div>
            <span className="eyebrow">Our mission</span>
            <p className="mt-3 font-display text-2xl leading-snug text-primary-deep">
              Make expert, personalised nutrition accessible to every Indian household.
            </p>
          </div>
          <div>
            <span className="eyebrow">Our technology</span>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              A mapped Indian food database, proven energy equations and modern AI work together: we calculate your
              targets, the AI chooses meals that suit you, and our optimiser fine-tunes portions so the numbers add up.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-28 bg-surface py-24">
        <div className="container-page">
          <SectionHeading eyebrow="How we think" title="Four pillars behind every plan." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PILLARS.map((p) => (
              <div key={p.t} className="flex gap-5 rounded-3xl bg-card p-7 shadow-soft">
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mint text-primary">
                  <p.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium text-primary-deep">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page mt-28">
        <div className="grid gap-4 sm:grid-cols-3">
          {[foodImages.balanced, foodImages.weightLoss, foodImages.custom].map((src, i) => (
            <div key={i} className="overflow-hidden rounded-3xl shadow-soft">
              <img src={src} alt="" loading="lazy" width={900} height={900} className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-28">
        <SectionHeading eyebrow="Why choose NutriAI" title="Everything you need to eat better." />
        <div className="mt-12">
          <WhyChooseGrid />
        </div>
      </section>
      <CtaBand />
    </SiteLayout>
  );
}
