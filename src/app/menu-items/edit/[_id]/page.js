'use client';
import Left from '@/components/icons/Left';
import MenuItemForm from '@/components/layout/MenuItemForm';
import Tabs from '@/components/layout/Tabs';
import { useAdmin } from '@/hooks/useAdmin';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import DeleteButton from '@/components/ui/DeleteButton';

export default function EditMenuItemPage({ params }) {
  const { loading, data } = useAdmin();
  const [menuItem, setMenuItem] = useState(null);
  const [needRedirect, setNeedRedirect] = useState(false);
  const _id = params._id;

  useEffect(() => {
    fetch('/api/menu-items').then((response) =>
      response.json().then((items) => {
        const item = items.find((i) => i._id === _id);
        setMenuItem(item);
      }),
    );
  }, []);

  const handleSubmit = async (evt, data) => {
    evt.preventDefault();

    const menuItemPromise = new Promise(async (resolve, reject) => {
      data = { ...data, _id: params._id };
      try {
        const response = await fetch('/api/menu-items', {
          method: 'PUT',
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
      success: 'Menu item saved!',
      loading: 'Saving new menu item',
      error: 'Error',
    });

    setNeedRedirect(true);
  };

  const deleteItemHendler = async () => {
    const deletePromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items?_id=' + _id, {
        method: 'DELETE',
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(deletePromise, {
      success: 'Item deleted!',
      loading: 'Deleting...',
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
      <Link
        href={'/menu-items'}
        className="flex items-center justify-center gap-2 text-primary border border-primary py-4 rounded-full hover:bg-primary hover:text-white underline font-semibold text-center mt-5">
        <Left />
        <span>Show all menu items</span>
      </Link>
      <MenuItemForm onSubmit={handleSubmit} menuItem={menuItem} />
      <div className="sm:w-3/4 ml-auto sm:pl-4">
        <DeleteButton className={'mt-2'} onSubmit={deleteItemHendler}>
          Delete this item
        </DeleteButton>
      </div>
    </section>
  );
}
