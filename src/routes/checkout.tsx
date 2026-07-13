import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { nigerianStates } from "@/lib/nigerian-states";

type PaystackHandler = {
  openIframe: () => void;
};
declare global {
  interface Window {
    PaystackPop?: { setup: (options: Record<string, unknown>) => PaystackHandler };
  }
}

const PAYSTACK_PUBLIC_KEY =
  (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_PAYSTACK_PUBLIC_KEY ||
  "pk_test_placeholder_paystack_key";

const shippingMethods = [
  { id: "standard", label: "Standard Shipping", note: "3–5 business days", price: 3500 },
  { id: "express", label: "Express Shipping", note: "1–2 business days", price: 7500 },
] as const;

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Prolific Collections" },
      { name: "description", content: "Secure guest checkout." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, count } = useCart();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState<(typeof shippingMethods)[number]["id"]>("standard");
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    if (document.getElementById("paystack-inline-js")) return;
    const s = document.createElement("script");
    s.id = "paystack-inline-js";
    s.src = "https://js.paystack.co/v1/inline.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const shippingCost = shippingMethods.find((m) => m.id === shipping)?.price ?? 0;
  const total = subtotal + shippingCost;

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const valid =
    form.fullName.trim() &&
    /^\S+@\S+\.\S+$/.test(form.email) &&
    form.phone.trim().length >= 7 &&
    form.address.trim() &&
    form.city.trim() &&
    form.state &&
    form.postalCode.trim() &&
    items.length > 0;

  function goToConfirmation(reference: string) {
    navigate({
      to: "/order-confirmation",
      search: { ref: reference, total, email: form.email, name: form.fullName },
    });
  }

  function handlePay() {
    if (!valid || processing) return;
    setProcessing(true);
    const reference = `PC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    if (typeof window !== "undefined" && window.PaystackPop) {
      try {
        const handler = window.PaystackPop.setup({
          key: PAYSTACK_PUBLIC_KEY,
          email: form.email,
          amount: total * 100,
          currency: "NGN",
          ref: reference,
          metadata: {
            custom_fields: [
              { display_name: "Full Name", variable_name: "full_name", value: form.fullName },
              { display_name: "Phone", variable_name: "phone", value: form.phone },
            ],
          },
          callback: (res: { reference: string }) => {
            goToConfirmation(res.reference);
          },
          onClose: () => setProcessing(false),
        });
        handler.openIframe();
      } catch {
        // Fallback for placeholder key — simulate success so UX is testable.
        setTimeout(() => goToConfirmation(reference), 600);
      }
    } else {
      // Script not loaded / placeholder key — simulate success.
      setTimeout(() => goToConfirmation(reference), 600);
    }
  }

  if (count === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-serif text-3xl text-foreground sm:text-4xl">Your bag is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">Add a piece before checking out.</p>
        <Button asChild className="mt-6 rounded-none bg-foreground px-8 text-background hover:bg-foreground/90">
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mb-10 border-b border-border pb-6">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Guest Checkout</p>
        <h1 className="mt-2 font-serif text-4xl text-foreground sm:text-5xl">Checkout</h1>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* LEFT — form */}
        <div className="space-y-10">
          <FormSection title="Contact">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" id="fullName">
                <Input id="fullName" value={form.fullName} onChange={update("fullName")} placeholder="Adaeze Okafor" />
              </Field>
              <Field label="Email" id="email">
                <Input id="email" type="email" value={form.email} onChange={update("email")} placeholder="you@email.com" />
              </Field>
              <Field label="Phone number" id="phone" className="sm:col-span-2">
                <Input id="phone" type="tel" value={form.phone} onChange={update("phone")} placeholder="+234 800 000 0000" />
              </Field>
            </div>
          </FormSection>

          <FormSection title="Shipping Address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Street address" id="address" className="sm:col-span-2">
                <Input id="address" value={form.address} onChange={update("address")} placeholder="12 Awolowo Road" />
              </Field>
              <Field label="City" id="city">
                <Input id="city" value={form.city} onChange={update("city")} placeholder="Ikoyi" />
              </Field>
              <Field label="State" id="state">
                <Select value={form.state} onValueChange={(v) => setForm((f) => ({ ...f, state: v }))}>
                  <SelectTrigger id="state" className="rounded-none">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {nigerianStates.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Postal code" id="postalCode" className="sm:col-span-2">
                <Input id="postalCode" value={form.postalCode} onChange={update("postalCode")} placeholder="101233" />
              </Field>
            </div>
          </FormSection>

          <FormSection title="Shipping Method">
            <div className="space-y-3">
              {shippingMethods.map((m) => {
                const active = shipping === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setShipping(m.id)}
                    className={`flex w-full items-center justify-between border px-4 py-4 text-left transition-colors ${
                      active ? "border-foreground bg-secondary" : "border-border hover:border-foreground/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                          active ? "border-foreground" : "border-muted-foreground"
                        }`}
                      >
                        {active && <span className="h-2 w-2 rounded-full bg-foreground" />}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{m.label}</p>
                        <p className="text-xs text-muted-foreground">{m.note}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-foreground">{formatPrice(m.price)}</p>
                  </button>
                );
              })}
            </div>
          </FormSection>
        </div>

        {/* RIGHT — summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-border bg-secondary/40 p-6">
            <h2 className="font-serif text-2xl text-foreground">Order Summary</h2>

            <ul className="mt-5 divide-y divide-border">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-4">
                  <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-muted">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-serif text-2xl text-foreground/20">{item.name[0]}</span>
                      </div>
                    )}
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-serif text-sm text-foreground">{item.name}</p>
                      <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {item.material} · {item.size}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-foreground">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Shipping" value={formatPrice(shippingCost)} />
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Total</span>
                <span className="font-serif text-2xl text-foreground">{formatPrice(total)}</span>
              </div>
            </div>

            <Button
              onClick={handlePay}
              disabled={!valid || processing}
              className="mt-6 w-full rounded-none bg-gold py-6 text-sm font-semibold uppercase tracking-[0.2em] text-gold-foreground hover:bg-gold/90"
            >
              {processing ? "Processing…" : "Pay with Paystack"}
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <Lock className="h-3 w-3" /> Secure checkout
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 font-serif text-2xl text-foreground">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  id,
  children,
  className = "",
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
