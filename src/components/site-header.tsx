import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Left: logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open menu"
            className="-ml-1 inline-flex h-9 w-9 items-center justify-center text-foreground md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <span
              aria-hidden
              className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-serif text-sm text-background"
            >
              P
            </span>
            <span className="font-serif text-lg tracking-wide text-foreground sm:text-xl">
              Prolific Collections
            </span>
          </Link>
        </div>

        {/* Center: nav */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <ul className="flex items-center gap-10">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-[13px] font-medium uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <IconButton label="Search">
            <Search className="h-5 w-5" />
          </IconButton>
          <IconButton label="Wishlist">
            <Heart className="h-5 w-5" />
          </IconButton>

          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open cart"
                className="relative inline-flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-foreground/70"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-gold-foreground">
                  {cartCount}
                </span>
              </button>
            </SheetTrigger>
            <CartDrawer />
          </Sheet>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground/80"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function IconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-foreground/70"
    >
      {children}
    </button>
  );
}

function CartDrawer() {
  return (
    <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
      <SheetHeader>
        <SheetTitle className="font-serif text-2xl">Your Bag</SheetTitle>
      </SheetHeader>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-2 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-serif text-lg text-foreground">Your bag is empty</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Discover pieces made to last.
          </p>
        </div>
        <Button className="mt-2 rounded-none bg-foreground px-8 text-background hover:bg-foreground/90">
          Shop Now
        </Button>
      </div>
    </SheetContent>
  );
}
