'use client';
import JobSaveIcon from '@/src/components/custom/JobSaveIcon';
import DOMPurify from 'dompurify';
import { Button } from '@/src/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Job } from '../../api/jobs/route';
import { LabelJobInfo } from '@/src/components/custom/LabelJobInfo';
import { LabelTag } from '@/src/components/custom/LabelTag';
import { JobDetailSkeleton } from '@/src/components/custom/JobDetailSkeleton';
import JobCard from '@/src/components/custom/JobCard';
import JobLogo from '@/src/components/custom/JobLogo';
import { toast } from 'react-toastify';
import { APP_URL } from '@/src/config';

export default function ShowJobPage() {
  const params = useParams();
  const searchParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : null;
  const job_id = params.id ?? '';
  const category = searchParams?.get('title') ?? '';
  const company_name = searchParams?.get('company_name') ?? '';
  const search = searchParams?.get('title') ?? '';
  const router = useRouter();

  const [job, setJob] = useState<Job>();
  const [othersJobs, setOtherJobs] = useState<Job[]>([]);
  const [, setIsLoading] = useState<boolean>(false);

  const getJob = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${APP_URL}/api/jobs/${job_id}?search=${search}&company_name=${company_name}&category=${category}`,
      );

      const data = await response.json();
      const jobData = data.jobs.filter(
        ({ id }: { id: string }) => id.toString() === job_id,
      );

      if (!jobData.length) {
        toast.error('Nenhuma vaga encontrada com essas caracteristicas.');
        router.push(`${APP_URL}/jobs`);
      }

      setJob(jobData[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [category, company_name, job_id, router, search]);

  const getJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${APP_URL}/api/jobs?category=${category}&limit=7`,
      );

      const data = await response.json();
      const jobsData = data.jobs;

      setOtherJobs(
        jobsData.filter((job: Job) => job.id.toString() !== job_id).slice(0, 4),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [category, job_id]);

  useEffect(() => {
    getJob();
    getJobs();
  }, [getJob, getJobs]);

  if (job) {
    return (
      <main className="grid grid-cols-12 max-w-[1392px] mx-3 lg:mx-auto gap-6 mt-12 lg:mt-28 mb-36">
        <div className="col-span-12 lg:col-span-8 bg-[#2D3D50] py-8 px-6 flex flex-col justify-center items-start mb-6 rounded-lg">
          <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold w-full">
              Founding Full Stack - LLM, AI (no prior AI experience required)
            </h2>
            <div className="flex justify-end items-center gap-3 w-full lg:w-fit">
              <div className="w-full lg:w-fit">
                <Button className="bg-[#FE8A00] text-white font-bold text-lg hover:bg-[#CE7000] w-full lg:w-fit">
                  Candidatar
                </Button>
              </div>
              <div>
                <JobSaveIcon
                  job_id={job_id.toString()}
                  category={category}
                  company_name={company_name}
                  search={search}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start gap-3 bg-[#243141] py-5 px-3 w-full rounded-2xl">
            <JobLogo src={job.company_logo} />

            <div className="flex flex-col justify-start items-start">
              <h3 className="font-bold text-xl">{job.company_name}</h3>
              <LabelJobInfo
                type="location"
                text={job.candidate_required_location}
                big={true}
              />
              <div>
                <LabelJobInfo type="category" text={job.category} big={true} />
              </div>
              <div className="mt-3">
                <p>
                  Publicado em{' '}
                  {new Date(job.publication_date).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-14">
            <h3 className="font-bold text-xl mb-3">Descrição da vaga</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(job.description),
              }}
              className="[&_p]:!text-white [&_*]:!text-white"
            ></p>
          </div>
          <div className="mt-8 flex flex-col items-start">
            <h3 className="font-bold text-xl mb-3">Outras informações</h3>
            {job.salary && (
              <LabelJobInfo
                type="cash"
                text={`Salário: ${job.salary}`}
                big={true}
              />
            )}
            <LabelJobInfo type="contract" text={job.job_type} big={true} />
          </div>
          <div className="flex justify-start items-center flex-wrap gap-1 mt-4">
            {job.tags.map((tag, index) => {
              return <LabelTag key={index} text={tag} />;
            })}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <h2 className="font-bold text-xl mb-3">Outras vagas</h2>
          {othersJobs.map((job) => {
            return <JobCard key={job.id} job={job} small={true} />;
          })}
        </div>
      </main>
    );
  } else {
    return <JobDetailSkeleton />;
  }
}
