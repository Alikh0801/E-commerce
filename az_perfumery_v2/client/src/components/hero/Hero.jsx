import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getAllProduct } from '../../api/product.api';
import ProductCard from '../products/ProductCard';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

function hasDiscount(product) {
    const options = product?.options || [];
    return options.some(opt => opt?.oldPrice != null && opt.oldPrice > (opt?.price ?? 0));
}

function Hero() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
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

    const handleAddToCart = ({ productId, size }) => {
        if (!user) {
            navigate('/login');
            return;
        }
        const product = discountProducts.find((p) => p._id === productId);
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
            <section className="relative overflow-hidden bg-[linear-gradient(165deg,#0a0a2e_0%,#16213e_50%,#0f3460_100%)] py-12 sm:py-16 lg:py-20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)] pointer-events-none" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center min-h-70 sm:min-h-80 gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <p className="text-white/90 text-sm sm:text-base font-medium">Yüklənir...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (!discountProducts.length) {
        return (
            <section className="relative overflow-hidden bg-[linear-gradient(165deg,#0a0a2e_0%,#16213e_50%,#0f3460_100%)] py-12 sm:py-16 lg:py-20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)] pointer-events-none" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center min-h-70 sm:min-h-80 text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-4 sm:mb-6">
                            <span className="text-3xl sm:text-4xl">🏷️</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2">
                            Endirimdə məhsul yoxdur
                        </h2>
                        <p className="text-white/70 text-sm sm:text-base max-w-sm">
                            Tezliklə yeni endirimlər əlavə olunacaq. Digər məhsullara baxın.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative overflow-hidden bg-[linear-gradient(165deg,#0a0a2e_0%,#16213e_50%,#0f3460_100%)] py-8 sm:py-12 lg:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.12),transparent)] pointer-events-none" />
            <div className="relative max-w-352 mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
                <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
                            Endirimlər
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                            Endirimdə olan məhsullar
                        </h2>
                        <p className="text-white/60 text-sm sm:text-base mt-1">
                            {discountProducts.length} məhsul
                        </p>
                    </div>
                </header>

                <div className="relative group hero-swiper-wrapper">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={12}
                        slidesPerView={3}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 12 },
                            480: { spaceBetween: 16 },
                            640: { slidesPerView: 2, spaceBetween: 16 },
                            768: { slidesPerView: 3, spaceBetween: 18 },
                            1024: { spaceBetween: 20 },
                            1280: { spaceBetween: 24 }
                        }}
                        navigation={{
                            prevEl: '.hero-swiper-prev',
                            nextEl: '.hero-swiper-next'
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                            dynamicMainBullets: 3
                        }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={discountProducts.length >= 2}
                        className="overflow-hidden! pb-16 sm:pb-20"
                    >
                        {discountProducts.map((product) => (
                            <SwiperSlide key={product._id} className="h-auto">
                                <div className="w-full max-w-65 sm:max-w-70 mx-auto">
                                    <ProductCard
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                        onAddToFav={handleAddToFav}
                                        isInWishlist={isInWishlist(product._id)}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button
                        type="button"
                        className="hero-swiper-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50 md:opacity-100 lg:left-0"
                        aria-label="Əvvəlki"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button
                        type="button"
                        className="hero-swiper-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50 md:opacity-100 lg:right-0"
                        aria-label="Növbəti"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>
            </div>

            <style>{`
                .hero-swiper-wrapper {
                    --swiper-navigation-size: 1.25rem;
                }
                .hero-swiper-wrapper .swiper {
                    overflow: hidden;
                }
                .hero-swiper-wrapper .swiper-pagination {
                    position: relative;
                    margin-top: 1.25rem;
                }
                .hero-swiper-wrapper .swiper-pagination-bullet {
                    background: rgba(255,255,255,0.4);
                    opacity: 1;
                    width: 8px;
                    height: 8px;
                    transition: all 0.2s ease;
                }
                .hero-swiper-wrapper .swiper-pagination-bullet-active {
                    background: #fff;
                    width: 24px;
                    border-radius: 4px;
                }
                .hero-swiper-wrapper .swiper-button-disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
            `}</style>
        </section>
    );
}

export default Hero;
