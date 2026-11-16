import { Link } from "@tanstack/react-router";
import { Menu, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/site/Logo";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/plans", label: "Our Plans" },
  { to: "/menu", label: "Food Menu" },
  { to: "/about", label: "About Us" },
  { to: "/how-it-works", label: "How It Works" },
] as const;

export function SiteHeader() {
  const { user, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-border/70 bg-background/85 backdrop-blur-xl" : "bg-background/0",
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Link to="/" aria-label="NutriAI home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary-deep data-[status=active]:bg-mint data-[status=active]:text-primary-deep"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {!loading && user ? (
            <Button asChild variant="hero">
              <Link to="/dashboard">
                <LayoutDashboard /> Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" className="text-primary-deep">
                <Link to="/auth" search={{ mode: "login" }}>Login</Link>
              </Button>
              <Button asChild variant="hero">
                <Link to="/auth" search={{ mode: "signup" }}>Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-sm bg-background">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="mt-2 px-2">
              <Logo />
            </div>
            <nav className="mt-8 flex flex-col gap-1 px-2">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: n.to === "/" }}
                  className="rounded-xl px-4 py-3 font-medium text-foreground hover:bg-mint data-[status=active]:bg-mint data-[status=active]:text-primary-deep"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-2 px-2">
              {user ? (
                <Button asChild variant="hero" size="lg" onClick={() => setOpen(false)}>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="line" size="lg" onClick={() => setOpen(false)}>
                    <Link to="/auth" search={{ mode: "login" }}>Login</Link>
                  </Button>
                  <Button asChild variant="hero" size="lg" onClick={() => setOpen(false)}>
                    <Link to="/auth" search={{ mode: "signup" }}>Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
