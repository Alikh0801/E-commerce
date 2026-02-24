import React, { useState, useMemo, useEffect } from 'react';
import { Heart, Star, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';

function ProductCard({ product, onAddToCart, onAddToFav, isInWishlist = false }) {
    const options = product?.options || [];
    const defaultSize = options[0]?.size ?? '50ml';
    const productId = product?._id;

    const [selectedSize, setSelectedSize] = useState(defaultSize);
    const [showDesc, setShowDesc] = useState(false);

    useEffect(() => {
        setSelectedSize(defaultSize);
        setShowDesc(false);
    }, [productId, defaultSize]);

    const selectedOption = useMemo(() => {
        return options.find((o) => o.size === selectedSize) || options[0];
    }, [options, selectedSize]);

    const hasDiscount = selectedOption?.oldPrice != null && selectedOption.oldPrice > (selectedOption?.price ?? 0);
    const discountPercent = hasDiscount
        ? Math.round((1 - selectedOption.price / selectedOption.oldPrice) * 100)
        : 0;

    const price = selectedOption?.price ?? 0;
    const oldPrice = selectedOption?.oldPrice;

    return (
        <div className="bg-[#f3f3e7] rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col min-h-0 w-full">
            <div className="relative w-full aspect-3/4 shrink-0 overflow-hidden bg-gray-50">
                {product?.image ? (
                    <img
                        src={product.image}
                        alt={product.title}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                        Şəkil yoxdur
                    </div>
                )}
            </div>

            <div className="p-4 flex-1 flex flex-col gap-3 min-h-0">
                <div className="flex items-start justify-between gap-2 min-h-10">
                    <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2 flex-1 min-w-0">
                        {product?.title}
                    </h3>
                    <span className="flex items-center gap-1 text-sm font-semibold text-amber-600 shrink-0">
                        <Star size={14} className="fill-amber-500 text-amber-500" />
                        {Number(product?.rating ?? 0).toFixed(1)}
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#064e3b]/30 flex-1 min-w-0"
                    >
                        {options.map((opt) => (
                            <option key={opt.size} value={opt.size}>
                                {opt.size}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center gap-2 flex-wrap">
                        {oldPrice != null && hasDiscount && (
                            <span className="text-sm text-gray-400 line-through">{oldPrice} ₼</span>
                        )}
                        <span className="text-sm font-bold text-gray-900 whitespace-nowrap">{price} ₼</span>
                        {discountPercent > 0 && (
                            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                                -{discountPercent}%
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => onAddToCart?.({ productId: product?._id, size: selectedSize })}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#064e3b] text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-[#053e2f] transition"
                    >
                        <ShoppingCart size={18} /> Səbətə at
                    </button>
                    <button
                        type="button"
                        onClick={() => onAddToFav?.({ productId: product?._id })}
                        className={`w-11 h-11 grid place-items-center rounded-lg border transition ${isInWishlist ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 hover:bg-gray-50'}`}
                        aria-label={isInWishlist ? 'Sevimlilərdən çıxar' : 'Sevimlilərə əlavə et'}
                    >
                        <Heart size={20} className={isInWishlist ? 'fill-current' : ''} />
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => setShowDesc((s) => !s)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-[#064e3b] hover:text-[#053e2f] text-left"
                >
                    {showDesc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    {showDesc ? 'Təsviri gizlət' : 'Təsviri göstər'}
                </button>

                {showDesc && product?.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                )}
            </div>
        </div>
    );
}

export default ProductCard;