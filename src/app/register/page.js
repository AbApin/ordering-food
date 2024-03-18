'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setCreatingUser(true);
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setUserCreated(true);
      setError(false);
    } else {
      setUserCreated(false);
      setError(true);
    }

    setCreatingUser(false);
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated && (
        <p className="my-4 text-center">
          User created. <br /> Now you can{' '}
          <Link href="/login" className="underline">
            login
          </Link>
        </p>
      )}
      {error && (
        <p className="my-4 text-center">
          An error has occurred. <br /> Please try again later
        </p>
      )}
      <form className="flex flex-col gap-2 max-w-xs mx-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={creatingUser}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={creatingUser}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <p className="my-2 text-center text-gray-500">or login with provider</p>
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex items-center justify-center
         gap-4">
          <Image src="/google.png" width={24} height={24} alt="" />
          Login with google
        </button>
      </form>
      <p className="text-center mt-5 text-gray-500">
        Existing account?{' '}
        <Link href={'/login'} className="underline">
          Login here
        </Link>
      </p>
    </section>
  );
}
