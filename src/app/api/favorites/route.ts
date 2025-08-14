import { createClient } from '@/src/lib/supabase/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const supabase = await createClient();
  const { job_id, company_name, title, category } = await req.json();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: userError?.message },
      { status: userError?.status },
    );
  }

  const resJob = await fetch(`${appUrl}/api/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      job_id,
      company_name,
      title,
      category,
    }),
  });

  if (!resJob.ok) {
    const dataJob = await resJob.json();
    console.error('Erro ao criar job:', dataJob.error || dataJob);
    return;
  }

  const { error } = await supabase
    .from('favorites')
    .insert({ user_id: user.id, job_id });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
