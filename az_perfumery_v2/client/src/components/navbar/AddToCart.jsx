import React from 'react'
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';


function AddToCart() {
    return (
        <Link to="/cart" className="relative p-2 rounded-full hover:bg-orange-50 text-[#F5F5DC] hover:text-[#792323] transition-all group inline-block">
            <ShoppingCart size={24} className="group-active:scale-90 transition-transform" />
            <span className="absolute top-0 right-0 bg-[#800000] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                0
            </span>
        </Link>
    );
}

export default AddToCart;