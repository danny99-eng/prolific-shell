import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/product-card";
import { ProductDetailSkeleton } from "@/components/product-skeletons";
import { formatPrice, getProductImageUrl } from "@/lib/products";
import { getProductBySlug, getRelatedProducts } from "@/lib/product.server";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

export const Route = createFileRoute("/shop/$productId")({
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    const title = product ? `${product.name} — Prolific Collections` : "Product — Prolific Collections";
    const description = product?.description ?? "Discover bold, modern jewellery from Prolific Collections.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: async ({ params }) => {
    const product = await getProductBySlug({ data: params.productId });
    if (!product) throw notFound();
    const related = await getRelatedProducts({ data: { slug: params.productId, count: 4 } });
    return { product, related };
  },
  pendingComponent: ProductDetailSkeleton,
  component: ProductDetail,
  notFoundComponent: () => (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-serif text-3xl text-foreground">Piece not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        We couldn't find that piece. It may have sold out or moved.
      </p>
      <Link
        to="/shop"
        className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold hover:underline"
      >
        Back to Shop
      </Link>
    </section>
  ),
});

const SIZES = ["Small", "Medium", "Large"] as const;
const DEFAULT_VARIANTS = ["Gold-plated", "Silver-plated", "Rose Gold"];

function ProductDetail() {
  const { product, related } = Route.useLoaderData();
  const { addItem } = useCart();
  const variants = product.variants.length > 0 ? product.variants : DEFAULT_VARIANTS;
  const [material, setMaterial] = useState(variants[0] ?? "Standard");
  const [size, setSize] = useState<(typeof SIZES)[number]>("Medium");
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { has: hasWish, toggle: toggleWish } = useWishlist();
  const wishlisted = hasWish(product.id);
  const outOfStock = !product.inStock;
  const images = product.imageUrls.length > 0 ? product.imageUrls : [""];
  const mainImage = images[activeImage] ?? getProductImageUrl(product);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <nav className="mb-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-foreground">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="relative aspect-square w-full overflow-hidden bg-muted">
            {mainImage ? (
              <img src={mainImage} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-serif text-[12rem] text-foreground/10">{product.name[0]}</span>
              </div>
            )}
            {product.badge && (
              <span className="absolute left-4 top-4 bg-foreground px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-background">
                {product.badge}
              </span>
            )}
            {outOfStock && (
              <span className="absolute right-4 top-4 bg-background/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">
                Out of Stock
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square overflow-hidden border-2 transition-colors ${activeImage === i ? "border-foreground" : "border-transparent"
                    }`}
                >
                  {url ? (
                    <img src={url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <span className="font-serif text-2xl text-foreground/20">{i + 1}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            {product.category}
          </span>
          <h1 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>

          <p className="mt-5 font-serif text-3xl text-gold">{formatPrice(product.price)}</p>

          <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {variants.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                Material
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {variants.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMaterial(m)}
                    className={`border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${material === m
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground hover:border-foreground"
                      }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              Size
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`min-w-[60px] border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${size === s
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground hover:border-foreground"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              Quantity
            </p>
            <div className="mt-3 inline-flex items-center border border-border">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-foreground hover:bg-secondary"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-sm font-medium">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="flex h-11 w-11 items-center justify-center text-foreground hover:bg-secondary"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8">
            <Button
              disabled={outOfStock}
              onClick={() =>
                addItem({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  imageUrl: getProductImageUrl(product),
                  material,
                  size,
                  quantity: qty,
                })
              }
              className="w-full rounded-none bg-gold py-6 text-sm font-semibold uppercase tracking-[0.2em] text-gold-foreground hover:bg-gold/90 disabled:opacity-50"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              {outOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
            <button
              type="button"
              onClick={() => toggleWish(product.id)}
              className="mt-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground hover:text-foreground/70"
            >
              <Heart className={`h-4 w-4 ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />
              {wishlisted ? "Added to Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          <Accordion type="single" collapsible className="mt-10">
            <AccordionItem value="details">
              <AccordionTrigger className="text-xs font-semibold uppercase tracking-[0.18em]">
                Product Details
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Crafted from high-quality brass with a {material.toLowerCase()} finish. Hypoallergenic,
                tarnish-resistant, and made to last. Each piece is finished by hand for a soft, luminous
                shine.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-xs font-semibold uppercase tracking-[0.18em]">
                Shipping Info
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                UK standard delivery in 2–3 business days. International shipping in 5–10 business days. Free UK shipping on orders over £75.

              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger className="text-xs font-semibold uppercase tracking-[0.18em]">
                Care Instructions
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Avoid contact with perfume, lotion and water. Store in the dust pouch provided. Polish
                gently with a soft microfibre cloth to maintain shine.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">You May Also Like</h2>
            <Link
              to="/shop"
              className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-foreground hover:text-foreground/70 sm:block"
            >
              View all
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
