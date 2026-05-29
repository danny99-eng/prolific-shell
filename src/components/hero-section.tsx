import { Link } from "@tanstack/react-router";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative w-full">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Elegant gold jewellery flatlay on black marble"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
          New Collection
        </span>
        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.1] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Wear Your Story
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80 sm:text-xl">
          Bold jewellery for the modern woman
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center rounded-none bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-gold-foreground transition-all hover:bg-gold/90"
          >
            Shop Now
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center rounded-none border border-white/60 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-all hover:border-white hover:bg-white/10"
          >
            View Lookbook
          </Link>
        </div>
      </div>
    </section>
  );
}
