import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get('category');
  const company_name = url.searchParams.get('company_name');
  const title = url.searchParams.get('title');

  const allParams = new URLSearchParams();

  if (category) allParams.append('category', category);
  if (company_name) allParams.append('company_name', company_name);
  if (title) allParams.append('search', title);

  const query = `https://remotive.com/api/remote-jobs?${allParams.toString()}`;

  const res = await fetch(query);
  const data = await res.json();

  return NextResponse.json(data);
}
