"use client"
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import path from 'path';
import React from 'react'

import Redirect from '../../components/Redirect';


const Home = () => {
  const sessions = useSession();
  
  const router = useRouter();
  console.log(sessions);
  if(!sessions.data){
    return <Redirect path="/"/>
  }

    
  return (
    <div>Home</div>
  )
}

export default Home