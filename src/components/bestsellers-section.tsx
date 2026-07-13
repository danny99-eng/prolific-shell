import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { formatPrice, getProductImageUrl, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

type BestsellersSectionProps = {
  products: Product[];
};

export function BestsellersSection({ products }: BestsellersSectionProps) {
  if (products.length === 0) {
    return null;
  }
=======
import { formatPrice } from "@/lib/products";

const products = [
  {
    id: 1,
    name: "Aurora Gold Ring",
    price: 42.0,
    rating: 5,
    gradient: "from-amber-100 to-yellow-100",
  },
  {
    id: 2,
    name: "Luna Pendant Necklace",
    price: 64.0,
    rating: 5,
    gradient: "from-stone-100 to-stone-200",
  },
  {
    id: 3,
    name: "Celestial Hoop Earrings",
    price: 48.0,
    rating: 4,
    gradient: "from-orange-50 to-amber-50",
  },
  {
    id: 4,
    name: "Nova Chain Bracelet",
    price: 36.0,
    rating: 5,
    gradient: "from-yellow-50 to-stone-100",
  },
];


function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-gold text-gold"
              : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

export function BestsellersSection() {
  const [wishlisted, setWishlisted] = useState<Set<number>>(new Set());

  const toggleWishlist = (id: number) => {
    setWishlisted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
>>>>>>> 4e1fa053e115bb4d38bdc4b7f72a640b7e6d3bc4

  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Handpicked
          </span>
          <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
            Our Bestsellers
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <BestsellerCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BestsellerCard({ product }: { product: Product }) {
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
          onClick={() => toggle(product.id)}
          aria-label="Add to wishlist"
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
