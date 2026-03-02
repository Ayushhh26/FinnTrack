"use client"
import './globals.css';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import dynamic from 'next/dynamic';
import FinanceContextProvider from '@/lib/store/finance-context';
import AuthContextProvider from '@/lib/store/auth-context';

const Navigation = dynamic(() => import('@/components/Navigation'), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer />
            <Navigation />
            {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
