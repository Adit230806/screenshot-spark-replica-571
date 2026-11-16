import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout, SectionHeading } from "@/components/site/SiteLayout";
import { CtaBand, HowItWorksSteps } from "@/components/site/sections";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How NutriAI Works — From Profile to Personal Diet Plan" },
      { name: "description", content: "Create your health profile, let AI analyse your nutrition needs, and receive a personalised Indian diet plan." },
      { property: "og:title", content: "How NutriAI Works" },
      { property: "og:description", content: "Three simple steps to a personalised, AI-generated Indian diet plan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowPage,
});

const FAQ: [string, string][] = [
  ["How are my calorie targets calculated?", "We use the Mifflin–St Jeor equation to estimate your basal metabolic rate, multiply it by your activity level, then adjust for your goal (for example −500 kcal for weight loss). Targets never go below 1,200 kcal."],
  ["Can I follow a vegetarian or eggetarian diet?", "Yes. Choose vegetarian, eggetarian or non-vegetarian in your health profile and NutriAI only recommends matching dishes."],
  ["What if I don't like a suggested meal?", "Tap “Replace Meal” on any meal and the AI suggests an alternative that still fits your targets."],
  ["Is NutriAI a substitute for a doctor?", "No. NutriAI provides general nutrition guidance. If you have a medical condition, please consult your doctor or a registered dietitian."],
];

function HowPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="How it works"
        title={<>From your profile to <span className="italic text-primary">your plate.</span></>}
        description="NutriAI does the maths and the menu planning, so you can focus on enjoying good food."
      />
      <section className="container-page">
        <HowItWorksSteps />
      </section>
      <section className="container-page mt-28 max-w-3xl">
        <SectionHeading eyebrow="Questions" title="Good to know" />
        <Accordion type="single" collapsible className="mt-10">
          {FAQ.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left font-display text-lg text-primary-deep">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <CtaBand />
    </SiteLayout>
  );
}
