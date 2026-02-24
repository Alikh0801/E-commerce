import React, { useEffect, useState } from 'react';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getAllProduct } from '../api/product.api';

function WishlistPage() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const { wishlistIds, wishlistCount, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [selectedSizes, setSelectedSizes] = useState({});

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                setProductsLoading(true);
                const res = await getAllProduct();
                const list = res?.data ?? res ?? [];
                if (mounted) setProducts(Array.isArray(list) ? list : []);
            } catch (_) {
                if (mounted) setProducts([]);
            } finally {
                if (mounted) setProductsLoading(false);
            }
        }
        if (user && wishlistIds.length > 0) load();
        else if (mounted) setProductsLoading(false);
        return () => { mounted = false; };
    }, [user, wishlistIds.length]);

    if (loading && !user) {
        return null;
    }

    if (!user) return null;

    const wishlistProducts = products.filter((p) => wishlistIds.includes(p._id));

    const getSizeForProduct = (product) => {
        const options = product?.options ?? [];
        const defaultSize = options[0]?.size ?? '50ml';
        return selectedSizes[product._id] ?? defaultSize;
    };

    const getOptionForProduct = (product) => {
        const size = getSizeForProduct(product);
        const options = product?.options ?? [];
        return options.find((o) => o.size === size) || options[0];
    };

    const handleSizeChange = (productId, size) => {
        setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
    };

    const handleAddToCart = (product) => {
        const option = getOptionForProduct(product);
        const size = option?.size ?? getSizeForProduct(product);
        addToCart({
            productId: product._id,
            size,
            quantity: 1,
            title: product?.title,
            image: product?.image,
            price: option?.price ?? 0,
            oldPrice: option?.oldPrice,
        });
    };

    if (wishlistCount === 0) {
        return (
            <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex flex-col items-center justify-center px-4 py-12">
                <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-6">
                    <Heart size={48} className="text-red-300" strokeWidth={1.5} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
                    Sevimlilər siyahısı boşdur
                </h1>
                <p className="text-gray-500 text-center max-w-sm mb-8">
                    Bəyəndiyiniz məhsulları ürək ikonuna klikləməklə bura əlavə edə bilərsiniz.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#064e3b] text-white font-semibold rounded-xl hover:bg-[#053e2f] transition shadow-lg shadow-[#064e3b]/20"
                >
                    <ArrowLeft size={20} /> Məhsullara bax
                </Link>
            </div>
        );
    }

    if (productsLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Yüklənir...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Sevimlilərim
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'məhsul' : 'məhsul'}
                        </p>
                    </div>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-[#064e3b] font-semibold hover:underline"
                    >
                        <ArrowLeft size={18} /> Alış-verişə davam et
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {wishlistProducts.map((product) => {
                        const options = product?.options ?? [];
                        const option = getOptionForProduct(product);
                        const size = getSizeForProduct(product);
                        const price = option?.price ?? 0;
                        const oldPrice = option?.oldPrice;
                        const hasDiscount = oldPrice != null && oldPrice > price;
                        const discountPercent = hasDiscount
                            ? Math.round((1 - price / oldPrice) * 100)
                            : 0;

                        return (
                            <article
                                key={product._id}
                                className="bg-[#f3f3e7] rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col group"
                            >
                                <div className="relative aspect-3/4 bg-gray-50 overflow-hidden">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <Heart size={48} strokeWidth={1} />
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeFromWishlist(product._id)}
                                        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 hover:bg-red-50 flex items-center justify-center text-red-500 shadow-md transition"
                                        aria-label="Sevimlilərdən çıxar"
                                    >
                                        <Heart size={20} className="fill-current" />
                                    </button>
                                </div>
                                <div className="p-4 flex-1 flex flex-col gap-3">
                                    <h2 className="font-semibold text-gray-900 line-clamp-2 min-h-10">
                                        {product.title}
                                    </h2>
                                    {options.length > 0 && (
                                        <select
                                            value={size}
                                            onChange={(e) => handleSizeChange(product._id, e.target.value)}
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#064e3b]/30"
                                        >
                                            {options.map((opt) => (
                                                <option key={opt.size} value={opt.size}>
                                                    {opt.size}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                    <div className="flex flex-wrap items-center gap-2">
                                        {hasDiscount && (
                                            <>
                                                <span className="text-sm text-gray-400 line-through">{oldPrice} ₼</span>
                                                <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                                                    -{discountPercent}%
                                                </span>
                                            </>
                                        )}
                                        <p className="text-lg font-bold text-[#064e3b]">
                                            {price} ₼
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleAddToCart(product)}
                                        className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-[#064e3b] text-white font-semibold rounded-xl hover:bg-[#053e2f] transition"
                                    >
                                        <ShoppingBag size={18} /> Səbətə at
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default WishlistPage;
