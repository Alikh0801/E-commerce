import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';

function AddToFav() {
    const { wishlistCount } = useWishlist();

    return (
        <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-red-50 text-[#F5F5DC] hover:text-[#792323] transition-all group inline-block">
            <Heart size={24} className="group-active:scale-90 transition-transform" />
            {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#800000] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white min-w-[18px] text-center">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
            )}
        </Link>
    );
}

export default AddToFav;