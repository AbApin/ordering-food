'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Tabs from '@/components/layout/Tabs';
import UserForm from '@/components/layout/UserForm';
import { useAdmin } from '@/hooks/useAdmin';

export default function ProfilePage() {
  const { loading, data } = useAdmin();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (data) {
      setUser(data);
      setIsAdmin(data.admin);
    }
  }, [loading, data]);

  const submitHandler = async (evt, data) => {
    evt.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Error',
    });
  };

  if (loading) {
    return 'Loading admin info...';
  }

  if (!data) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8">
      <Tabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        {user && <UserForm user={user} onSave={submitHandler} />}
      </div>
    </section>
  );
}
