'use client';
import MenuItemForm from '@/components/layout/MenuItemForm';
import Tabs from '@/components/layout/Tabs';
import { useAdmin } from '@/hooks/useAdmin';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function NewMenuItemPage() {
  const { loading, data } = useAdmin();
  const [needRedirect, setNeedRedirect] = useState(false);

  const handleSubmit = async (evt, data) => {
    evt.preventDefault();

    const menuItemPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/menu-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(menuItemPromise, {
      success: 'New menu item created!',
      loading: 'Creating new menu item',
      error: 'Error',
    });

    setNeedRedirect(true);
  };

  if (needRedirect) {
    return redirect('/menu-items');
  }

  if (loading) {
    return 'Loading admin data ...';
  }

  if (!data.admin) {
    return 'Not admin';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <Tabs isAdmin={true} />
      <MenuItemForm onSubmit={handleSubmit} />
    </section>
  );
}
