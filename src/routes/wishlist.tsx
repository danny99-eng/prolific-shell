import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import { formatPrice, getProduct } from "@/lib/products";
import { StarRating } from "@/components/product-card";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Prolific Collections" },
      { name: "description", content: "Pieces you've saved for later." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { ids, remove } = useWishlist();
  const { addItem } = useCart();
  const items = ids.map((id) => getProduct(id)).filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <header className="mb-10 flex items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Saved for later</p>
          <h1 className="mt-2 font-serif text-4xl text-foreground sm:text-5xl">Your Wishlist</h1>
        </div>
        {items.length > 0 && (
          <p className="text-sm text-muted-foreground">{items.length} {items.length === 1 ? "item" : "items"}</p>
        )}
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Heart className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-serif text-xl text-foreground">No saved pieces yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Tap the heart on any product to save it here.</p>
          </div>
          <Button asChild className="mt-2 rounded-none bg-foreground px-8 text-background hover:bg-foreground/90">
            <Link to="/shop">Browse the collection</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-background">
                <Link
                  to="/shop/$productId"
                  params={{ productId: product.id }}
                  className="block h-full w-full"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} transition-transform duration-500 group-hover:scale-105`}>
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-serif text-7xl text-foreground/10">{product.name[0]}</span>
                    </div>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => remove(product.id)}
                  aria-label="Remove from wishlist"
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-colors hover:bg-white"
                >
                  <X className="h-4 w-4 text-foreground" />
                </button>
              </div>
              <div className="mt-4">
                <Link
                  to="/shop/$productId"
                  params={{ productId: product.id }}
                  className="font-serif text-lg text-foreground hover:text-foreground/70"
                >
                  {product.name}
                </Link>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{formatPrice(product.price)}</p>
                  <StarRating rating={product.rating} />
                </div>
                <Button
                  onClick={() =>
                    addItem({
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                      gradient: product.gradient,
                      material: "Gold-plated",
                      size: "One Size",
                      quantity: 1,
                    })
                  }
                  className="mt-3 w-full rounded-none bg-foreground text-xs font-semibold uppercase tracking-[0.16em] text-background hover:bg-foreground/90"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
