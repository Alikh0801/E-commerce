import React from 'react'
import SearchBar from './SearchBar';
import Login from './Login';
import Category from './Category';
import AddToFav from './AddToFav';
import AddToCart from './AddToCart';



function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-100">
            <div className="w-full px-12 py-5 flex items-center justify-between gap-8">
                <div className="flex items-center flex-1 gap-6">
                    <a href="/" className="shrink-0">
                        <img src="./images/logo/logo.png" alt="Logo" className="w-18 h-18 object-contain" />
                    </a>
                    <Category />
                    <div className="flex-1 max-w-4xl">
                        <SearchBar />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <AddToFav />
                    <AddToCart />
                    <Login />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;