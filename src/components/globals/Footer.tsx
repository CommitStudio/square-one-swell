'use client';

import { usePathname } from 'next/navigation';

import CTA from '~/components/globals/footer/CTA';
import Copyright from '~/components/globals/footer/Copyright';
import LinksAddress from '~/components/globals/footer/LinksAddress';

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
