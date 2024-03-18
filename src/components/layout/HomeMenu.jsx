'use client';

import Image from 'next/image';
import SectionHeaders from './SectionHeaders';
import { useEffect, useState } from 'react';
import MenuItem from '../menu/MenuItem';

export default function HomeMenu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items').then((response) =>
      response.json().then((items) => {
        const bestSellers = items.slice(-3);
        setMenuItems(bestSellers);
      }),
    );
  }, []);

  return (
    <section>
      <div className="w-full absolute left-0">
        <div className="absolute left-0 -top-24 hidden xl:block">
          <Image src={'/sallad1.png'} width={100} height={100} alt={'sallad'} />
        </div>
        <div className="absolute right-0 -top-24 hidden xl:block">
          <Image src={'/sallad2.png'} width={100} height={100} alt={'sallad'} />
        </div>
      </div>
      <div className="text-center">
        <SectionHeaders subHeader={'check out'} mainHeader={'Our Best Sellers'} />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-4">
        {menuItems?.length > 0 && menuItems.map((item) => <MenuItem key={item._id} item={item} />)}
      </div>
    </section>
  );
}
