import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t-[#6F6E6E]/50 border-t-2 py-16 text-center w-full">
      <Link href={'/'} className="text-[40px]">
        Jobify
      </Link>
      <p>© 2025 Jobify - Alguns direitos reservados</p>
    </footer>
  );
};

export default Footer;
