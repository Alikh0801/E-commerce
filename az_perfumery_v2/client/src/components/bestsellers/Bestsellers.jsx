import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getBestsellers } from '../../api/product.api';
import ProductCard from '../products/ProductCard';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

function Bestsellers() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const res = await getBestsellers(1, 3);
                const list = res?.data ?? [];
                if (mounted) setProducts(Array.isArray(list) ? list : []);
            } catch (_) {
                if (mounted) setProducts([]);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => { mounted = false; };
    }, []);

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

    if (loading) {
        return (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col items-center justify-center min-h-48 gap-4">
                    <div className="w-10 h-10 border-2 border-[#064e3b]/30 border-t-[#064e3b] rounded-full animate-spin" />
                    <p className="text-gray-600 text-sm">Yüklənir...</p>
                </div>
            </section>
        );
    }

    if (!products.length) return null;

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 py-2 mb-5 text-center">
                Çox satılanlar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                {products.map((product) => (
                    <div key={product._id} className="w-full max-w-55 sm:max-w-65">
                        <ProductCard
                            product={product}
                            onAddToCart={handleAddToCart}
                            onAddToFav={handleAddToFav}
                            isInWishlist={isInWishlist(product._id)}
                        />
                    </div>
                ))}
            </div>
            <div className="mt-10 flex justify-center">
                <Link
                    to="/best-sellers"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#064e3b] bg-[#064e3b] text-white font-semibold text-sm tracking-wide hover:bg-[#053e2f] hover:border-[#053e2f] hover:shadow-lg hover:shadow-[#064e3b]/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b] focus:ring-offset-2"
                >
                    Tam siyahı
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}

export default Bestsellers;
