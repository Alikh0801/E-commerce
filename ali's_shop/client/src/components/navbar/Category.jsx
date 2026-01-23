import React from 'react';
import { Logs, ChevronDown } from 'lucide-react';

function Category() {
    return (
        <div className="relative group inline-block">
            {/* Menyu title */}
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 transition-all">
                <Logs size={20} />
                <span>Kataloq</span>
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
            </button>

            {/* Dropdown Menyu */}
            <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <ul className="bg-white border border-gray-200 shadow-xl rounded-lg py-2">
                    <li>
                        <a href="/kisi-geyim" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                            Kişi Geyimi
                        </a>
                    </li>
                    <li>
                        <a href="/qadin-geyim" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                            Qadın Geyimi
                        </a>
                    </li>
                    <li>
                        <a href="/kisi-ayaqqabi" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                            Kişi Ayaqqabıları
                        </a>
                    </li>
                    <li>
                        <a href="/qadin-ayaqqabi" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                            Qadın Ayaqqabıları
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Category;