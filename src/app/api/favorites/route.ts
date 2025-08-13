import { createClient } from '@/lib/supabase/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const data = await req.json();
  console.log(data);

  return NextResponse.json({ error: 'Não autenticado' }, { status: 200 });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { error } = await supabase
    .from('favorites')
    .insert({ title, url, user_id: user.id });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
