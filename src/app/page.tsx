'use client';
import { useState } from 'react';
import { InputSearch } from '../components/custom/InputSearch';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const router = useRouter();

  const searchJob = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(!isLoading);
    router.push(`${appUrl}/jobs?search=${search}`);
  };

  return (
    <main className="flex flex-col items-center justify-center h-full mt-[-64px]">
      <div className="w-full flex flex-col gap-14 items-center text-center max-w-[1155px]">
        <div>
          <h2 className="text-[40px] font-bold mb-4">
            Ache sua vaga <span className="text-[#FE8A00]">ideal</span>{' '}
            <span className="block">agora mesmo</span>
          </h2>
          <p className="text-2xl">
            Digite o que procura e encontre as melhores oportunidades.
          </p>
        </div>
        <div className="w-full">
          <div className="flex justify-center w-full">
            <InputSearch
              search={search}
              setSearch={setSearch}
              onSearch={searchJob}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
