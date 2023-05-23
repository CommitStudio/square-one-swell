'use client';

import { useRouter } from 'next/router';

import CTA from '~/components/globals/footer/CTA';
import Copyright from '~/components/globals/footer/Copyright';
import LinksAddress from '~/components/globals/footer/LinksAddress';

export default function Footer() {
  // const router = useRouter();
  return (
    <footer className="block bg-black font-quicksand bottom-0 w-full text-white">
      {/* {!router.pathname.includes('/account') && <CTA />} */}
      <LinksAddress />
      <Copyright />
    </footer>
  );
}
