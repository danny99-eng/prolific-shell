import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const reviews = [
  {
    id: 1,
    name: "Amara O.",
    location: "Lagos",
    rating: 5,
    text: "Absolutely love my gold stackable rings. The quality is incredible for the price. Will definitely be ordering again!",
  },
  {
    id: 2,
    name: "Funke A.",
    location: "Abuja",
    rating: 5,
    text: "I wore the crystal necklace to my friend's wedding and received so many compliments. Prolific Collections never disappoints.",
  },
  {
    id: 3,
    name: "Temi B.",
    location: "Port Harcourt",
    rating: 5,
    text: "Fast delivery and the packaging was so beautiful. Felt like a luxury unboxing experience.",
  },
  {
    id: 4,
    name: "Chisom E.",
    location: "Enugu",
    rating: 5,
    text: "The earrings are even more stunning in person. Great craftsmanship and true to the photos.",
  },
  {
    id: 5,
    name: "Bisi L.",
    location: "Ibadan",
    rating: 5,
    text: "I have bought from several jewellery brands online and Prolific Collections is by far the best quality I have found.",
  },
  {
    id: 6,
    name: "Ngozi K.",
    location: "Lagos",
    rating: 5,
    text: "Bought the bangle set as a birthday gift for my mum and she absolutely loved it. Thank you!",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-gold text-gold" : "fill-muted text-muted-foreground",
          )}
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: false },
    [autoplay.current],
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi],
  );
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Testimonials
          </span>
          <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
            What Our Customers Say
          </h2>
        </div>

        <div className="relative mt-12">
          {/* Arrows */}
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-gold transition-opacity hover:opacity-80 md:flex lg:-left-4"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-gold transition-opacity hover:opacity-80 md:flex lg:-right-4"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="overflow-hidden md:px-12" ref={emblaRef}>
            <div className="flex">
              {reviews.map((review, i) => {
                const isActive = i === selected;
                return (
                  <div
                    key={review.id}
                    className="min-w-0 shrink-0 grow-0 basis-full px-3 md:basis-1/3"
                  >
                    <div
                      className={cn(
                        "relative h-full border border-border bg-background p-8 transition-all duration-500 md:p-10",
                        isActive
                          ? "scale-100 opacity-100 shadow-xl"
                          : "md:scale-95 md:opacity-60",
                      )}
                    >
                      <Quote className="h-10 w-10 text-gold" />
                      <div className="mt-4">
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="mt-5 text-base leading-relaxed text-foreground/80">
                        {review.text}
                      </p>
                      <div className="mt-8">
                        <p className="font-semibold text-foreground">{review.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {review.location}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full border transition-all",
                  selected === i
                    ? "border-gold bg-gold scale-110"
                    : "border-muted-foreground/40 bg-transparent hover:border-gold",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
