'use client';
import { useEffect, useState } from 'react';
import { Job } from '../api/jobs/route';
import Image from 'next/image';
import { InputSearch } from '@/src/components/custom/InputSearch';
import { LabelButton } from '@/src/components/custom/LabelButton';
import JobCard from '@/src/components/custom/JobCard';
import JobCardSkeleton from '@/src/components/custom/JobCardSkeleton';

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
    limit = 10,
  } = searchParams || {};
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchValue, setSearchValue] = useState<string>(search || '');
  const [categoryValue, setCategoryValue] = useState<string>(category || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getJobs = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${appUrl}/api/jobs?search=${searchValue}&company_name=${company_name}&category=${categoryValue}&limit=${limit}`,
      );
      console.log(
        `search=${search}&company_name=${company_name}&category=${category}&limit=${limit}`,
      );
      const data = await response.json();
      setJobs(data.jobs);
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
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <JobCardSkeleton key={i} />)
          ) : jobs.length ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="h-full flex justify-center items-center">
              <h2 className="text-center">
                Nenhuma vaga foi encontrada com essas opções
              </h2>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
