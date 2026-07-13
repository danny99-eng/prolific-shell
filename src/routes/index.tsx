import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/hero-section";
import { FeaturedCategories } from "@/components/featured-categories";
import { BestsellersSection } from "@/components/bestsellers-section";
import { BestsellersSkeleton } from "@/components/product-skeletons";
import { ReviewsSection } from "@/components/reviews-section";
import { SocialProofBanner } from "@/components/social-proof-banner";
import { getFeaturedProducts } from "@/lib/products.server";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prolific Collections — Bold, modern jewellery" },
      {
        name: "description",
        content:
          "Editorial, affordable luxury jewellery for women who value timeless, modern style.",
      },
    ],
  }),
  loader: () => getFeaturedProducts(),
  pendingComponent: HomePending,
  component: Index,
});

function HomePending() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <BestsellersSkeleton />
      <ReviewsSection />
      <SocialProofBanner />
    </>
  );
}

function Index() {
  const featuredProducts = Route.useLoaderData();

  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <BestsellersSection products={featuredProducts} />
      <ReviewsSection />
      <SocialProofBanner />
    </>
  );
}
