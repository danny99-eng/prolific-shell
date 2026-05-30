import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type WishlistContextValue = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  count: number;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "pc_wishlist_v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setIds(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {}
  }, [ids, hydrated]);

  const value = useMemo<WishlistContextValue>(
    () => ({
      ids,
      count: ids.length,
      has: (id) => ids.includes(id),
      toggle: (id) =>
        setIds((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id])),
      remove: (id) => setIds((prev) => prev.filter((p) => p !== id)),
    }),
    [ids],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
