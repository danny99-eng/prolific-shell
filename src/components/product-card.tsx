import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, getProductImageUrl, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const wishlisted = has(product.id);
  const imageUrl = getProductImageUrl(product);
  const outOfStock = !product.inStock;

  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-background">
        <Link
          to="/shop/$productId"
          params={{ productId: product.id }}
          className="block h-full w-full"
          aria-label={product.name}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="font-serif text-7xl text-foreground/10">{product.name[0]}</span>
            </div>
          )}
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-background">
            {product.badge}
          </span>
        )}

        {outOfStock && (
          <span className="absolute bottom-3 left-3 bg-background/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">
            Out of Stock
          </span>
        )}

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

        {!outOfStock && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 p-4 backdrop-blur transition-transform duration-300 group-hover:translate-y-0">
            <Button
              onClick={() =>
                addItem({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  imageUrl,
                  material: product.variants[0] ?? "Standard",
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
        )}
      </div>

      <div className="mt-4">
        <Link
          to="/shop/$productId"
          params={{ productId: product.id }}
          className="font-serif text-lg text-foreground hover:text-foreground/70"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-sm font-medium text-foreground">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}
