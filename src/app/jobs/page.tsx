'use client';
import { useEffect, useState } from 'react';
import { Job } from '../api/jobs/route';
import Image from 'next/image';
import { InputSearch } from '@/src/components/custom/InputSearch';
import { LabelButton } from '@/src/components/custom/LabelButton';
import JobCard from '@/src/components/custom/JobCard';
import JobCardSkeleton from '@/src/components/custom/JobCardSkeleton';

import JobsPagination from '@/src/components/custom/JobsPagination';

interface JobsPageProps {
  searchParams?: {
    search?: string;
    company_name?: string;
    category?: string;
    limit?: string;
  };
}

export default function JobsPage({ searchParams }: JobsPageProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const {
    search = '',
    company_name = '',
    category = '',
    limit = 15,
  } = searchParams || {};

  const itemsPerPage = 5;
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchValue, setSearchValue] = useState<string>(search || '');
  const [categoryValue, setCategoryValue] = useState<string>(category || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const [paginatedJobs, setPaginatedJobs] = useState<Job[]>([]);
  // const [startIndex, setStartIndex] = useState<number>(
  //   (actualPage - 1) * itemsPerPage,
  // );

  const startIndex = (actualPage - 1) * itemsPerPage;
  const paginatedJobs = jobs.slice(startIndex, startIndex + itemsPerPage);

  const getJobs = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${appUrl}/api/jobs?search=${searchValue}&company_name=${company_name}&category=${categoryValue}&limit=${limit}`,
      );

      const data = await response.json();
      const jobsData = data.jobs;
      console.log(jobsData);
      setJobs(jobsData);
      setTotalPages(Math.ceil(jobsData.length / itemsPerPage));
      setActualPage(1);
      // setPaginatedJobs(jobsData.slice(startIndex, startIndex + itemsPerPage));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('category', categoryValue || '');
    window.history.replaceState({}, '', url.toString());
    getJobs();
  }, [categoryValue]);

  return (
    <main className="flex flex-col items-center justify-start h-fit">
      <div className="relative mt-8">
        <Image
          src="/images/banner_jobs.png"
          alt="Banner"
          width={1155}
          height={225}
        />
        <div className="absolute left-0 right-0 bottom-[-29px] max-w-[918px] mx-auto">
          <InputSearch
            search={searchValue}
            setSearch={setSearchValue}
            onSearch={(e) => {
              e.preventDefault();
              getJobs();
            }}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className="grid grid-cols-10 max-w-[1155px]  justify-between items-start mt-16 gap-5 mb-36">
        {/* <h2 className="bg-red-400 block w-full">Teste</h2> */}
        <div className="col-span-3">
          <div>
            <h2 className="text-xl font-bold mb-3">Categoria</h2>
            <LabelButton
              text="Software Development"
              setState={setCategoryValue}
              state={categoryValue}
            />
            <LabelButton
              text="Customer Service"
              setState={setCategoryValue}
              state={categoryValue}
            />
            <LabelButton
              text="Design"
              setState={setCategoryValue}
              state={categoryValue}
            />
            <LabelButton
              text="Marketing"
              setState={setCategoryValue}
              state={categoryValue}
            />
            <LabelButton
              text="Sales / Business"
              setState={setCategoryValue}
              state={categoryValue}
            />
            <LabelButton
              text="Product"
              setState={setCategoryValue}
              state={categoryValue}
            />
            <LabelButton
              text="Project Management"
              setState={setCategoryValue}
              state={categoryValue}
            />
            <LabelButton
              text="Data Analysis"
              setState={setCategoryValue}
              state={categoryValue}
            />
            <LabelButton
              text="DevOps / Sysadmin"
              setState={setCategoryValue}
              state={categoryValue}
            />
            <LabelButton
              text="Finance / Legal"
              setState={setCategoryValue}
              state={categoryValue}
            />
            <LabelButton
              text="Human Resources"
              setState={setCategoryValue}
              state={categoryValue}
            />
            <LabelButton
              text="QA"
              setState={setCategoryValue}
              state={categoryValue}
            />
            <LabelButton
              text="Writing"
              setState={setCategoryValue}
              state={categoryValue}
            />
            <LabelButton
              text="All others"
              setState={setCategoryValue}
              state={categoryValue}
            />
          </div>
          {/* <div>
            <h2 className="text-xl font-bold mb-3">Tipo de trabalho</h2>

          </div> */}
        </div>
        <div className="col-span-7 h-full">
          {!isLoading && (
            <div className="text-end">
              <span className="text-sm font-medium mb-2">
                {jobs.length} resultados
              </span>
            </div>
          )}
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <JobCardSkeleton key={i} />)
          ) : jobs.length ? (
            paginatedJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="h-full flex justify-center items-center">
              <h2 className="text-center">
                Nenhuma vaga foi encontrada com essas opções
              </h2>
            </div>
          )}
          {totalPages > 1 && (
            <div className="mt-6">
              <JobsPagination
                actualPage={actualPage}
                setActualPage={setActualPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
