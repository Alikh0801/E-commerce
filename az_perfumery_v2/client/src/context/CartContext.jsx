import { createContext, useState, useEffect, useContext } from 'react';

const CART_STORAGE_KEY = 'az_perfumery_cart';

const cartContext = createContext();

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(CART_STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                setItems(Array.isArray(parsed) ? parsed : []);
            }
        } catch (_) {
            setItems([]);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        } catch (_) {}
    }, [items]);

    const addToCart = ({ productId, size, quantity = 1, title, image, price, oldPrice }) => {
        setItems((prev) => {
            const existing = prev.findIndex(
                (i) => i.productId === productId && i.size === size
            );
            if (existing >= 0) {
                const next = [...prev];
                next[existing].quantity += quantity;
                return next;
            }
            return [
                ...prev,
                { productId, size, quantity, title: title ?? '', image: image ?? '', price: price ?? 0, oldPrice: oldPrice != null ? oldPrice : undefined },
            ];
        });
    };

    const removeFromCart = (productId, size) => {
        setItems((prev) => prev.filter(
            (i) => !(i.productId === productId && i.size === size)
        ));
    };

    const updateQuantity = (productId, size, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId, size);
            return;
        }
        setItems((prev) =>
            prev.map((i) =>
                i.productId === productId && i.size === size
                    ? { ...i, quantity }
                    : i
            )
        );
    };

    const clearCart = () => setItems([]);

    const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <cartContext.Provider
            value={{
                cartItems: items,
                cartCount,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </cartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(cartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
};
