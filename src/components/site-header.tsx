import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, Menu, X, Minus, Plus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { formatPrice } from "@/lib/products";
import logoColor from "@/assets/prolific-logo-color.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, isOpen, setOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open menu"
            className="-ml-1 inline-flex h-9 w-9 items-center justify-center text-foreground md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link to="/" className="flex items-center" aria-label="Prolific Collections — Home">
            <img
              src={logoColor}
              alt="Prolific Collections"
              className="h-12 w-auto lg:h-[60px]"
            />
          </Link>
        </div>

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

        <div className="flex items-center gap-1 sm:gap-2">
          <IconButton label="Search">
            <Search className="h-5 w-5" />
          </IconButton>
          <WishlistIconLink />

          <Sheet open={isOpen} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open cart"
                className="relative inline-flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-foreground/70"
              >
                <ShoppingBag className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-gold-foreground">
                    {count}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <CartDrawer />
          </Sheet>
        </div>
      </div>

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

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
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

function WishlistIconLink() {
  const { count } = useWishlist();
  return (
    <Link
      to="/wishlist"
      aria-label="Wishlist"
      className="relative inline-flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-foreground/70"
    >
      <Heart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-gold-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}

function CartDrawer() {
  const { items, subtotal, updateQuantity, removeItem, close } = useCart();
  const empty = items.length === 0;

  return (
    <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
      <SheetHeader className="border-b border-border px-6 py-5">
        <SheetTitle className="font-serif text-2xl">
          Your Bag {!empty && <span className="text-muted-foreground">({items.length})</span>}
        </SheetTitle>
      </SheetHeader>

      {empty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <ShoppingBag className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-serif text-lg text-foreground">Your bag is empty</p>
            <p className="mt-1 text-sm text-muted-foreground">Discover pieces made to last.</p>
          </div>
          <Button
            onClick={close}
            className="mt-2 rounded-none bg-foreground px-8 text-background hover:bg-foreground/90"
            asChild
          >
            <Link to="/shop">Shop Now</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-4">
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-muted">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-serif text-2xl text-foreground/20">{item.name[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          to="/shop/$productId"
                          params={{ productId: item.productId }}
                          onClick={close}
                          className="font-serif text-sm text-foreground hover:text-foreground/70"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                          {item.material} · {item.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        aria-label="Remove item"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between pt-3">
                      <div className="inline-flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-foreground hover:bg-secondary"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-foreground hover:bg-secondary"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border bg-background px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="uppercase tracking-[0.18em] text-muted-foreground">Subtotal</span>
              <span className="font-serif text-lg text-foreground">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
            <Button
              asChild
              className="mt-4 w-full rounded-none bg-gold py-6 text-sm font-semibold uppercase tracking-[0.2em] text-gold-foreground hover:bg-gold/90"
            >
              <Link to="/checkout" onClick={close}>Proceed to Checkout</Link>
            </Button>
            <button
              type="button"
              onClick={close}
              className="mt-3 block w-full text-center text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 hover:text-foreground"
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </SheetContent>
  );
}
