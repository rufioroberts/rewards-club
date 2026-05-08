export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm overflow-hidden">
      <div className="aspect-[4/3] animate-shimmer" />
      <div className="p-4 md:p-5 space-y-3">
        <div className="h-4 w-20 rounded-full animate-shimmer" />
        <div className="h-3 w-32 rounded-full animate-shimmer" />
        <div className="h-7 w-24 rounded-full animate-shimmer" />
      </div>
    </div>
  );
}

export function SkeletonEventCard() {
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm overflow-hidden">
      <div className="h-36 md:h-44 animate-shimmer" />
      <div className="p-5 md:p-6 space-y-3">
        <div className="h-5 w-48 rounded-full animate-shimmer" />
        <div className="h-3 w-full rounded-full animate-shimmer" />
        <div className="h-3 w-2/3 rounded-full animate-shimmer" />
        <div className="h-8 w-24 rounded-full animate-shimmer mt-4" />
      </div>
    </div>
  );
}

export function CatalogSkeleton() {
  return (
    <div>
      {/* Events skeleton */}
      <section className="px-5 md:px-6 lg:px-12 xl:px-20 pb-10 md:pb-12">
        <div className="h-3 w-24 rounded-full animate-shimmer mb-5" />
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          <SkeletonEventCard />
          <SkeletonEventCard />
        </div>
      </section>

      {/* Discounts skeleton */}
      <section className="px-5 md:px-6 lg:px-12 xl:px-20 pb-12 md:pb-16">
        <div className="h-3 w-20 rounded-full animate-shimmer mb-5" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>
    </div>
  );
}
