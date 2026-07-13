import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[3/4] w-full rounded-none" />
      <Skeleton className="mt-4 h-5 w-3/4 rounded-none" />
      <Skeleton className="mt-2 h-4 w-1/3 rounded-none" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function BestsellersSkeleton() {
  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <Skeleton className="mx-auto h-3 w-24 rounded-none" />
          <Skeleton className="mx-auto mt-4 h-10 w-64 rounded-none" />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductDetailSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <Skeleton className="mb-8 h-3 w-48 rounded-none" />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Skeleton className="aspect-square w-full rounded-none" />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-none" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-3 w-20 rounded-none" />
          <Skeleton className="h-12 w-full rounded-none" />
          <Skeleton className="h-8 w-32 rounded-none" />
          <Skeleton className="h-24 w-full rounded-none" />
          <Skeleton className="h-12 w-full rounded-none" />
        </div>
      </div>
    </section>
  );
}
