'use client';

import { useRouter } from 'next/navigation';

import Image from 'next/image';

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      className="hidden cursor-pointer md:block"
      height={'100'}
      width={'100'}
      alt="logo"
      src="/images/logo.png"
    />
  );
};

export default Logo;
