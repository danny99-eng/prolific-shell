import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Instagram, Clock, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Prolific Collections" },
      { name: "description", content: "Questions, orders, press — we'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const valid = form.name.trim() && /^\S+@\S+\.\S+$/.test(form.email) && form.message.trim().length >= 5;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <header className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Get in touch</p>
        <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Contact us</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Whether it's a question about an order, a custom request, or a press enquiry — we're here.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-12 space-y-5">
        <div>
          <Label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Name
          </Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your name"
          />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@email.com"
          />
        </div>
        <div>
          <Label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Message
          </Label>
          <Textarea
            id="message"
            rows={6}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            placeholder="How can we help?"
          />
        </div>

        <Button
          type="submit"
          disabled={!valid}
          className="w-full rounded-none bg-foreground py-6 text-sm font-semibold uppercase tracking-[0.2em] text-background hover:bg-foreground/90 sm:w-auto sm:px-12"
        >
          Send message
        </Button>

        {sent && (
          <p className="flex items-center gap-2 text-sm text-foreground">
            <Check className="h-4 w-4 text-gold" /> Thank you — we'll be in touch shortly.
          </p>
        )}
      </form>

      <div className="mt-16 grid gap-6 border-t border-border pt-10 sm:grid-cols-3">
        <InfoBlock icon={Mail} title="Email" value="hello@prolificcollections.com" />
        <InfoBlock icon={Instagram} title="Instagram" value="@prolificcollections" />
        <InfoBlock icon={Clock} title="Response time" value="Within 24 hours, Mon–Fri" />
      </div>
    </section>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
}) {
  return (
    <div className="text-center sm:text-left">
      <div className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold sm:mx-0">
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
