import React from 'react'
import { Search } from 'lucide-react';


function SearchBar() {
    return (
        <div className="relative w-full group">
            <input
                type="text"
                placeholder="Məhsul axtar..."
                className="w-full py-2.5 pl-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#053e2f] focus:ring-4 focus:ring-[#053e2f] outline-none transition-all placeholder:text-gray-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-[#064e3b] text-white rounded-lg cursor-pointer hover:bg-[#053e2f] transition-colors">
                <Search size={18} />
            </div>
        </div>
    );
}

export default SearchBar