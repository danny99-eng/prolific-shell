import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

export function StarRating({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-gold text-gold" : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const wishlisted = has(product.id);

  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-background">
        <Link
          to="/shop/$productId"
          params={{ productId: product.id }}
          className="block h-full w-full"
          aria-label={product.name}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${product.gradient} transition-transform duration-500 group-hover:scale-105`}
          >
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-serif text-7xl text-foreground/10">
                {product.name[0]}
              </span>
            </div>
          </div>
        </Link>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              wishlisted ? "fill-red-500 text-red-500" : "text-foreground"
            }`}
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 p-4 backdrop-blur transition-transform duration-300 group-hover:translate-y-0">
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
            className="w-full rounded-none bg-foreground text-sm font-semibold uppercase tracking-[0.1em] text-background hover:bg-foreground/90"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
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
      </div>
    </div>
  );
}
