import React from 'react'
import { ShoppingCart } from 'lucide-react';


function AddToCart() {
    return (
        <button className="relative p-2 rounded-full hover:bg-orange-50 text-gray-600 hover:text-orange-500 transition-all group">
            <ShoppingCart size={24} className="group-active:scale-90 transition-transform" />
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                0
            </span>
        </button>
    );
}

export default AddToCart;