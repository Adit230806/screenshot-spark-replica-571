import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/Logo";
import { useSignOut } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — NutriAI" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const signOut = useSignOut();
  return (
    <div className="min-h-screen bg-surface">
      <header className="container-page flex h-16 items-center justify-between">
        <Link to="/"><Logo /></Link>
        <Button variant="line" onClick={signOut}>Log out</Button>
      </header>
      <main className="container-page py-12">
        <h1 className="text-4xl font-medium text-primary-deep">Welcome, {user.email}</h1>
        <p className="mt-3 text-muted-foreground">Your dashboard, AI diet plans and trackers are coming next.</p>
      </main>
    </div>
  );
}
