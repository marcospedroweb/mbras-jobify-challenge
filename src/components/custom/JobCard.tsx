'use client';
import Image from 'next/image';
import { LabelJobInfo } from './LabelJobInfo';
import { LabelTag } from './LabelTag';
import { Bookmark } from 'lucide-react';
import { Job } from '@/src/app/api/jobs/route';
import { limitText } from '@/src/app/helpers/limitText';
import { toast } from 'react-toastify';
import { createClient } from '@/src/lib/supabase/client';
import { useState } from 'react';

export default function JobCard({ job }: { job: Job }) {
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
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  const saveFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const { data } = await supabase.auth.getUser();
    setUser(data.user);

    if (!data.user) {
      toast.warning('É necessário fazer o login para salvar esta vaga!');
      return;
    }

    console.log('usuario logado');
    // salvarFavorito(job.id);
  };

  return (
    <button
      type="button"
      className="bg-[#2D3D50] hover:bg-[#202F40] border-[#6C7E94] border-[1px] rounded-lg w-full transition-all ease-in duration-75 me-[6px] mb-4 p-6 cursor-pointer flex justify-between items-start gap-4"
      onClick={() => {
        console.log('Clique no card → abrir detalhes do job');
      }}
    >
      <div className="flex-shrink-0">
        <Image
          src={company_logo}
          alt="Logo da empresa"
          width={120}
          height={120}
          className="min-w-[120px]"
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-3 flex-grow">
        <h2 className="text-xl font-bold leading-tight text-start">{title}</h2>
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
      <button type="button" onClick={saveFavorite}>
        <Bookmark width={30} height={30} />
      </button>
    </button>
  );
}
