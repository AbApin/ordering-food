'use client';
import { useAdmin } from '@/hooks/useAdmin';
import Tabs from '@/components/layout/Tabs';
import Link from 'next/link';
import Right from '@/components/icons/Right';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function MenuItemsPage() {
  const { loading, data } = useAdmin();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items').then((response) => {
      response.json().then((items) => setMenuItems(items));
    });
  }, []);

  if (loading) {
    return 'Loading admin data ...';
  }

  if (!data.admin) {
    return 'Not admin';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <Tabs isAdmin={true} />
      <div>
        <Link
          className="flex items-center justify-center gap-2 text-primary border border-primary py-4 rounded-full hover:bg-primary hover:text-white underline font-semibold text-center mt-5"
          href="/menu-items/new">
          Create new menu item
          <Right />
        </Link>
      </div>
      <div className="mt-8">
        <h2 className="text-sm text-gray-500">Edit menu item:</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-2">
          {menuItems.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                className="bg-gray-200 flex flex-col items-center gap-1 border border-gray-300 p-1 rounded-2xl text-black-500 transition-all hover:border-primary hover:text-primary shadow-md"
                href={'/menu-items/edit/' + item._id}>
                <Image
                  alt={item.name}
                  src={item.image}
                  width={150}
                  height={150}
                  className="min-h-24 object-contain w-auto h-auto"
                  priority
                />
                {item.name}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
