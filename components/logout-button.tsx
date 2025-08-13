'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <Button
      onClick={logout}
      className="bg-[#FE8A00] text-white font-bold text-lg hover:bg-[#CE7000]"
    >
      Logout
    </Button>
  );
}
