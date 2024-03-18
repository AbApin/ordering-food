import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from '@/hooks/AppContext';
import { getServerSession } from 'next-auth';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
  title: 'Food Ordering',
  description: 'Food ordering website',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body suppressHydrationWarning={true} className={roboto.className}>
        <main className="max-w-6xl mx-auto px-4">
          <AppProvider session={session}>
            <Toaster />
            <Header />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; 2024 All rights reserved
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
