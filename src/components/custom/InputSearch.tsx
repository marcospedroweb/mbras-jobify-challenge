import React, { startTransition, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { redirect, useRouter } from 'next/navigation';
import { Loader2, Search } from 'lucide-react';

interface InputSearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function InputSearch({ search, setSearch }: InputSearchProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchJob = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(!isLoading);
    router.push(`${appUrl}/jobs?search=${search}`);
  };

  return (
    <form className="relative w-full" onSubmit={searchJob}>
      <Input
        className="!bg-[#2D3D50] border-[#6C7E94] rounded-lg py-7 px-3 text-4xl"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        className="bg-[#FE8A00]  hover:bg-[#CE7000] p-5 absolute right-3 top-1/2 -translate-y-1/2 text-white flex justify-center items-center rounded-md "
        onClick={searchJob}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          <Search className="text-xl" />
        )}
      </Button>
    </form>
  );
}
