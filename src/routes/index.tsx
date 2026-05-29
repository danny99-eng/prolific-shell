import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prolific Collections — Bold, modern jewellery" },
      {
        name: "description",
        content:
          "Editorial, affordable luxury jewellery for women who value timeless, modern style.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
        Coming soon
      </span>
      <h1 className="mt-6 font-serif text-4xl leading-tight text-foreground sm:text-6xl">
        Prolific Collections
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
        Bold, modern jewellery — crafted to be worn every day, made to feel like
        nothing else.
      </p>
    </section>
  );
}
