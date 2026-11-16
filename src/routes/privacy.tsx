import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — NutriAI" },
      { name: "description", content: "How NutriAI collects, uses and protects your personal and health data." },
      { property: "og:title", content: "Privacy Policy — NutriAI" },
      { property: "og:description", content: "How NutriAI collects, uses and protects your personal and health data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="How NutriAI collects, uses and protects your personal and health data." />
      <section className="container-page max-w-3xl space-y-4 text-muted-foreground">
        <p>This is placeholder legal text. Please replace it with your official Privacy Policy before launch.</p>
        <p>Nutrition guidance from NutriAI is informational and is not a substitute for professional medical advice.</p>
      </section>
    </SiteLayout>
  );
}
