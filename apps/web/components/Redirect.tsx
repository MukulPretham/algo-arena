"use client"
import { useSession } from 'next-auth/react'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Redirect = ({ path }: {
    path: string
}) => {
    const router = useRouter();
    const session = useSession();
    useEffect(() => {
        if (session.status !== 'loading' && !session.data) {
            router.push(path);
        }
    }, [session]);

    return (
        <div></div>
    )
}

export default Redirect