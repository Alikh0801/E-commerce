import React from 'react'
import { Search } from 'lucide-react';


function SearchBar() {
    return (
        <div className="relative w-full group">
            <input
                type="text"
                placeholder="Məhsul axtar..."
                className="w-full py-2.5 pl-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-orange-500 text-white rounded-lg cursor-pointer hover:bg-orange-600 transition-colors">
                <Search size={18} />
            </div>
        </div>
    );
}

export default SearchBar