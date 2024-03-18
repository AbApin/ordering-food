'use client';

import Tabs from '@/components/layout/Tabs';
import { useAdmin } from '@/hooks/useAdmin';
import { dbTime } from '@/libs/dateTime';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = useAdmin();

  useEffect(() => {
    setLoadingOrders(true);
    fetch('/api/orders/').then((res) =>
      res.json().then((ordersData) => {
        setOrders(ordersData.reverse());
        setLoadingOrders(false);
      }),
    );
  }, []);

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <Tabs isAdmin={profile?.admin} />
      <div className="mt-8 flex flex-col gap-2">
        {loadingOrders && <p>Loading orders...</p>}
        {orders?.length > 0 &&
          orders.map((order, index) => (
            <div
              key={order._id + index}
              className="flex sm:flex-row flex-col items-center justify-between bg-gray-100 p-4 rounded-lg gap-4">
              <div className="flex items-center justify-between md:w-1/2 w-full">
                <div>
                  <p className="text-gray-500">Cart products: {order.cartProducts.length}</p>
                  <p className="text-gray-500">{order.userEmail}</p>
                </div>
                <p
                  className={clsx(
                    order.paid ? 'bg-green-500' : 'bg-red-500',
                    'p-2 rounded-md text-white',
                  )}>
                  {order.paid ? 'Paid' : 'Not paid'}
                </p>
              </div>
              <div className="flex items-center gap-4 md:w-1/2 w-full justify-end">
                <p>{dbTime(order.createdAt)}</p>
                <Link
                  href={'/orders/' + order._id}
                  className="border border-gray-600 transition-all hover:bg-primary hover:text-white hover:border-primary p-2 rounded-md text-sm">
                  Show order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
