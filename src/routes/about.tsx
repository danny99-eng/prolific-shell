import { createFileRoute } from "@tanstack/react-router";
import { Gem, Sparkles, Tag } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Prolific Collections" },
      { name: "description", content: "Bold, modern jewellery for the woman who wears her story." },
      { property: "og:title", content: "About Prolific Collections" },
      { property: "og:description", content: "Editorial, affordable luxury jewellery designed in Lagos." },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Gem,
    title: "Quality",
    text: "Hypoallergenic metals, hand-finished details, and pieces built to live in — not just look at.",
  },
  {
    icon: Sparkles,
    title: "Boldness",
    text: "Editorial silhouettes with quiet confidence. Designed to be noticed, made to be remembered.",
  },
  {
    icon: Tag,
    title: "Affordability",
    text: "High-street luxury without the high-street markup. Honest pricing, no compromise on craft.",
  },
];

function AboutPage() {
  return (
    <>
      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Our story</p>
            <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl lg:text-6xl">
              About Prolific Collections
            </h1>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Prolific Collections was founded on a simple belief: jewellery should be confident,
                modern, and within reach. We design pieces for the woman who knows what she likes —
                the one who layers a signet with a tennis bracelet, who wears gold to the school run
                and to dinner.
              </p>
              <p>
                Every piece is conceived in our Chippenham studio and crafted with hypoallergenic,
                tarnish-resistant materials. We obsess over the small things — the weight of a
                chain, the curve of a hoop — so that you don't have to.
              </p>
              <p>
                Visit us at{" "}
                <a
                  href="https://maps.app.goo.gl/ARdaw9pGtxMqX9mP9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline-offset-4 hover:text-gold hover:underline"
                >
                  32 Clark Drive, Chippenham, SN15 1UJ, United Kingdom
                </a>
                .
              </p>
              <p className="font-serif text-xl italic text-foreground">"Wear your story."</p>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-amber-50 via-stone-100 to-yellow-100">
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-serif text-[10rem] text-foreground/10">P</span>
            </div>
            <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border bg-secondary/40 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">What we stand for</p>
            <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">Our values</h2>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-background text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-xl text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
