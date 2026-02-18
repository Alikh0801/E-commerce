import React, { useEffect } from 'react'
import { Heart, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function WishlistPage() {

    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login')
        }
    }, [user, loading, navigate]);

    if (loading && !user) {
        return null
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
            <Heart size={64} className="text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Sevimlilər siyahısı boşdur</h2>
            <p className="text-gray-500 mt-2">Bəyəndiyiniz məhsulları bura əlavə edə bilərsiniz.</p>
            <Link to="/" className="mt-6 flex items-center gap-2 text-red-700 font-semibold hover:underline">
                <ArrowLeft size={20} /> Məhsullara bax
            </Link>
        </div>
    )
}

export default WishlistPage