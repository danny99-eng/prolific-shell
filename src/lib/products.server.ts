import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getSanityClient, productImageUrl } from "./sanity";
import type { Category, Product } from "./products";

type SanityProductDoc = {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  images?: Array<{ _type: string; asset: { _ref: string } }>;
  variants?: string[];
  inStock: boolean;
  featured: boolean;
  badge?: string;
  createdAt: string;
};

const productFields = /* groq */ `
  "id": slug.current,
  name,
  price,
  category,
  "description": pt::text(description),
  images,
  variants,
  inStock,
  featured,
  badge,
  "createdAt": _createdAt
`;

function mapProduct(doc: SanityProductDoc): Product {
  const imageUrls = (doc.images ?? []).map((image) => productImageUrl(image));
  return {
    id: doc.id,
    name: doc.name,
    price: doc.price,
    category: doc.category,
    description: doc.description ?? "",
    imageUrls,
    variants: doc.variants ?? [],
    inStock: doc.inStock ?? true,
    featured: doc.featured ?? false,
    badge: doc.badge,
    createdAt: doc.createdAt,
  };
}

async function fetchProducts(filter?: { featured?: boolean; slug?: string; slugs?: string[] }) {
  const client = getSanityClient();
  let query: string;
  let params: Record<string, unknown> = {};

  if (filter?.slug) {
    query = `*[_type == "product" && slug.current == $slug][0]{${productFields}}`;
    params = { slug: filter.slug };
    const doc = await client.fetch<SanityProductDoc | null>(query, params);
    return doc ? [mapProduct(doc)] : [];
  }

  if (filter?.slugs?.length) {
    query = `*[_type == "product" && slug.current in $slugs]{${productFields}}`;
    params = { slugs: filter.slugs };
    const docs = await client.fetch<SanityProductDoc[]>(query, params);
    return docs.map(mapProduct);
  }

  if (filter?.featured) {
    query = `*[_type == "product" && featured == true] | order(_createdAt desc){${productFields}}`;
  } else {
    query = `*[_type == "product"] | order(_createdAt desc){${productFields}}`;
  }

  const docs = await client.fetch<SanityProductDoc[]>(query, params);
  return docs.map(mapProduct);
}

export const getAllProducts = createServerFn({ method: "GET" }).handler(async () => {
  return fetchProducts();
});

export const getFeaturedProducts = createServerFn({ method: "GET" }).handler(async () => {
  return fetchProducts({ featured: true });
});

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator(z.string())
  .handler(async ({ data: slug }) => {
    const products = await fetchProducts({ slug });
    return products[0] ?? null;
  });

export const getRelatedProducts = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string(), count: z.number().optional() }))
  .handler(async ({ data }) => {
    const count = data.count ?? 4;
    const all = await fetchProducts();
    const current = all.find((p) => p.id === data.slug);
    if (!current) return all.slice(0, count);

    const sameCategory = all.filter((p) => p.id !== data.slug && p.category === current.category);
    const other = all.filter((p) => p.id !== data.slug && p.category !== current.category);
    return [...sameCategory, ...other].slice(0, count);
  });

export const getProductsBySlugs = createServerFn({ method: "GET" })
  .inputValidator(z.array(z.string()))
  .handler(async ({ data: slugs }) => {
    if (!slugs.length) return [];
    return fetchProducts({ slugs });
  });
