import { useState, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Product, Category } from "@/lib/products";

const categories: {
  name: Category;
  description: string;
}[] = [
    { name: "Rings", description: "Stack, statement, or subtle" },
    { name: "Necklaces", description: "Layers that speak" },
    { name: "Earrings", description: "From studs to drops" },
    { name: "Bracelets", description: "Wrists worth watching" },
  ];

/* ── Slideshow hook ────────────────────────────────────────── */
function useSlideshow(length: number, interval = 2500) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (length <= 1 || paused) return;
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % length),
      interval,
    );
    return () => clearInterval(id);
  }, [length, interval, paused]);

  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);

  return { index, pause, resume };
}

/* ── Category card ─────────────────────────────────────────── */
function CategoryCard({
  name,
  description,
  images,
}: {
  name: Category;
  description: string;
  images: string[];
}) {
  const { index, pause, resume } = useSlideshow(images.length);
  const hasImages = images.length > 0;

  return (
    <Link
      to="/shop"
      className="group relative aspect-[4/5] overflow-hidden bg-muted"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* ── Image slideshow / placeholder ── */}
      {hasImages ? (
        <div className="absolute inset-0">
          {images.map((url, i) => (
            <img
              key={url}
              src={url}
              alt={`${name} product ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105"
              style={{
                opacity: i === index ? 1 : 0,
                transition: "opacity 600ms ease, transform 300ms ease",
              }}
            />
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900 transition-transform duration-500 group-hover:scale-105">
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-serif text-6xl text-gold/20">
              {name[0]}
            </span>
          </div>
        </div>
      )}

      {/* ── Dark gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* ── Content ── */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-serif text-2xl text-white">{name}</h3>
        <p className="mt-1 text-sm text-white/70">{description}</p>
        <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold opacity-0 transition-opacity group-hover:opacity-100">
          Explore
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* ── Dot indicators (only when multiple images) ── */}
      {images.length > 1 && (
        <div className="absolute bottom-[5.5rem] left-6 flex gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className="block h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 16 : 6,
                backgroundColor:
                  i === index ? "var(--color-gold, #c8a55a)" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      )}
    </Link>
  );
}

/* ── Main section ──────────────────────────────────────────── */
export function FeaturedCategories({ products }: { products: Product[] }) {
  // Build a map: category → flat array of image URLs
  const imagesByCategory = new Map<Category, string[]>();
  for (const cat of categories) {
    const imgs = products
      .filter((p) => p.category === cat.name)
      .flatMap((p) => p.imageUrls)
      .filter(Boolean);
    imagesByCategory.set(cat.name, imgs);
  }

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
          <CategoryCard
            key={cat.name}
            name={cat.name}
            description={cat.description}
            images={imagesByCategory.get(cat.name) ?? []}
          />
        ))}
      </div>
    </section>
  );
}
