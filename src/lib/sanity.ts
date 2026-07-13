import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

function readEnv(key: string): string | undefined {
  if (typeof process !== "undefined" && process.env?.[key]) {
    return process.env[key];
  }
  return undefined;
}

export function getSanityConfig() {
  const projectId = readEnv("SANITY_PROJECT_ID");
  const dataset = readEnv("SANITY_DATASET") ?? "production";
  const apiVersion = readEnv("SANITY_API_VERSION") ?? "2024-01-01";

  if (!projectId) {
    throw new Error(
      "Missing SANITY_PROJECT_ID. Add it to .env locally and Vercel environment variables.",
    );
  }

  return { projectId, dataset, apiVersion };
}

let client: SanityClient | undefined;

export function getSanityClient(): SanityClient {
  if (!client) {
    const { projectId, dataset, apiVersion } = getSanityConfig();
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }
  return client;
}

const builder = () => imageUrlBuilder(getSanityClient());

/** Convert a Sanity image reference to an optimised CDN URL. */
export function urlFor(source: SanityImageSource) {
  return builder().image(source);
}

export function productImageUrl(
  source: SanityImageSource | undefined,
  width = 800,
  height = 1000,
) {
  if (!source) return "";
  return urlFor(source).width(width).height(height).fit("crop").auto("format").url();
}

export function productThumbnailUrl(source: SanityImageSource | undefined, size = 200) {
  if (!source) return "";
  return urlFor(source).width(size).height(size).fit("crop").auto("format").url();
}
