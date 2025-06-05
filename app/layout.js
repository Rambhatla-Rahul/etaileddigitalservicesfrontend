'use client'
import './globals.css'
import { UserProvider } from './context/UserContext';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className='h-full w-full'>
        <UserProvider>{children}</UserProvider>
        
      </body>
    </html>
  )
}
