'use client'

import React, { useEffect } from 'react'
// import { usePathname } from 'next/navigation';
import StoreProvider, { useAppSelector } from '@/app/redux';

const LeetCollabLayout = ({children} : {children: React.ReactNode}) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.add('light');
        }
    }, [isDarkMode]);

    return (
        <div
            className={`${
                isDarkMode ? "dark" : "light"
            } flex flex-col bg-gray-50 text-gray-900 w-full min-h-screen`}
        >
            {children}
        </div>
    )
}

const LeetCollabWrapper = ({children} : {children: React.ReactNode}) => {
    return (
        <StoreProvider>
            <LeetCollabLayout>
                {children}
            </LeetCollabLayout>
        </StoreProvider>
    )
}
export default LeetCollabWrapper