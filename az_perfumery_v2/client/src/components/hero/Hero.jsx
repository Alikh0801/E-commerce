import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getAllProduct } from '../../api/product.api';

function hasDiscount(product) {
    const options = product?.options || [];
    return options.some(opt => opt?.oldPrice != null && opt.oldPrice > (opt?.price ?? 0));
}

function Hero() {
    const [discountProducts, setDiscountProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const res = await getAllProduct();
                const list = res?.data ?? res ?? [];
                const discount = Array.isArray(list) ? list.filter(hasDiscount) : [];
                if (mounted) setDiscountProducts(discount);
            } catch (_) {
                if (mounted) setDiscountProducts([]);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => { mounted = false; };
    }, []);

    if (loading) {
        return (
            <section className="bg-[linear-gradient(180deg,#000033_0%,#000066_100%)] py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <p className="text-[#F5F5DC] text-center">Yüklənir...</p>
                </div>
            </section>
        );
    }

    if (!discountProducts.length) {
        return (
            <section className="bg-[linear-gradient(180deg,#000033_0%,#000066_100%)] py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-xl font-bold text-[#F5F5DC] mb-4">Endirimdə olan məhsullar</h2>
                    <p className="text-gray-400">Hal-hazırda endirimdə məhsul yoxdur.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[linear-gradient(180deg,#000033_0%,#000066_100%)] py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5DC] mb-6">
                    Endirimdə olan məhsullar
                </h2>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={16}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 }
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    className="pb-12!"
                >
                    {discountProducts.map((product) => {
                        const options = product?.options || [];
                        const withDiscount = options.find(o => o?.oldPrice != null && o.oldPrice > (o?.price ?? 0));
                        const price = withDiscount?.price ?? options[0]?.price;
                        const oldPrice = withDiscount?.oldPrice;
                        const percent = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;
                        return (
                            <SwiperSlide key={product._id}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden h-full flex flex-col min-h-0">
                                    <div className="relative w-full aspect-3/4 shrink-0 overflow-hidden bg-gray-100">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="absolute inset-0 w-full h-full object-cover object-center"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">Şəkil yoxdur</div>
                                        )}
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col min-h-0">
                                        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 min-h-10">
                                            {product.title}
                                        </h3>
                                        <div className="mt-auto flex items-center gap-2 flex-wrap">
                                            {oldPrice != null && (
                                                <span className="text-sm text-gray-400 line-through">{oldPrice} ₼</span>
                                            )}
                                            <span className="font-bold text-[#064e3b]">{price} ₼</span>
                                            {percent > 0 && (
                                                <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                                                    -{percent}%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}

export default Hero;
