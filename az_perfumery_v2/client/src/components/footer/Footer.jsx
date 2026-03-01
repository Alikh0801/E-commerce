import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Instagram } from 'lucide-react';

const SOCIAL_LINKS = {
    whatsapp: 'https://wa.me/994702137797',
    instagram: 'https://instagram.com/az_perfumery',
    tiktok: 'https://tiktok.com/@az_perfumery',
};

function TikTokIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    );
}

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-block">
                            <span className="text-xl font-bold text-white tracking-tight">
                                A&Z Perfumery
                            </span>
                        </Link>
                        <p className="mt-3 text-sm leading-relaxed text-gray-400 max-w-xs">
                            Orijinal ətirlər, etibarlı xidmət. Sizin üçün ən yaxşı seçimlər.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href={SOCIAL_LINKS.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-[#25D366] text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle className="w-5 h-5" />
                            </a>
                            <a
                                href={SOCIAL_LINKS.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-[#E4405F] text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href={SOCIAL_LINKS.tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-white hover:text-gray-900 text-gray-400 flex items-center justify-center transition-all duration-200"
                                aria-label="TikTok"
                            >
                                <TikTokIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                            Sürətli keçidlər
                        </h3>
                        <ul className="mt-4 space-y-3">
                            <li>
                                <Link to="/" className="text-sm hover:text-white transition-colors">
                                    Ana səhifə
                                </Link>
                            </li>
                            <li>
                                <Link to="/men-perfume" className="text-sm hover:text-white transition-colors">
                                    Kişi ətirləri
                                </Link>
                            </li>
                            <li>
                                <Link to="/women-perfume" className="text-sm hover:text-white transition-colors">
                                    Qadın ətirləri
                                </Link>
                            </li>
                            <li>
                                <Link to="/cox-satilanlar" className="text-sm hover:text-white transition-colors">
                                    Çox satılanlar
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                            Əlaqə
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-gray-400">
                            <li>
                                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    WhatsApp
                                </a>
                            </li>
                            <li>
                                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    TikTok
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Extra */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                            Kömək
                        </h3>
                        <ul className="mt-4 space-y-3">
                            <li>
                                <Link to="/cart" className="text-sm hover:text-white transition-colors">
                                    Səbət
                                </Link>
                            </li>
                            <li>
                                <Link to="/wishlist" className="text-sm hover:text-white transition-colors">
                                    Sevimlilər
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} A&Z Perfumery. Bütün hüquqlar qorunur.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-gray-500">
                        <span>Azərbaycan</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
