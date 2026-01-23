import React from 'react'
import { Heart } from 'lucide-react';


function AddToFav() {
    return (
        <button className="relative p-2 rounded-full hover:bg-red-50 text-gray-600 hover:text-red-500 transition-all group">
            <Heart size={24} className="group-active:scale-90 transition-transform" />
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                0
            </span>
        </button>
    );
}

export default AddToFav;