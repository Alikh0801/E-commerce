import React from 'react'
import { Search } from 'lucide-react';


function SearchBar() {
    return (
        <div className="relative w-full group">
            <input
                type="text"
                placeholder="Məhsul axtar..."
                className="w-full py-2 sm:py-2.5 pl-3 sm:pl-4 pr-10 sm:pr-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#053e2f] focus:ring-2 sm:focus:ring-4 focus:ring-[#053e2f] outline-none transition-all placeholder:text-gray-400"
            />
            <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1 sm:p-1.5 text-[#030436] rounded-lg">
                <Search size={18} className="shrink-0" />
            </div>
        </div>
    );
}

export default SearchBar