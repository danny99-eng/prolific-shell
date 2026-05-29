import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/hero-section";
import { FeaturedCategories } from "@/components/featured-categories";
import { BestsellersSection } from "@/components/bestsellers-section";
import { ReviewsSection } from "@/components/reviews-section";
import { SocialProofBanner } from "@/components/social-proof-banner";

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
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <BestsellersSection />
      <ReviewsSection />
      <SocialProofBanner />
    </>
  );
}
