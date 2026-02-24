import React, { useEffect, useState } from 'react';
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getAllProduct } from '../api/product.api';

function CartPage() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const res = await getAllProduct();
                const list = res?.data ?? res ?? [];
                if (mounted) setProducts(Array.isArray(list) ? list : []);
            } catch (_) {
                if (mounted) setProducts([]);
            }
        }
        if (user) load();
        return () => { mounted = false; };
    }, [user]);

    if (loading && !user) {
        return null;
    }

    if (!user) return null;

    const getDisplayData = (item) => {
        const product = products.find((p) => p._id === item.productId);
        const option = product?.options?.find((o) => o.size === item.size);
        return {
            title: product?.title ?? item.title,
            image: product?.image ?? item.image,
            price: option?.price ?? item.price,
            oldPrice: option?.oldPrice ?? item.oldPrice,
        };
    };

    const total = cartItems.reduce((sum, item) => {
        const { price } = getDisplayData(item);
        return sum + price * item.quantity;
    }, 0);

    if (cartCount === 0) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center text-center">
                <ShoppingCart size={56} className="text-gray-300 mb-4 shrink-0" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Səbətiniz boşdur</h2>
                <p className="text-gray-500 mt-2 text-sm sm:text-base max-w-sm">Görünür hələ heç bir məhsul əlavə etməmisiniz.</p>
                <Link to="/" className="mt-6 flex items-center justify-center gap-2 text-orange-600 font-semibold hover:underline text-sm sm:text-base">
                    <ArrowLeft size={20} /> Alış-verişə davam et
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Səbət ({cartCount} məhsul)</h1>
            <ul className="space-y-4">
                {cartItems.map((item) => {
                    const display = getDisplayData(item);
                    const hasDiscount = display.oldPrice != null && display.oldPrice > display.price;
                    return (
                    <li
                        key={`${item.productId}-${item.size}`}
                        className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 items-center shadow-sm"
                    >
                        <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            {display.image ? (
                                <img src={display.image} alt={display.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Şəkil</div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{display.title}</p>
                            <p className="text-sm text-gray-500">
                                {item.size}
                                {hasDiscount ? (
                                    <span className="flex items-center gap-2 mt-0.5">
                                        <span className="text-gray-400 line-through">{display.oldPrice} ₼</span>
                                        <span className="font-bold text-[#064e3b]">{display.price} ₼</span>
                                        <span className="text-xs font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                                            -{Math.round((1 - display.price / display.oldPrice) * 100)}%
                                        </span>
                                    </span>
                                ) : (
                                    <> · {display.price} ₼</>
                                )}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <button
                                    type="button"
                                    onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                                    className="w-8 h-8 rounded border border-gray-200 text-gray-600 hover:bg-gray-50"
                                >
                                    −
                                </button>
                                <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                <button
                                    type="button"
                                    onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                                    className="w-8 h-8 rounded border border-gray-200 text-gray-600 hover:bg-gray-50"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <p className="font-bold text-gray-900 shrink-0">{display.price * item.quantity} ₼</p>
                        <button
                            type="button"
                            onClick={() => removeFromCart(item.productId, item.size)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            aria-label="Səbətdən sil"
                        >
                            <Trash2 size={20} />
                        </button>
                    </li>
                    );
                })}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
                <p className="text-lg font-bold text-gray-900">Cəmi: {total.toFixed(2)} ₼</p>
                <Link to="/" className="flex items-center gap-2 text-[#064e3b] font-semibold hover:underline">
                    <ArrowLeft size={20} /> Alış-verişə davam et
                </Link>
            </div>
        </div>
    );
}

export default CartPage;
