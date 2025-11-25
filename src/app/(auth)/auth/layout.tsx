'use client';

import Image from 'next/image';

import Logo from '@/assets/images/logos/logo-full.png';

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen flex-center">
      <div className="section w-[50%] text-center p-[100px]">
        <div className="flex-center mb-14">
          <Image
            width={1000}
            height={500}
            alt="Brand Logo"
            src={Logo.src}
            className="w-[270px]"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
