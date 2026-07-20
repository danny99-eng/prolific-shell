import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/hero-section";
import { FeaturedCategories } from "@/components/featured-categories";
import { BestsellersSection } from "@/components/bestsellers-section";
import { BestsellersSkeleton } from "@/components/product-skeletons";
import { ReviewsSection } from "@/components/reviews-section";
import { SocialProofBanner } from "@/components/social-proof-banner";
import { getFeaturedProducts, getAllProducts } from "@/lib/product.server";

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
  loader: async () => {
    const [featured, all] = await Promise.all([
      getFeaturedProducts(),
      getAllProducts(),
    ]);
    return { featured, all };
  },
  pendingComponent: HomePending,
  component: Index,
});

function HomePending() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories products={[]} />
      <BestsellersSkeleton />
      <ReviewsSection />
      <SocialProofBanner />
    </>
  );
}

function Index() {
  const { featured, all } = Route.useLoaderData();

  return (
    <>
      <HeroSection />
      <FeaturedCategories products={all} />
      <BestsellersSection products={featured} />
      <ReviewsSection />
      <SocialProofBanner />
    </>
  );
}
