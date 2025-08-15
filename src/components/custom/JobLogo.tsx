import { useState } from 'react';
import Image from 'next/image';

export default function JobLogo({
  src,
  small = false,
}: {
  src?: string;
  small?: boolean;
}) {
  const [error, setError] = useState(false);
  const isSmall = small ? 64 : 120;

  if (!src || error) {
    return (
      <div
        className={`bg-white ${
          small ? 'min-w-[64px] h-[64px]' : 'min-w-[120px] h-[120px]'
        }`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt="Logo da empresa"
      width={isSmall}
      height={isSmall}
      className={`min-w-[${isSmall}px]`}
      onError={() => setError(true)}
    />
  );
}
