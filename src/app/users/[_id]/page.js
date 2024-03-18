'use client';

import { useAdmin } from '@/hooks/useAdmin';
import Tabs from '@/components/layout/Tabs';
import UserForm from '@/components/layout/UserForm';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function UserPage({ params }) {
  const { _id } = params;
  const { loading, data } = useAdmin();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/profile?_id=' + _id).then((response) =>
      response.json().then((user) => {
        setUser(user);
      }),
    );
  }, []);

  const submitHandler = async (evt, data) => {
    evt.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _id }),
      });

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'User saved!',
      error: 'Error',
    });
  };

  if (loading) {
    return 'Loading admin info...';
  }

  if (!data.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <Tabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        {user && <UserForm user={user} onSave={submitHandler} />}
      </div>
    </section>
  );
}
