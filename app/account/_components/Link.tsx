'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AccountLink({
  label,
  href,
  pathname
}: {
  label: string;
  href: string;
  pathname: string;
}) {
  const currentPath = usePathname();

  return (
    <Link
      href={href}
      data-cy={label}
      className={`block ${currentPath?.includes(pathname) ? 'font-bold underline' : ''}`}
    >
      {label}
    </Link>
  );
}
