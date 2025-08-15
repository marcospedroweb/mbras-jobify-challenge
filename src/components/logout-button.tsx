'use client';

import { createClient } from '@/src/lib/supabase/client';
import { Button } from '@/src/components/ui/button';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { APP_URL } from '../config';

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-[#FE8A00] text-white font-bold text-lg hover:bg-[#CE7000] px-3 py-1 rounded-lg">
        Minha conta
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900">
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-950"
          onClick={() => {
            router.push(`${APP_URL}/jobs/favorites`);
          }}
        >
          Minhas vagas salvas
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600 cursor-pointer hover:bg-gray-950"
          onClick={logout}
        >
          Sair da conta
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  // return (
  //   <Button
  //     onClick={logout}
  //     className="bg-[#FE8A00] text-white font-bold text-lg hover:bg-[#CE7000]"
  //   >
  //     Logout
  //   </Button>
  // );
}
