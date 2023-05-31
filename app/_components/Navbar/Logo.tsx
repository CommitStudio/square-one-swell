import Image from 'next/image';

type Props = {
  height: number;
  width: number;
  brandLogo: string;
  brandName: string;
};

const Logo = ({ height, width, brandLogo, brandName }: Props) => {
  return (
    <>
      {brandLogo !== '' ? (
        <Image
          height={height}
          width={width}
          alt="Company Logo"
          src={brandLogo}
          fill
          style={{ objectFit: 'cover' }}
          priority={true}
        />
      ) : (
        <span className="self-center text-2xl py-1 font-semibold whitespace-nowrap text-primary">
          {brandName}
        </span>
      )}
    </>
  );
};

export default Logo;
