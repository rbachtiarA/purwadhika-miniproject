import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {Navbar} from '@/components/navbar';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative ${inter.className} dark:bg-white flex flex-col min-h-screen`}>
          <Navbar />
          <main className='pt-[112px] flex-1'>
            {children}
          </main>
          <Footer />
          <ToastContainer 
            position="bottom-right"
            autoClose={5000}
            closeOnClick
            draggable
          />
      </body>
    </html>
  );
}
