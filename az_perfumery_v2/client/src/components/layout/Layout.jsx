import { Outlet } from 'react-router-dom';
import React from 'react'
import Navbar from '../navbar';

function Layout() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <Outlet />
            </main>
        </>
    )
}

export default Layout