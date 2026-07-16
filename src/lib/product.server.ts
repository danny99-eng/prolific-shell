import { createServerFn } from "@tanstack/react-start";
import Papa from "papaparse";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQiaIwpXDLxO-f69r04q39eH7uYpMzGpxuV9R3lMhYOWTxoDsBMcDWMLykl40sb3Y_jPfXk8iaULsio/pub?gid=0&single=true&output=csv";

async function fetchFromSheet() {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    const { data } = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      trimHeaders: true,
    });
    console.log("[Sheet] Headers:", Object.keys((data[0] as Record<string, string>) ?? {}));
    console.log("[Sheet] First row:", data[0]);
    return (data as Record<string, string>[])
      .filter((row) => row.id && row.name && row.name !== "Product")
      .map((row) => {
        const featured = (row.featured ?? "").trim().toUpperCase() === "TRUE";
        const inStock = (row.inStock ?? "").trim().toUpperCase() !== "FALSE";
        console.log("[Sheet] imageUrl raw:", JSON.stringify(row.imageUrl));
        return {
          id: row.id?.trim() || Math.random().toString(36).slice(2),
          name: row.name?.trim() || "Product",
          price: parseFloat(row.price) || 0,
          category: row.category?.trim() || "Rings",
          description: row.description?.trim() || "",
          imageUrls: row.imageUrl?.trim()
            ? row.imageUrl.split("|").map((url: string) => url.trim()).filter(Boolean)
            : [],
          variants: row.variants?.trim()
            ? row.variants.split("|").map((v: string) => v.trim())
            : [],
          inStock,
          featured,
          badge: row.badge?.trim() || undefined,
          createdAt: new Date().toISOString(),
        };
      });
  } catch (err) {
    console.error("[Sheet] fetch failed:", err);
    return [];
  }
}

export const getAllProducts = createServerFn({ method: "GET" }).handler(
  async () => fetchFromSheet()
);

export const getFeaturedProducts = createServerFn({ method: "GET" }).handler(
  async () => {
    const products = await fetchFromSheet();
    return products.filter((p) => p.featured);
  }
);

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => data as string)
  .handler(async ({ data: slug }) => {
    const products = await fetchFromSheet();
    return products.find((p) => p.id === slug) ?? null;
  });

export const getRelatedProducts = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => data as { slug: string; count?: number })
  .handler(async ({ data }) => {
    const products = await fetchFromSheet();
    const count = data.count ?? 4;
    return products.filter((p) => p.id !== data.slug).slice(0, count);
  });

export const getProductsBySlugs = createServerFn({ method: "GET" }).handler(
  async () => []
);
