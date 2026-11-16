import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — NutriAI" },
      { name: "description", content: "The terms that govern your use of NutriAI." },
      { property: "og:title", content: "Terms & Conditions — NutriAI" },
      { property: "og:description", content: "The terms that govern your use of NutriAI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Legal" title="Terms & Conditions" description="The terms that govern your use of NutriAI." />
      <section className="container-page max-w-3xl space-y-4 text-muted-foreground">
        <p>This is placeholder legal text. Please replace it with your official Terms & Conditions before launch.</p>
        <p>Nutrition guidance from NutriAI is informational and is not a substitute for professional medical advice.</p>
      </section>
    </SiteLayout>
  );
}
