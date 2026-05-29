import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shop")({
  component: () => (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="font-serif text-4xl text-foreground">Shop</h1>
    </section>
  ),
});
