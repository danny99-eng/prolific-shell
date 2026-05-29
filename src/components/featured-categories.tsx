import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Rings",
    description: "Stack, statement, or subtle",
    gradient: "from-stone-200 to-stone-300",
  },
  {
    name: "Necklaces",
    description: "Layers that speak",
    gradient: "from-neutral-200 to-neutral-300",
  },
  {
    name: "Earrings",
    description: "From studs to drops",
    gradient: "from-zinc-200 to-zinc-300",
  },
  {
    name: "Bracelets",
    description: "Wrists worth watching",
    gradient: "from-stone-300 to-stone-400",
  },
];

export function FeaturedCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
          Shop by Category
        </span>
        <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
          Find Your Style
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to="/shop"
            className="group relative aspect-[4/5] overflow-hidden bg-muted transition-transform"
          >
            {/* Placeholder image */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} transition-transform duration-500 group-hover:scale-105`}>
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-serif text-6xl text-foreground/10">
                  {cat.name[0]}
                </span>
              </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-serif text-2xl text-white">{cat.name}</h3>
              <p className="mt-1 text-sm text-white/70">{cat.description}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold opacity-0 transition-opacity group-hover:opacity-100">
                Explore
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
