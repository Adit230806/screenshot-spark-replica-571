import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/site/Logo";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { foodImages } from "@/lib/foods";

type AuthSearch = { mode?: "login" | "signup"; redirect?: string };

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): AuthSearch => {
    const out: AuthSearch = {};
    if (s["mode"] === "signup" || s["mode"] === "login") out.mode = s["mode"];
    if (typeof s["redirect"] === "string" && s["redirect"].startsWith("/")) out.redirect = s["redirect"];
    return out;
  },
  head: () => ({
    meta: [
      { title: "Sign in to NutriAI" },
      { name: "description", content: "Log in or create your NutriAI account to get your personalised diet plan." },
      { property: "og:title", content: "Sign in to NutriAI" },
      { property: "og:description", content: "Log in or create your NutriAI account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">(search.mode ?? "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin, data: { full_name: name } },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Check your email to confirm your account.");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: search.redirect ?? "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) return toast.error("Google sign-in failed");
    if (result.redirected) return;
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 md:px-16">
        <Link to="/"><Logo /></Link>
        <h1 className="mt-10 text-4xl font-medium text-primary-deep">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {mode === "signup" ? "Start your personalised nutrition journey." : "Log in to see your plan and progress."}
        </p>
        <Button variant="line" size="lg" className="mt-8 w-full max-w-md" onClick={google} type="button">
          Continue with Google
        </Button>
        <form onSubmit={submit} className="mt-6 w-full max-w-md space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
            {busy ? "Please wait…" : mode === "signup" ? "Create account" : "Log in"}
          </Button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">
          {mode === "signup" ? "Already have an account?" : "New to NutriAI?"}{" "}
          <button className="font-semibold text-primary" onClick={() => setMode(mode === "signup" ? "login" : "signup")}>
            {mode === "signup" ? "Log in" : "Create one"}
          </button>
        </p>
      </div>
      <div className="relative hidden lg:block">
        <img src={foodImages.heroThali} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
}
