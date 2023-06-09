"use client"
import './globals.css';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Navigation from "@/components/Navigation";

import FinanceContextProvider from '@/lib/store/finance-context';
import AuthContextProvider from '@/lib/store/auth-context';


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
