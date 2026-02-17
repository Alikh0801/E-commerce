import React from 'react'
import SearchBar from './SearchBar';
import Category from './Category';
import AddToFav from './AddToFav';
import AddToCart from './AddToCart';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';



function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-[linear-gradient(90deg,#000033_0%,#000066_100%)] border-b border-gray-100 sticky top-0 z-100">
            <div className="w-full px-12 py-5 flex items-center justify-between gap-8">
                <div className="flex items-center flex-1 gap-6">
                    <a href="/" className="shrink-0 text-[#F5F5DC]">
                        <h1>A&Z Perfumery</h1>
                    </a>
                    <Category />
                    <div className="flex-1 max-w-4xl">
                        <SearchBar />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <AddToFav />
                    <AddToCart />

                    {/* login olubsa bu UI gorunsun */}
                    {user ? (
                        <div className="relative group flex items-center gap-3 pl-4 border-l border-gray-100">
                            {/* user info (hidden the small screen) */}
                            <div className="hidden md:flex flex-col text-right">
                                <span className="text-[13px] font-bold text-[#F5F5DC] leading-tight">
                                    {user.fullName}
                                </span>
                                <span className="text-[11px] text-gray-400 font-medium">
                                    Xoş gəldiniz
                                </span>
                            </div>

                            {/* Avatar / Profil sekli konteyneri */}
                            <div className="relative cursor-pointer group">
                                <div className="w-11 h-11 bg-linear-to-tr from-[#800000] to-amber-400 p-0.5 rounded-full transition-transform duration-300 group-hover:scale-110 shadow-lg">
                                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-white overflow-hidden">
                                        <span className="text-[#800000] font-black text-lg">
                                            {user.fullName[0].toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                {/* Online */}
                                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-50 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                        <p className="text-[12px] text-gray-400">Hesab</p>
                                        <p className="text-sm font-semibold text-gray-800 truncate">{user.email}</p>
                                    </div>

                                    <Link
                                        to="/profil-page"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        Profilim
                                    </Link>
                                    <a href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                                        Ayarlar
                                    </a>

                                    <div className="mt-1 border-t border-gray-50 pt-1">
                                        <button
                                            onClick={logout}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-medium transition-colors cursor-pointer text-left"
                                        >
                                            Çıxış et
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* login button*/
                        <Link
                            to="/login"
                            className="relative inline-flex items-center justify-center px-7 py-2.5 overflow-hidden font-medium text-white transition duration-300 ease-out bg-[#064e3b] rounded-full shadow-md group"
                        >
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-600 group-hover:translate-x-0 ease">
                                <User size={18} />
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">Giriş</span>
                            <span className="relative invisible">Giriş</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;