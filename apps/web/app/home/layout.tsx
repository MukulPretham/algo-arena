"use client"
import React from 'react'
import NavBar from '../../components/NavBar';
import { SessionProvider, useSession } from 'next-auth/react';

const layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (
    <div className='w-full h-full'>
      <SessionProvider>
        <NavBar />
        {children}
      </SessionProvider>

    </div>
  )
}

export default layout