import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, Search } from 'lucide-react';

interface InputSearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (e: React.SyntheticEvent) => void;
  isLoading: boolean;
}

export function InputSearch({
  search,
  setSearch,
  onSearch,
  isLoading,
}: InputSearchProps) {
  return (
    <form className="relative w-full" onSubmit={onSearch}>
      <Input
        className="!bg-[#2D3D50] border-[#6C7E94] rounded-lg py-7 px-3 text-4xl"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        className="bg-[#FE8A00]  hover:bg-[#CE7000] p-5 absolute right-3 top-1/2 -translate-y-1/2 text-white flex justify-center items-center rounded-md "
        onClick={onSearch}
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
