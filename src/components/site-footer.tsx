import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logoWhite from "@/assets/prolific-logo-white.png";

const shopLinks = [
  { to: "/shop", label: "Shop All" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const helpLinks = [
  { to: "/contact", label: "Shipping" },
  { to: "/contact", label: "Returns" },
  { to: "/contact", label: "FAQ" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <Link to="/" aria-label="Prolific Collections — Home" className="inline-flex">
              <img
                src={logoWhite}
                alt="Prolific Collections"
                className="h-11 w-auto lg:h-14"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/70">
              Bold jewellery for the modern woman.
            </p>

            <div className="mt-8">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-background/60">
                Visit Us
              </h3>
              <a
                href="https://maps.app.goo.gl/ARdaw9pGtxMqX9mP9"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-sm not-italic leading-relaxed text-background/85 transition-colors hover:text-gold"
              >
                Chippenham<br />
                United Kingdom
              </a>
            </div>

            <form
              className="mt-8 max-w-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <label
                htmlFor="newsletter"
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-background/60"
              >
                Join the list
              </label>
              <div className="mt-3 flex border-b border-background/30 focus-within:border-gold">
                <Input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="Email address"
                  className="flex-1 rounded-none border-0 bg-transparent px-0 text-sm text-background placeholder:text-background/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  className="rounded-none px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold hover:bg-transparent hover:text-gold/80"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:col-start-7">
            <FooterColumn title="Shop" links={shopLinks} />
            <FooterColumn title="Help" links={helpLinks} />
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-background/60">
                Follow
              </h3>
              <ul className="mt-4 flex gap-3">
                <SocialIcon href="https://www.instagram.com/prolific_collections?igsh=eDZxZHFocTF3Mzlu&utm_source=qr" label="Instagram">
                  <Instagram className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href="https://www.tiktok.com/@prolific_collections" label="TikTok">
                  <TikTokIcon />
                </SocialIcon>
                <SocialIcon href="https://www.facebook.com/share/1GXYLSPtTd/?mibextid=wwXIfr" label="Facebook">
                  <Facebook className="h-4 w-4" />
                </SocialIcon>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-background/15 pt-8 text-xs text-background/55 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Prolific Collections. All rights reserved.</p>
          <p>Designed with intention.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-background/60">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((l, i) => (
          <li key={i}>
            <Link
              to={l.to}
              className="text-sm text-background/85 transition-colors hover:text-gold"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-background/25 text-background/80 transition-colors hover:border-gold hover:text-gold"
      >
        {children}
      </a>
    </li>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M19.6 6.3a5.3 5.3 0 0 1-3.4-1.2 5.3 5.3 0 0 1-1.9-3H11v12.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V8.4a6 6 0 0 0-.8-.1 6 6 0 1 0 6 6V9.7a8.4 8.4 0 0 0 5.2 1.8V8.2a5.4 5.4 0 0 1 0-1.9z" />
    </svg>
  );
}


