'use client';

import { usePathname } from 'next/navigation';

import CTA from '~/_components/Footer/CTA';
import Copyright from '~/_components/Footer/Copyright';
import LinksAddress from '~/_components/Footer/LinksAddress';

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="block bg-black font-quicksand bottom-0 w-full text-white">
      {!pathname?.includes('/account') && <CTA />}
      <LinksAddress />
      <Copyright />
    </footer>
  );
}
