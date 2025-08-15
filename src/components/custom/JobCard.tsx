'use client';
import { LabelJobInfo } from './LabelJobInfo';
import { LabelTag } from './LabelTag';
import { Job } from '@/src/app/api/jobs/route';
import { limitText } from '@/src/app/helpers/limitText';
import { useRouter } from 'next/navigation';
import JobSaveIcon from './JobSaveIcon';
import JobLogo from './JobLogo';
import { APP_URL } from '@/src/config';

export default function JobCard({
  job,
  small = false,
}: {
  job: Job;
  small?: boolean;
}) {
  const {
    id,
    title,
    company_logo,
    company_name,
    candidate_required_location,
    tags,
    job_type,
    salary,
    category,
  } = job;

  const route = useRouter();

  if (small) {
    return (
      <button
        type="button"
        className="bg-[#2D3D50] hover:bg-[#202F40] border-[#6C7E94] border-[1px] rounded-lg w-full transition-all ease-in duration-75 me-[6px] mb-2 p-6 cursor-pointer flex flex-col justify-between items-start gap-4"
        onClick={() => {
          route.push(
            `${APP_URL}/jobs/${id}?title=${title}&company_name=${company_name}&category=${category}`,
          );
        }}
      >
        <div className="flex justify-between w-full">
          <div className="hidden lg:flex flex-shrink-0 me-2 ">
            <JobLogo src={company_logo} small={true} />
          </div>
          <div className="flex flex-col justify-start items-start gap-3 flex-grow">
            <h2 className="text-xl font-bold leading-tight text-start">
              {title}
            </h2>
            <div className="flex flex-col items-start gap-1 text-start">
              <span>
                {company_name} · {candidate_required_location}
              </span>
            </div>
          </div>
          <JobSaveIcon
            job_id={id.toString()}
            category={category}
            company_name={company_name}
            search={title}
          />
        </div>
        <div className="flex justify-start items-center gap-2 flex-wrap">
          {tags.map((tag, index) => {
            if (index < 4) return <LabelTag key={tag} text={tag} />;
          })}
        </div>
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className="bg-[#2D3D50] hover:bg-[#202F40] border-[#6C7E94] border-[1px] rounded-lg w-full transition-all ease-in duration-75 me-[6px] mb-4 p-6 cursor-pointer flex justify-between items-start gap-4"
        onClick={() => {
          route.push(
            `${APP_URL}/jobs/${id}?title=${title}&company_name=${company_name}&category=${category}`,
          );
        }}
      >
        <div className="hidden lg:flex flex-shrink-0">
          <JobLogo src={company_logo} />
        </div>
        <div className="flex flex-col justify-start items-start gap-3 flex-grow">
          <h2 className="text-xl font-bold leading-tight text-start">
            {title}
          </h2>
          <div className="flex flex-col items-start gap-1">
            <div className="flex justify-start items-center gap-2 flex-wrap">
              <LabelJobInfo type={'company'} text={company_name} />
              <LabelJobInfo
                type={'location'}
                text={candidate_required_location}
              />
              {salary && (
                <LabelJobInfo type={'cash'} text={`${limitText(salary)}`} />
              )}
              <LabelJobInfo type={'contract'} text={job_type} />
            </div>
            <div className="block">
              <LabelJobInfo type={'category'} text={category} />
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 flex-wrap">
            {tags.map((tag, index) => {
              if (index < 6) return <LabelTag key={tag} text={tag} />;
            })}
          </div>
        </div>
        <JobSaveIcon
          job_id={id.toString()}
          category={category}
          company_name={company_name}
          search={title}
        />
      </button>
    );
  }
}
