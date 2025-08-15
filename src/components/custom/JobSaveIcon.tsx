import { createClient } from '@/src/lib/supabase/client';
import { Bookmark } from 'lucide-react';
import React, { useState } from 'react';
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
    <span className="cursor-pointer" onClick={saveFavorite}>
      <Bookmark width={30} height={30} />
    </span>
  );
};

export default JobSaveIcon;
