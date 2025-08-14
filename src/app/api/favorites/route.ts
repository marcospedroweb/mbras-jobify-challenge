import { createClient } from '@/src/lib/supabase/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { job_id } = await req.json();

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

  const { error } = await supabase
    .from('favorites')
    .insert({ user_id: user.id, job_id });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
