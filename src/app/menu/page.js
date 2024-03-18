'use client';

import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItem from '@/components/menu/MenuItem';
import { useEffect, useState } from 'react';

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then((res) =>
      res.json().then((categories) => setCategories(categories)),
    );
    fetch('/api/menu-items').then((res) => res.json().then((menuItems) => setMenuItems(menuItems)));
  }, []);

  return (
    <section className="mt-8 flex flex-col gap-5">
      {categories?.length > 0 &&
        categories.map((c) => (
          <div key={c._id}>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              {menuItems
                .filter((item) => item.category === c.name)
                .map((item) => (
                  <MenuItem key={item._id} item={item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
