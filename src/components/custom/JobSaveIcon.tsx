import { APP_URL } from '@/src/config';
import { createClient } from '@/src/lib/supabase/client';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface JobSaveIconProps {
  job_id: string;
  category: string;
  company_name: string;
  search: string;
}

const JobSaveIcon = ({
  job_id,
  category,
  company_name,
  search,
}: JobSaveIconProps) => {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const saveFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const { data } = await supabase.auth.getUser();
    setUser(data.user);

    if (!data.user) {
      toast.warning('É necessário fazer o login para salvar esta vaga!');
      return;
    }

    const res = await fetch(`${APP_URL}/api/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        job_id,
        company_name,
        title: search,
        category,
      }),
    });

    const dataRes = await res.json().catch(() => ({}));

    if (!res.ok) {
      toast.error('Houve um erro ao salvar a vaga!');
      return;
    }

    checkIfSaved();
    toast.success(dataRes.message || 'Ação realizada com sucesso!');
  };

  const checkIfSaved = async () => {
    const { data } = await supabase.auth.getUser();

    try {
      setIsLoading(true);
      if (!data.user) return;

      setUser(data.user);

      const { data: jobRow, error: jobErr } = await supabase
        .from('jobs')
        .select('id')
        .eq('job_id', Number(job_id))
        .limit(1)
        .maybeSingle();

      if (jobErr || !jobRow) {
        setIsLoading(false);
        setIsSaved(false);
        return;
      }

      const { data: favRow, error: favErr } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', data.user.id)
        .eq('job_id', jobRow.id)
        .limit(1)
        .maybeSingle();

      if (!favErr && favRow) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } catch (error) {
      toast.error('Houve algum erro com favoritar vaga.');
      console.error('error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfSaved();
  }, [job_id, supabase]);

  return (
    <span
      className="cursor-pointer"
      onClick={isLoading ? () => {} : saveFavorite}
    >
      {isLoading ? (
        <div className="w-[30px] h-[30px] rounded animate-pulse bg-gray-300" />
      ) : isSaved ? (
        <BookmarkCheck width={30} height={30} />
      ) : (
        <Bookmark width={30} height={30} />
      )}
    </span>
  );
};

export default JobSaveIcon;
