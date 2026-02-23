import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar';
import Category from './Category';
import AddToFav from './AddToFav';
import AddToCart from './AddToCart';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { User, Menu, X, Heart, ShoppingCart } from 'lucide-react';

function Navbar() {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (mobileMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    return (
        <nav className="bg-[linear-gradient(90deg,#000033_0%,#000066_100%)] border-b border-gray-100 sticky top-0 z-100">
            <div className="relative z-101 w-full px-4 sm:px-6 lg:px-12 py-3 sm:py-4 lg:py-5 flex items-center justify-between gap-4">
                <a href="/" className="shrink-0 text-[#F5F5DC]">
                    <h1 className="text-base sm:text-lg font-semibold">A&Z Perfumery</h1>
                </a>

                <div className="hidden lg:flex items-center flex-1 gap-6 mx-6">
                    <Category />
                    <div className="flex-1 max-w-4xl">
                        <SearchBar />
                    </div>
                </div>

                {/* Right: icons + user (Fav & Cart hidden on mobile - only in hamburger) */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="hidden lg:block">
                        <AddToFav />
                    </div>
                    <div className="hidden lg:block">
                        <AddToCart />
                    </div>

                    {user ? (
                        <div className="relative group flex items-center gap-3 pl-2 sm:pl-4 border-l border-gray-100/50">
                            <div className="hidden md:flex flex-col text-right">
                                <span className="text-[13px] font-bold text-[#F5F5DC] leading-tight">
                                    {user.fullName}
                                </span>
                                <span className="text-[11px] text-gray-400 font-medium">
                                    Xoş gəldiniz
                                </span>
                            </div>

                            <div className="relative cursor-pointer group">
                                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-linear-to-tr from-[#800000] to-amber-400 p-0.5 rounded-full transition-transform duration-300 group-hover:scale-110 shadow-lg">
                                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-white overflow-hidden">
                                        <span className="text-[#800000] font-black text-sm sm:text-lg">
                                            {user.fullName[0].toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 border-2 border-white rounded-full"></span>

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
                                    <Link
                                        to='/settings'
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        Ayarlar
                                    </Link>
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

                    {/* Hamburger - mobile only */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg text-[#F5F5DC] hover:bg-white/10 transition-colors"
                        aria-label="Menyu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu overlay */}
            <div
                className={`lg:hidden fixed inset-0 top-0 z-99 transition-all duration-300 ease-out ${mobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
                    }`}
            >
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
                <div
                    className={`absolute top-0 right-0 h-full w-full max-w-sm bg-[linear-gradient(180deg,#000033_0%,#000066_100%)] shadow-2xl transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex flex-col h-full pt-20 px-6 pb-8">
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Kataloq</p>
                                <Category onLinkClick={() => setMobileMenuOpen(false)} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Axtarış</p>
                                <SearchBar />
                            </div>
                        </div>
                        <div className="mt-auto pt-8 border-t border-white/10 space-y-1">
                            <Link
                                to="/wishlist"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-3 py-3 px-3 rounded-lg text-[#F5F5DC] hover:bg-white/10 hover:text-white transition-colors"
                            >
                                <Heart size={22} />
                                <span>Sevimlilər</span>
                            </Link>
                            <Link
                                to="/cart"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-3 py-3 px-3 rounded-lg text-[#F5F5DC] hover:bg-white/10 hover:text-white transition-colors"
                            >
                                <ShoppingCart size={22} />
                                <span>Səbət</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;