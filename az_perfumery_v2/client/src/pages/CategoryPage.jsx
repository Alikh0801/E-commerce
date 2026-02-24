import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProduct } from '../api/product.api';
import ProductCard from '../components/products/ProductCard';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function CategoryPage({ category, title }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                setLoading(true);
                setError('');
                const res = await getAllProduct();
                const list = res?.data ?? res ?? [];
                const all = Array.isArray(list) ? list : [];
                const filtered = category ? all.filter((p) => p?.category === category) : all;
                if (mounted) setProducts(filtered);
            } catch (e) {
                if (mounted) setError(e?.message || 'Məhsullar yüklənmədi');
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => { mounted = false; };
    }, [category]);

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
            <div className="flex items-end justify-between gap-4 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {title || 'Kataloq'}
                </h1>
            </div>

            {loading && <p className="text-gray-500">Yüklənir...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && (
                products.length === 0 ? (
                    <p className="text-gray-500">Bu kateqoriyada məhsul tapılmadı.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
                        {products.map((p, index) => (
                            <ProductCard
                                key={p._id ?? `product-${index}`}
                                product={p}
                                onAddToCart={handleAddToCart}
                                onAddToFav={handleAddToFav}
                                isInWishlist={isInWishlist(p._id)}
                            />
                        ))}
                    </div>
                )
            )}
        </div>
    );
}

export default CategoryPage;
