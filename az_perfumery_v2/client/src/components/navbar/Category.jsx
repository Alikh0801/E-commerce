import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logs, ChevronDown } from 'lucide-react';

function Category() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative group inline-block">
            {/* Menyu title */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-[#064e3b] text-[#F5F5DC] rounded-md hover:bg-[#053e2f] transition-all">
                <Logs size={18} className="sm:w-5 sm:h-5" />
                <span>Kataloq</span>
                <ChevronDown size={14} className="sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform" />
            </button>

            {/* Dropdown Menyu */}
            <div className={`absolute left-0 top-full pt-2 w-48 sm:w-56 min-w-48 transition-all z-50 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} group-hover:opacity-100 group-hover:visible`}>
                <ul className="bg-white border border-gray-200 shadow-xl rounded-lg py-2">
                    <li>
                        <Link to="/kisi-geyim" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-orange-50 hover:text-[#922c00] transition-colors">
                            Kişi Ətirləri
                        </Link>
                    </li>
                    <li>
                        <Link to="/qadin-geyim" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-orange-50 hover:text-[#922c00] transition-colors">
                            Qadın Ətirləri
                        </Link>
                    </li>
                    <li>
                        <Link to="/kisi-ayaqqabi" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-orange-50 hover:text-[#922c00] transition-colors">
                            Unisex Ətirlər
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Category;