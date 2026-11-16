import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact NutriAI" },
      { name: "description", content: "Get in touch with the NutriAI team." },
      { property: "og:title", content: "Contact NutriAI" },
      { property: "og:description", content: "Get in touch with the NutriAI team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("contact_messages").insert({ ...form, source: "contact" });
    setBusy(false);
    if (error) return toast.error("Could not send your message.");
    toast.success("Thanks! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  }
  return (
    <SiteLayout>
      <PageHero eyebrow="Contact" title="We'd love to hear from you." description="Questions, feedback or partnership ideas — send us a note." />
      <section className="container-page max-w-xl">
        <form onSubmit={submit} className="space-y-4 rounded-3xl border bg-card p-8 shadow-soft">
          <Input placeholder="Your name" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Textarea placeholder="Message" required maxLength={2000} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <Button type="submit" variant="hero" size="lg" disabled={busy}>{busy ? "Sending…" : "Send message"}</Button>
        </form>
      </section>
    </SiteLayout>
  );
}
