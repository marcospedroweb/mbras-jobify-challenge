import React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function JobCardSkeleton() {
  return (
    <div className="bg-[#2D3D50] border border-[#6C7E94] rounded-lg w-full p-6 flex justify-between items-start gap-4">
      <Skeleton className="h-[120px] w-[120px] rounded min-w-[120px]" />

      <div className="flex flex-col justify-start items-start gap-3 flex-grow">
        <Skeleton className="h-6 w-3/4" />

        <div className="flex flex-col items-start gap-2 w-full">
          <div className="flex justify-start items-center gap-2 flex-wrap w-full">
            <Skeleton className="h-5 w-[100px]" />
            <Skeleton className="h-5 w-[80px]" />
            <Skeleton className="h-5 w-[70px]" />
            <Skeleton className="h-5 w-[90px]" />
          </div>
          <Skeleton className="h-5 w-[120px]" />
        </div>

        <div className="flex justify-start items-center gap-2 flex-wrap w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-[60px]" />
          ))}
        </div>
      </div>

      <Skeleton className="h-[30px] w-[30px] rounded" />
    </div>
  );
}
