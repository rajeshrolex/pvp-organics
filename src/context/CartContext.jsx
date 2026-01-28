import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('pvp-organics-cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to load cart:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('pvp-organics-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const size = product.size || 'Standard';
            const uniqueId = `${product.name}-${size}`;
            const existingItem = prevCart.find(item => item.uniqueId === uniqueId);

            if (existingItem) {
                // Increment quantity if item already exists
                return prevCart.map(item =>
                    item.uniqueId === uniqueId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item with quantity 1
                return [...prevCart, { ...product, size, uniqueId, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (uniqueId) => {
        setCart(prevCart => prevCart.filter(item => item.uniqueId !== uniqueId));
    };

    const updateQuantity = (uniqueId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(uniqueId);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.uniqueId === uniqueId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const sendToWhatsApp = () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        let message = '*Order from PVP Organics*%0A%0A';
        message += '*Items:*%0A';

        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name}`;
            if (item.telugu) {
                message += ` (${item.telugu})`;
            }
            if (item.size && item.size !== 'Standard') {
                message += ` - ${item.size}`;
            }
            message += ` - Qty: ${item.quantity}%0A`;
        });

        message += `%0A*Total Items: ${getTotalItems()}*%0A%0A`;
        message += 'Please confirm availability and pricing. Thank you!';

        window.open(`https://wa.me/917013490164?text=${message}`, '_blank');
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        sendToWhatsApp,
        isCartOpen,
        setIsCartOpen,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
