'use client';

import Edit from '@/components/icons/Edit';
import Tabs from '@/components/layout/Tabs';
import { useAdmin } from '@/hooks/useAdmin';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UsersPage() {
  const { loading, data } = useAdmin();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users').then((response) =>
      response.json().then((users) => {
        setUsers(users);
      }),
    );
  }, []);

  if (loading) {
    return 'Loading admin info...';
  }

  if (!data.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <Tabs isAdmin={true} />
      <div className="flex flex-col gap-2 mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 shadow-lg rounded-md flex items-center gap-4 justify-between px-4 py-2">
              <div className="flex items-center gap-4 grow">
                <span className="text-gray-900 w-1/2 md:1/3">
                  {user.name || <span className="italic">No name</span>}
                </span>
                <span className="text-gray-400 w-1/2 md:1/3">{user.email}</span>
              </div>
              <Link
                href={'/users/' + user._id}
                className="flex items-center justify-center bg-white p-1 rounded-md border border-black cursor-pointer transition-all hover:border-primary hover:text-primary">
                <Edit />
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}
