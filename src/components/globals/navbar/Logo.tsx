import Image from 'next/image';
import React from 'react';

type Props = {
  brandLogo: string;
  brandName: string;
};

const Logo = ({ brandLogo, brandName }: Props) => {
  return (
    <>
      {' '}
      {brandLogo !== '' ? (
        <Image width={165} height={40} alt="brand-logo" src={brandLogo} objectFit="contain" />
      ) : (
        <span className="self-center text-2xl py-1 font-semibold whitespace-nowrap text-primary">
          {brandName}
        </span>
      )}
    </>
  );
};

export default Logo;
