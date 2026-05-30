import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

type Search = { ref?: string; total?: number; email?: string; name?: string };

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ref: typeof s.ref === "string" ? s.ref : undefined,
    total: typeof s.total === "number" ? s.total : Number(s.total) || undefined,
    email: typeof s.email === "string" ? s.email : undefined,
    name: typeof s.name === "string" ? s.name : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — Prolific Collections" },
      { name: "description", content: "Thank you for your order." },
    ],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const { ref, total, email, name } = Route.useSearch();
  const { items, subtotal, removeItem } = useCart();
  const clearedRef = useRef(false);

  // Snapshot items before clearing the cart so we can render the summary.
  const snapshotRef = useRef(items);
  useEffect(() => {
    if (clearedRef.current) return;
    clearedRef.current = true;
    snapshotRef.current = items;
    items.forEach((i) => removeItem(i.key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const snapshot = snapshotRef.current;
  const snapshotSubtotal = snapshot.reduce((s, i) => s + i.price * i.quantity, 0) || subtotal;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-gold-foreground">
          <Check className="h-7 w-7" />
        </div>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Payment received</p>
        <h1 className="mt-2 font-serif text-4xl text-foreground sm:text-5xl">Thank you{name ? `, ${name.split(" ")[0]}` : ""}.</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Your order has been confirmed{email ? ` and a receipt is on its way to ${email}` : ""}. We'll send tracking once it ships.
        </p>
      </div>

      <div className="mt-10 border border-border">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/40 px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Order number</p>
            <p className="font-serif text-lg text-foreground">{ref ?? "—"}</p>
          </div>
          {total != null && (
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Total paid</p>
              <p className="font-serif text-lg text-foreground">{formatPrice(total)}</p>
            </div>
          )}
        </div>

        {snapshot.length > 0 ? (
          <ul className="divide-y divide-border px-6">
            {snapshot.map((item) => (
              <li key={item.key} className="flex gap-4 py-4">
                <div className={`relative h-20 w-16 flex-shrink-0 overflow-hidden bg-gradient-to-br ${item.gradient}`}>
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-serif text-2xl text-foreground/20">{item.name[0]}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <p className="font-serif text-sm text-foreground">{item.name}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {item.material} · {item.size} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-foreground">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-6 py-8 text-center text-sm text-muted-foreground">Your order details are on file.</p>
        )}

        {snapshot.length > 0 && (
          <div className="border-t border-border px-6 py-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">{formatPrice(snapshotSubtotal)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button asChild className="rounded-none bg-foreground px-8 text-background hover:bg-foreground/90">
          <Link to="/shop">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-none border-foreground/20 px-8">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  );
}
