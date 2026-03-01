import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getBestsellers } from '../api/product.api';
import ProductCard from '../components/products/ProductCard';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const PER_PAGE = 12;

function BestsellersPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                setLoading(true);
                const res = await getBestsellers(page, PER_PAGE);
                const list = res?.data ?? [];
                const pagination = res?.pagination ?? {};
                if (mounted) {
                    setProducts(Array.isArray(list) ? list : []);
                    setTotalPages(pagination.totalPages ?? 1);
                    setTotal(pagination.total ?? 0);
                }
            } catch (_) {
                if (mounted) setProducts([]);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => { mounted = false; };
    }, [page]);

    const handleAddToCart = ({ productId, size }) => {
        if (!user) {
            navigate('/login');
            return;
        }
        const product = products.find((p) => p._id === productId);
        const option = product?.options?.find((o) => o.size === size);
        addToCart({
            productId,
            size,
            quantity: 1,
            title: product?.title,
            image: product?.image,
            price: option?.price ?? 0,
            oldPrice: option?.oldPrice,
        });
    };

    const handleAddToFav = ({ productId }) => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (isInWishlist(productId)) removeFromWishlist(productId);
        else addToWishlist(productId);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Çox satılanlar
            </h1>

            {loading && (
                <div className="flex flex-col items-center justify-center min-h-48 gap-4 py-12">
                    <div className="w-10 h-10 border-2 border-[#064e3b]/30 border-t-[#064e3b] rounded-full animate-spin" />
                    <p className="text-gray-600 text-sm">Yüklənir...</p>
                </div>
            )}

            {!loading && products.length === 0 && (
                <p className="text-gray-500 py-12">Çox satılan məhsul tapılmadı.</p>
            )}

            {!loading && products.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onAddToCart={handleAddToCart}
                                onAddToFav={handleAddToFav}
                                isInWishlist={isInWishlist(product._id)}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-10">
                            <button
                                type="button"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page <= 1}
                                className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={18} /> Əvvəlki
                            </button>
                            <span className="px-4 py-2 text-sm font-medium text-gray-700">
                                {page} / {totalPages}
                            </span>
                            <button
                                type="button"
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages}
                                className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Növbəti <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default BestsellersPage;
