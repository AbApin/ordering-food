'use client';

import Edit from '@/components/icons/Edit';
import Trash from '@/components/icons/Trash';
import Tabs from '@/components/layout/Tabs';
import DeleteButton from '@/components/ui/DeleteButton';
import { useAdmin } from '@/hooks/useAdmin';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const [categoryName, setGategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [updatedCategory, setUpdatedCategory] = useState(null);
  const { loading, data } = useAdmin();

  const handleSubmit = useCallback(
    async (evt) => {
      evt.preventDefault();

      const categoryPromise = new Promise(async (resolve, reject) => {
        const data = { name: categoryName };
        if (updatedCategory) {
          data._id = updatedCategory._id;
        }

        try {
          const response = await fetch('/api/categories', {
            method: updatedCategory ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });

          setGategoryName('');
          setUpdatedCategory(null);

          if (response.ok) {
            resolve();
          } else {
            reject();
          }
        } catch (error) {
          reject(error);
        }
      });

      await toast.promise(categoryPromise, {
        success: updatedCategory ? `${updatedCategory.name} updated!` : 'New category created!',
        loading: updatedCategory
          ? `Updating ${updatedCategory.name} category`
          : 'Creating new category',
        error: 'Error',
      });
    },
    [categoryName, updatedCategory],
  );

  function fetchCategories() {
    fetch('/api/categories').then((response) =>
      response.json().then((categories) => {
        setCategories(categories);
      }),
    );
  }

  useEffect(() => {
    fetchCategories();
  }, [handleSubmit]);

  const categoryEditHandler = (category) => {
    setUpdatedCategory(category);
    setGategoryName(category.name);
  };

  const categoryDeleteHandler = async (_id) => {
    const deletePromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories?_id=' + _id, {
        method: 'DELETE',
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(deletePromise, {
      success: 'Category deleted!',
      loading: 'Deleting category',
      error: 'Error',
    });

    fetchCategories();
  };

  if (loading) {
    return 'Loading admin info...';
  }

  if (!data) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <Tabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <div className="grow">
            <input
              type="text"
              placeholder="Write category name"
              value={categoryName}
              onChange={(evt) => setGategoryName(evt.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button type="submit">{updatedCategory ? 'Update' : 'Create'}</button>
            {updatedCategory && (
              <button
                onClick={() => {
                  setUpdatedCategory(null);
                  setGategoryName('');
                }}
                type="button">
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
      <div className="flex flex-col gap-2 mt-8">
        <h2 className="text-sm text-gray-500">Existing ctegories</h2>
        {categories?.length > 0 &&
          categories.map((category, index) => (
            <div key={category._id}>
              <div
                className={clsx(
                  updatedCategory?._id === category._id && 'bg-primary text-white',
                  'flex justify-between items-center bg-gray-300 text-primary text-left p-2 px-4 rounded-xl',
                )}>
                <span>{category.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => categoryEditHandler(category)}
                    className="w-auto bg-white p-1 rounded-md border border-primary">
                    <Edit className="w-5 h-5 cursor-pointer" />
                  </button>
                  <DeleteButton
                    className="w-auto bg-white p-1 rounded-md border border-primary m-0"
                    onSubmit={() => categoryDeleteHandler(category._id)}>
                    <Trash className="w-5 h-5 cursor-pointer" />
                  </DeleteButton>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
