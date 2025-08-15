import { Skeleton } from '@/src/components/ui/skeleton';

export function JobDetailSkeleton() {
  return (
    <main className="grid grid-cols-12 max-w-[1392px] mx-auto gap-6 mt-28 mb-36">
      <div className="col-span-8 bg-[#2D3D50] py-8 px-6 flex flex-col mb-6">
        <div className="flex justify-between items-center gap-4 mb-6">
          <Skeleton className="h-8 w-3/5" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        <div className="flex justify-start items-start gap-3 bg-[#243141] py-5 px-3 w-full rounded-2xl">
          <Skeleton className="h-[120px] w-[120px] rounded-lg" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-24 mt-3" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        <div className="flex gap-2 mt-4 flex-wrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
      </div>

      <div className="col-span-4">
        <Skeleton className="h-48 w-full" />
      </div>
    </main>
  );
}
