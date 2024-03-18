'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext } from 'react';
import CartIcon from '../icons/CartIcon';
import { CartContext } from '@/hooks/AppContext';
import { Burger } from '../icons/Burger';
import { useState } from 'react';
import { Close } from '../icons/Close';

function AuthLinks({ status, userName, setShowMenu, showMenu }) {
  const handleLinkClick = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  return (
    <>
      {status === 'authenticated' && (
        <>
          <Link
            onClick={handleLinkClick}
            href={'/profile'}
            className={showMenu ? 'text-white' : 'text-gray-500'}>
            {userName}
          </Link>
          <button
            onClick={() => {
              signOut({ callbackUrl: '/' });
              setShowMenu(false);
            }}
            className="bg-primary text-white rounded-full px-8 py-2">
            Logout
          </button>
        </>
      )}
      {status === 'unauthenticated' && (
        <>
          <Link
            href="/login"
            onClick={handleLinkClick}
            className={showMenu ? 'text-white' : 'text-gray-500'}>
            Login
          </Link>
          <Link
            onClick={handleLinkClick}
            href="/register"
            className="bg-primary text-white rounded-full px-8 py-2">
            Register
          </Link>
        </>
      )}
    </>
  );
}

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  const { cartProducts } = useContext(CartContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleLinkClick = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  let userName = userData?.name || userData?.email;
  userName = userName?.includes(' ') ? userName.split(' ')[0] : userName;

  return (
    <header>
      <div className="hidden md:flex items-center justify-between py-4">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link href="/" className="text-primary font-semibold text-2xl">
            SF PIZZA
          </Link>
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks
            status={status}
            userName={userName}
            setShowMenu={setShowMenu}
            showMenu={showMenu}
          />
          <Link href="/cart" className="relative">
            <CartIcon />
            {cartProducts?.length !== 0 && (
              <span className="flex items-center justify-center absolute -top-1 -right-3 bg-gray-500 w-5 h-5 rounded-xl text-white text-sm">
                {cartProducts?.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
      <div className="flex md:hidden items-center justify-between py-4">
        <Link href="/" className="text-primary font-semibold text-2xl">
          SF PIZZA
        </Link>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="border border-gray-500 p-1 rounded-lg cursor-pointer">
            {showMenu ? <Close /> : <Burger />}
          </button>
          <Link href="/cart" className="relative">
            <CartIcon />
            {cartProducts?.length !== 0 && (
              <span className="flex items-center justify-center absolute -top-1 -right-3 bg-gray-500 w-5 h-5 rounded-xl text-white text-sm">
                {cartProducts?.length}
              </span>
            )}
          </Link>
          {showMenu && (
            <div className="absolute w-full top-14 left-0 transition-all px-2">
              <div className="p-4 bg-gray-500 flex flex-col gap-5 items-end rounded-lg">
                <div className="flex flex-col items-center justify-center gap-4 w-full">
                  <AuthLinks status={status} userName={userName} showMenu={showMenu} />
                </div>
                <div className="flex flex-col gap-2 items-center justify-center text-white w-full">
                  <Link onClick={handleLinkClick} href="/">
                    Home
                  </Link>
                  <Link onClick={handleLinkClick} href="/menu">
                    Menu
                  </Link>
                  <Link onClick={handleLinkClick} href="/#about">
                    About
                  </Link>
                  <Link onClick={handleLinkClick} href="/#contact">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
