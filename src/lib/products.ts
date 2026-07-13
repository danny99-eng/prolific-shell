export type Category = "Rings" | "Necklaces" | "Earrings" | "Bracelets";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  imageUrls: string[];
  variants: string[];
  inStock: boolean;
  featured: boolean;
  badge?: string;
  createdAt: string;
};

export function formatPrice(gbp: number) {
  return `£${gbp.toLocaleString("en-GB", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function getProductImageUrl(product: Product, index = 0) {
  return product.imageUrls[index] ?? "";
}
