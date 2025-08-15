'use client';
import { useCallback, useEffect, useState } from 'react';
import { Job } from '../api/jobs/route';
import Image from 'next/image';
import { InputSearch } from '@/src/components/custom/InputSearch';
import { LabelButton } from '@/src/components/custom/LabelButton';
import JobCard from '@/src/components/custom/JobCard';
import JobCardSkeleton from '@/src/components/custom/JobCardSkeleton';

import JobsPagination from '@/src/components/custom/JobsPagination';
import { APP_URL } from '@/src/config';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/components/ui/accordion';
import { isMobile } from '../helpers/isMobile';

export default function JobsPage() {
  const searchParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : null;
  const categories = [
    'Software Development',
    'Customer Service',
    'Design',
    'Marketing',
    'Sales / Business',
    'Product',
    'Project Management',
    'Data Analysis',
    'DevOps / Sysadmin',
    'Finance / Legal',
    'Human Resources',
    'QA',
    'Writing',
    'All others',
  ];
  const category = searchParams?.get('category') ?? '';
  const company_name = searchParams?.get('company_name') ?? '';
  const search = searchParams?.get('search') ?? '';
  const limit = searchParams?.get('limit') ?? 15;
  const itemsPerPage = 5;

  const [, setIsMobileValue] = useState(isMobile());

  const [actualPage, setActualPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchValue, setSearchValue] = useState<string>(search || '');
  const [categoryValue, setCategoryValue] = useState<string>(category || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startIndex = (actualPage - 1) * itemsPerPage;
  const paginatedJobs = jobs.slice(startIndex, startIndex + itemsPerPage);

  const getJobs = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${APP_URL}/api/jobs?search=${searchValue}&company_name=${company_name}&category=${categoryValue}&limit=${limit}`,
      );

      const data = await response.json();
      const jobsData = data.jobs;
      setJobs(jobsData);
      setTotalPages(Math.ceil(jobsData.length / itemsPerPage));
      setActualPage(1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [category, company_name, search, limit, searchValue, categoryValue]);

  function CategoryList({
    categoryValue,
    setCategoryValue,
  }: {
    categoryValue: string;
    setCategoryValue: React.Dispatch<React.SetStateAction<string>>;
  }) {
    return categories.map((text) => (
      <LabelButton
        key={text}
        text={text}
        setState={setCategoryValue}
        state={categoryValue}
      />
    ));
  }

  useEffect(() => {
    getJobs();
    const handleResize = () => setIsMobileValue(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getJobs]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('category', categoryValue || '');
    window.history.replaceState({}, '', url.toString());
    getJobs();
  }, [categoryValue, getJobs]);

  return (
    <main className="flex flex-col items-center justify-start h-fit mx-3">
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
        <div className="col-span-12 lg:col-span-3">
          {isMobile() ? (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-2xl no-underline hover:no-underline font-bold">
                  Categoria
                </AccordionTrigger>
                <AccordionContent className="py-5">
                  <CategoryList
                    categoryValue={categoryValue}
                    setCategoryValue={setCategoryValue}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-3">Categoria</h2>
              <CategoryList
                categoryValue={categoryValue}
                setCategoryValue={setCategoryValue}
              />
            </div>
          )}
        </div>
        <div className="col-span-12 lg:col-span-7 h-full">
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
