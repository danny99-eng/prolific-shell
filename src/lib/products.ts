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

<<<<<<< HEAD
export function formatPrice(gbp: number) {
  return `£${gbp.toLocaleString("en-GB", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
=======
export const products: Product[] = [
  { id: "aurora-gold-ring", name: "Aurora Gold Ring", price: 42.0, rating: 5, reviews: 42, category: "Rings", gradient: "from-amber-100 to-yellow-100", createdAt: 20, description: "A sculpted band with a warm gold finish, designed to wear alone or stack effortlessly." },
  { id: "luna-pendant-necklace", name: "Luna Pendant Necklace", price: 64.0, rating: 5, reviews: 31, category: "Necklaces", gradient: "from-stone-100 to-stone-200", createdAt: 19, description: "A crescent pendant on a fine chain — quietly modern, endlessly versatile." },
  { id: "celestial-hoop-earrings", name: "Celestial Hoop Earrings", price: 48.0, rating: 4, reviews: 18, category: "Earrings", gradient: "from-orange-50 to-amber-50", createdAt: 18, description: "Polished hoops with a soft celestial twist. Lightweight and ready for every day." },
  { id: "nova-chain-bracelet", name: "Nova Chain Bracelet", price: 36.0, rating: 5, reviews: 27, category: "Bracelets", gradient: "from-yellow-50 to-stone-100", createdAt: 17, description: "A confident chain bracelet with a secure clasp and an editorial drape." },
  { id: "ember-signet-ring", name: "Ember Signet Ring", price: 54.0, rating: 4, reviews: 12, category: "Rings", gradient: "from-amber-50 to-orange-100", createdAt: 16, description: "A bold signet silhouette with a smooth, polished face." },
  { id: "halo-stud-earrings", name: "Halo Stud Earrings", price: 22.99, rating: 5, reviews: 54, category: "Earrings", gradient: "from-stone-50 to-amber-50", createdAt: 15, description: "Refined studs framed with a delicate halo — your everyday classic." },
  { id: "olivia-rope-chain", name: "Olivia Rope Chain", price: 89.0, rating: 5, reviews: 9, category: "Necklaces", gradient: "from-yellow-100 to-amber-100", createdAt: 14, description: "A heirloom-weight rope chain with serious presence." },
  { id: "ivy-cuff-bracelet", name: "Ivy Cuff Bracelet", price: 58.0, rating: 4, reviews: 21, category: "Bracelets", gradient: "from-stone-100 to-yellow-50", createdAt: 13, description: "A sculptural open cuff that hugs the wrist beautifully." },
  { id: "selene-stacking-ring", name: "Selene Stacking Ring", price: 18.99, rating: 4, reviews: 33, category: "Rings", gradient: "from-amber-50 to-stone-100", createdAt: 12, description: "Slender, stackable, and made to mix with the rest of your stack." },
  { id: "mira-drop-earrings", name: "Mira Drop Earrings", price: 39.0, rating: 5, reviews: 16, category: "Earrings", gradient: "from-orange-100 to-amber-100", createdAt: 11, description: "Fluid drops that catch the light with every turn of the head." },
  { id: "atlas-link-necklace", name: "Atlas Link Necklace", price: 110.0, rating: 5, reviews: 7, category: "Necklaces", gradient: "from-yellow-50 to-amber-100", createdAt: 10, description: "Bold interlocking links — a definitive statement piece." },
  { id: "rae-tennis-bracelet", name: "Rae Tennis Bracelet", price: 120.0, rating: 5, reviews: 11, category: "Bracelets", gradient: "from-stone-50 to-stone-200", createdAt: 9, description: "A luminous tennis bracelet that quietly elevates everything." },
];

export function formatPrice(gbp: number) {
  return `£${gbp.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
>>>>>>> 4e1fa053e115bb4d38bdc4b7f72a640b7e6d3bc4
}

export function getProductImageUrl(product: Product, index = 0) {
  return product.imageUrls[index] ?? "";
}
