'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/src/lib/supabase/client';
import Link from 'next/link';
import { Button } from './ui/button';
import { LogoutButton } from './logout-button';
import { User } from '@supabase/supabase-js';

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return user ? (
    <div className="flex items-center gap-4">
      Olá, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button
        asChild
        size="sm"
        className="bg-[#FFF6EF] border-[#FE8A00] text-black hover:bg-[#E9DCD1]"
      >
        <Link href="/auth/login">Login</Link>
      </Button>
      <Button
        asChild
        size="sm"
        className="bg-[#FE8A00]  hover:bg-[#CE7000] text-white"
      >
        <Link href="/auth/sign-up">Criar conta</Link>
      </Button>
    </div>
  );
}
