'use client';

import { usePathname } from 'next/navigation';

import CTA from 'app/_components/footer/CTA';
import Copyright from 'app/_components/footer/Copyright';
import LinksAddress from 'app/_components/footer/LinksAddress';

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
