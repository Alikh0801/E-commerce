import { createContext, useState, useEffect, useContext } from 'react';

const WISHLIST_STORAGE_KEY = 'az_perfumery_wishlist';

const wishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [productIds, setProductIds] = useState([]);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                const list = Array.isArray(parsed) ? parsed : [];
                const ids = list.map((i) => (typeof i === 'object' && i != null && i.productId ? i.productId : i));
                setProductIds(ids.filter(Boolean));
            }
        } catch (_) {
            setProductIds([]);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(productIds));
        } catch (_) {}
    }, [productIds]);

    const addToWishlist = (productId) => {
        setProductIds((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
    };

    const removeFromWishlist = (productId) => {
        setProductIds((prev) => prev.filter((id) => id !== productId));
    };

    const toggleWishlist = (productId) => {
        setProductIds((prev) =>
            prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
        );
    };

    const isInWishlist = (productId) => productIds.includes(productId);

    return (
        <wishlistContext.Provider
            value={{
                wishlistIds: productIds,
                wishlistCount: productIds.length,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                isInWishlist,
            }}
        >
            {children}
        </wishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const ctx = useContext(wishlistContext);
    if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
    return ctx;
};
