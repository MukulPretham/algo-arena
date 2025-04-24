import React from 'react'
import NavBar from '../../components/NavBar';

const layout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
  return (
    <div className='w-full h-full'>
         <NavBar/>
        {children}
    </div>
  )
}

export default layout