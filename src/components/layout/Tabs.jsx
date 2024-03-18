'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Tabs({ isAdmin }) {
  const activeClass = 'bg-primary text-white rounded-full py-2 px-4';
  const notActive = 'bg-gray-300 text-gray-700 rounded-full py-2 px-4';
  const path = usePathname();

  return (
    <div className="flex justify-center items-center gap-4 mx-auto flex-wrap">
      <Link className={clsx(path === '/profile' ? activeClass : notActive)} href="/profile">
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link href="/categories" className={path === '/categories' ? activeClass : notActive}>
            Categories
          </Link>
          <Link
            href="/menu-items"
            className={path.includes('/menu-items') ? activeClass : notActive}>
            Menu Items
          </Link>
          <Link href="/users" className={path.includes('/users') ? activeClass : notActive}>
            Users
          </Link>
        </>
      )}
      <Link href="/orders" className={path === '/orders' ? activeClass : notActive}>
        Orders
      </Link>
    </div>
  );
}
