'use client';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState();

  return (
    <main className="flex flex-col items-center justify-center h-full">
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
            <div className="relative w-full">
              <Input className="!bg-[#2D3D50] border-[#6C7E94] rounded-lg py-7 px-3 text-4xl" />
              <Button className="bg-[#FE8A00]  hover:bg-[#CE7000] p-5 absolute right-3 top-1/2 -translate-y-1/2 text-white flex justify-center items-center rounded-md ">
                <Search className="text-xl" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
