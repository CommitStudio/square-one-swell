'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AccountLink({
  children,
  href,
  pathname
}: {
  children: React.ReactNode;
  href: string;
  pathname: string;
}) {
  const currentPath = usePathname();

  return (
    <Link
      href={href}
      className={`block ${currentPath?.includes(pathname) ? 'font-bold underline' : ''}`}
    >
      {children}
    </Link>
  );
}
