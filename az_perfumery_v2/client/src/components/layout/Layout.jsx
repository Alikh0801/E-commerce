import { Outlet } from 'react-router-dom';
import React from 'react';
import Navbar from '../navbar';
import Footer from '../footer/Footer';

function Layout() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Layout