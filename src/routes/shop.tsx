import { useMemo, useState } from "react";
import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/product-card";
import { products, type Category } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Jewellery — Prolific Collections" },
      { name: "description", content: "Browse rings, necklaces, earrings and bracelets from Prolific Collections." },
      { property: "og:title", content: "Shop All Jewellery — Prolific Collections" },
      { property: "og:description", content: "Bold, modern jewellery for the modern woman." },
    ],
  }),
  component: ShopLayout,
});

function ShopLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId !== "/shop" && m.routeId.startsWith("/shop"));
  if (isChild) return <Outlet />;
  return <ShopIndex />;
}

const CATEGORIES = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"] as const;
type Filter = (typeof CATEGORIES)[number];
type Sort = "featured" | "price-asc" | "price-desc" | "newest";

const PAGE_SIZE = 8;

function ShopIndex() {
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<Sort>("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let list = filter === "All" ? products : products.filter((p) => p.category === (filter as Category));
    list = [...list];
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => b.createdAt - a.createdAt);
        break;
    }
    return list;
  }, [filter, sort]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="text-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
          Collection
        </span>
        <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">
          Shop All Jewellery
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Editorial pieces made to be worn, layered, and loved.
        </p>
      </div>

      {/* Filter / sort bar */}
      <div className="mt-10 flex flex-col gap-4 border-y border-border py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setFilter(c);
                setVisible(PAGE_SIZE);
              }}
              className={`rounded-none px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                filter === c
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Sort by
          </span>
          <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
            <SelectTrigger className="w-[180px] rounded-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low – High</SelectItem>
              <SelectItem value="price-desc">Price: High – Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Showing {shown.length} of {filtered.length} pieces
      </p>

      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-16 flex justify-center">
          <Button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            variant="outline"
            className="rounded-none border-foreground px-10 text-xs font-semibold uppercase tracking-[0.2em]"
          >
            Load More
          </Button>
        </div>
      )}
    </section>
  );
}
