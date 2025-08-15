'use client';
import { useEffect, useState } from 'react';
import JobCard from '@/src/components/custom/JobCard';
import JobCardSkeleton from '@/src/components/custom/JobCardSkeleton';

import { APP_URL } from '@/src/config';
import { Job } from '../../api/jobs/route';

export default function FavoriteJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getFavoritesJobs = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${APP_URL}/api/favorites`);

      const data = await response.json();
      const jobsData = data.favorites;
      setJobs(jobsData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFavoritesJobs();
  }, []);

  return (
    <main className="flex flex-col items-center justify-start h-fit mx-3 lg:mx-auto">
      <h2 className="font-bold text-2xl mt-16 mb-4">Suas vagas salvas</h2>
      <div className="grid grid-cols-10 max-w-[1155px]  justify-between items-start  gap-5 mb-36 mx-auto">
        <div className="col-span-10 h-full">
          {!isLoading && (
            <div className="text-end">
              <span className="text-sm font-medium mb-2">
                {jobs.length} resultados
              </span>
            </div>
          )}
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))
            : jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </div>
    </main>
  );
}
