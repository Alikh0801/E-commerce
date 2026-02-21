import React from 'react';
import { Logs, ChevronDown } from 'lucide-react';

function Category() {
    return (
        <div className="relative group inline-block">
            {/* Menyu title */}
            <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-[#064e3b] text-[#F5F5DC] rounded-md hover:bg-[#053e2f] transition-all">
                <Logs size={18} className="sm:w-5 sm:h-5" />
                <span>Kataloq</span>
                <ChevronDown size={14} className="sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform" />
            </button>

            {/* Dropdown Menyu */}
            <div className="absolute left-0 top-full pt-2 w-48 sm:w-56 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <ul className="bg-white border border-gray-200 shadow-xl rounded-lg py-2">
                    <li>
                        <a href="/kisi-geyim" className="block px-4 py-2 hover:bg-orange-50 hover:text-[#922c00] transition-colors">
                            Kişi Ətirləri
                        </a>
                    </li>
                    <li>
                        <a href="/qadin-geyim" className="block px-4 py-2 hover:bg-orange-50 hover:text-[#922c00] transition-colors">
                            Qadın Ətirləri
                        </a>
                    </li>
                    <li>
                        <a href="/kisi-ayaqqabi" className="block px-4 py-2 hover:bg-orange-50 hover:text-[#922c00] transition-colors">
                            Unisex Ətirlər
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Category;