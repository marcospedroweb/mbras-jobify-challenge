'use client';

import { Badge } from '../ui/badge';

interface LabelButtonProps {
  text: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export function LabelButton({ text, state, setState }: LabelButtonProps) {
  return (
    <button
      type="button"
      className={`${
        text == state ? 'bg-[#202F40]' : 'bg-[#2D3D50]'
      } hover:bg-[#202F40] border-[#6C7E94] border-[1px] rounded-2xl py-2 px-5 transition-all ease-in duration-75 me-[6px] mb-2 relative`}
      onClick={() => {
        setState(text);
      }}
    >
      {text === state && (
        <Badge
          className="absolute right-[-8px] top-[-8px] px-2 bg-red-700 text-white"
          onClick={(e) => {
            e.stopPropagation();
            setState('');
          }}
        >
          X
        </Badge>
      )}

      {text}
    </button>
  );
}
