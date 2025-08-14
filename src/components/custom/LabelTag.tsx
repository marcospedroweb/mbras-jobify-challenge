import React from 'react';

interface LabelTagProps {
  text: string;
}

export function LabelTag({ text }: LabelTagProps) {
  return (
    <div className="py-1 px-3 bg-[#243141] border-[#6C7E94] border-[1px] rounded-2xl text-[12px]">
      <span>{text}</span>
    </div>
  );
}
