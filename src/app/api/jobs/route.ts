import { createClient as createServerClient } from '@/src/lib/supabase/server';
import { NextResponse } from 'next/server';

export interface Job {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo: string;
  company_logo_url?: string;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary?: string;
  description: string;
}
export async function GET(req: Request) {
  const url = new URL(req.url);

  const category = url.searchParams.get('category');
  const company_name = url.searchParams.get('company_name');
  const search = url.searchParams.get('search');
  const limit = url.searchParams.get('limit') || '5';

  const allParams = new URLSearchParams();

  if (category) allParams.append('category', category);
  if (company_name) allParams.append('company_name', company_name);
  if (search) allParams.append('search', search);
  if (limit) allParams.append('limit', limit);

  const query = `https://remotive.com/api/remote-jobs?${allParams.toString()}`;

  const res = await fetch(query);
  const data = await res.json();

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = await createServerClient();
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

  const { data, error } = await supabase
    .from('jobs')
    .insert({ id: job_id, company_name, category, title })
    .select()
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, job: data[0] }, { status: 200 });
}
