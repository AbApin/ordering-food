'use client';

import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setLoginInProgress(true);
    const res = await signIn('credentials', { email, password });

    setLoginInProgress(false);
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="flex flex-col gap-2 max-w-xs mx-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={loginInProgress}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={loginInProgress}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button type="submit" disabled={loginInProgress}>
          Login
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
    </section>
  );
}
