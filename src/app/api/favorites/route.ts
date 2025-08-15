import { createClient as createServerClient } from '@/src/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const supabase = await createServerClient();
    const body = await req.json();

    const { job_id, company_name, title, category } = body;

    const result = await supabase.auth.getUser();
    const user = result.data.user;
    const userError = result.error;

    if (userError || !user) {
      console.error('Erro de autenticação:', userError);
      return NextResponse.json(
        { error: userError?.message || 'Usuário não autenticado' },
        { status: userError?.status || 401 },
      );
    }

    const { data: dataFavExisting, error: errorFavExisting } = await supabase
      .from('favorites')
      .select('id, job_id, jobs!inner(id, job_id)')
      .eq('user_id', user.id)
      .eq('jobs.job_id', Number(job_id))
      .limit(1)
      .maybeSingle();

    if (errorFavExisting) {
      console.error('Erro ao buscar favoritos existentes:', errorFavExisting);
      return NextResponse.json(
        { error: 'Erro ao verificar favorito existente' },
        { status: 500 },
      );
    }

    if (dataFavExisting) {
      const { error: favDeleteError } = await supabase
        .from('favorites')
        .delete()
        .eq('id', dataFavExisting.id)
        .eq('user_id', user.id);

      if (favDeleteError) {
        console.error('Erro ao deletar favorite:', favDeleteError);
        return NextResponse.json(
          { error: 'Erro ao deletar favorito' },
          { status: 500 },
        );
      }

      const { error: jobDeleteError } = await supabase
        .from('jobs')
        .delete()
        .eq('id', dataFavExisting.job_id);

      if (jobDeleteError) {
        console.error('Erro ao deletar job:', jobDeleteError);
        return NextResponse.json(
          { error: 'Erro ao deletar job' },
          { status: 500 },
        );
      }

      return NextResponse.json(
        { message: 'Vaga removida dos favoritos!' },
        { status: 200 },
      );
    }

    const { data: newJob, error: jobErrorInsert } = await supabase
      .from('jobs')
      .insert({
        job_id,
        company_name,
        title,
        category,
      })
      .select('id')
      .single();

    if (jobErrorInsert) {
      console.error('Erro ao inserir no favorites:', jobErrorInsert.message);
      return NextResponse.json(
        { error: jobErrorInsert.message },
        { status: 400 },
      );
    }

    const { error: favErrorInsert } = await supabase
      .from('favorites')
      .insert({ user_id: user.id, job_id: newJob.id });

    if (favErrorInsert) {
      console.error('Erro ao inserir no favorites:', favErrorInsert.message);
      return NextResponse.json(
        { error: favErrorInsert.message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: 'Vaga salva com sucesso!' },
      { status: 200 },
    );
  } catch (err) {
    console.error('Erro inesperado na função POST:', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
