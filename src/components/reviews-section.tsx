import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Amara Okeke",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "The quality is unbelievable for the price. I wear my Aurora ring every single day and it still looks brand new after six months. Prolific Collections has become my go-to for gifts.",
  },
  {
    id: 2,
    name: "Chioma Adebayo",
    location: "Abuja, Nigeria",
    rating: 5,
    text: "Finally, a jewellery brand that understands modern Nigerian women. The designs are bold without being loud — elegant, timeless, and I always get compliments when I wear my Luna necklace.",
  },
  {
    id: 3,
    name: "Ngozi Eze",
    location: "Port Harcourt, Nigeria",
    rating: 4,
    text: "Shipping was fast, packaging was gorgeous, and the pieces exceeded my expectations. I ordered three items and I'm already planning my next purchase. Highly recommended!",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-gold text-gold"
              : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
          Testimonials
        </span>
        <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
          What Our Customers Say
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="relative border border-border bg-background p-8 transition-shadow hover:shadow-lg"
          >
            <Quote className="h-8 w-8 text-gold/30" />

            <div className="mt-4">
              <StarRating rating={review.rating} />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {review.text}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-serif text-sm text-background">
                {review.name[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {review.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {review.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
