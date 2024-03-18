'use client';

import { useState } from 'react';
import EditableImage from './EditableImage';
import clsx from 'clsx';
import { useAdmin } from '@/hooks/useAdmin';
import AddressInputs from './AddressInputs';

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [postal, setPostal] = useState(user?.postal || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [isAdmin, setisAdmin] = useState(user?.admin || false);
  const { _, data } = useAdmin();

  const handleAddressStateChange = (propName, value) => {
    switch (propName) {
      case 'phone':
        setPhone(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'postal':
        setPostal(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'country':
        setCountry(value);
        break;
    }
  };

  return (
    <div className="flex gap-4 justify-between md:flex-row flex-col">
      <div className="flex gap-2 flex-col items-center">
        <EditableImage link={image} setLink={setImage} />
      </div>
      <form
        className="grow flex flex-col gap-2"
        onSubmit={(evt) =>
          onSave(evt, {
            name: userName,
            image,
            phone,
            address,
            postal,
            country,
            city,
            admin: isAdmin,
          })
        }>
        <input
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={(evt) => setUserName(evt.target.value)}
        />
        <input type="email" disabled placeholder="Email" value={user?.email} />
        <AddressInputs
          addressProps={{ phone, address, postal, country, city }}
          setAddressProps={handleAddressStateChange}
        />
        {data?.admin && (
          <label
            htmlFor="adminCheckbox"
            className="inline-flex w-fit items-center gap-2 cursor-pointer p-2">
            <input
              type="checkbox"
              id="adminCheckbox"
              checked={isAdmin}
              onChange={() => setisAdmin(!isAdmin)}
            />
            <span className={clsx(isAdmin ? 'text-primary' : 'text-gray-500', 'font-semibold')}>
              Is admin
            </span>
          </label>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
