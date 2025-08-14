import { createClient } from '@/src/lib/supabase/client';
import { NextResponse } from 'next/server';

interface JobParams {
  params?: {
    category?: string;
    company_name?: string;
    search?: string;
    limit?: string;
  };
}

export async function GET(req: Request, { params }: JobParams = {}) {
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
