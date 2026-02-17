import React from 'react'
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';


function CartPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
            <ShoppingCart size={64} className="text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Səbətiniz boşdur</h2>
            <p className="text-gray-500 mt-2">Görünür hələ heç bir məhsul əlavə etməmisiniz.</p>
            <Link to="/" className="mt-6 flex items-center gap-2 text-orange-600 font-semibold hover:underline">
                <ArrowLeft size={20} /> Alış-verişə davam et
            </Link>
        </div>
    )
}

export default CartPage;