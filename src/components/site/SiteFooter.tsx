import { Link, type LinkProps } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Youtube, Twitter } from "lucide-react";
import { Logo } from "@/components/site/Logo";

const SOCIAL = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Twitter, label: "X (Twitter)", href: "https://x.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary-deep text-primary-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            AI-powered nutrition built for Indian kitchens. Personalised diet plans, real food, and progress you can
            see.
          </p>
          <div className="mt-6 flex gap-2">
            {SOCIAL.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-primary-foreground/15 text-primary-foreground/80 transition hover:border-primary-foreground/40 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <FooterCol
          title="Company"
          links={[
            { to: "/about", label: "About Us" },
            { to: "/how-it-works", label: "How It Works" },
            { to: "/contact", label: "Contact" },
          ]}
        />
        <FooterCol
          title="Explore"
          links={[
            { to: "/plans", label: "Our Plans" },
            { to: "/menu", label: "Food Menu" },
            { to: "/auth", label: "Get Started" },
          ]}
        />
        <FooterCol
          title="Legal"
          links={[
            { to: "/privacy", label: "Privacy Policy" },
            { to: "/terms", label: "Terms & Conditions" },
          ]}
        />
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-primary-foreground/60 md:flex-row">
          <p>© {new Date().getFullYear()} NutriAI. All rights reserved.</p>
          <p>Nutrition guidance is informational and not a substitute for medical advice.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: NonNullable<LinkProps["to"]>; label: string }[] }) {
  return (
    <div className="md:col-span-2 md:col-start-auto">
      <h4 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/50">{title}</h4>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-primary-foreground/85 transition hover:text-primary-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
