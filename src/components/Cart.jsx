import { X, Plus, Minus, Trash2, ShoppingCart, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getTotalItems, sendToWhatsApp, isCartOpen, setIsCartOpen } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Cart Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col">
                {/* Header */}
                <div className="bg-gradient-gold p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                        <ShoppingCart size={24} />
                        <h2 className="text-xl font-bold">Your Cart</h2>
                        {getTotalItems() > 0 && (
                            <span className="bg-white text-primary-gold px-2 py-1 rounded-full text-sm font-bold">
                                {getTotalItems()}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingCart size={64} className="text-gray-300 mb-4" />
                            <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
                            <p className="text-gray-400 text-sm">Add some products to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.name} className="bg-gray-50 rounded-lg p-3 flex gap-3">
                                    {/* Product Image */}
                                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-primary-navy text-sm mb-1 truncate">
                                            {item.name}
                                        </h3>
                                        {item.telugu && (
                                            <p className="text-xs text-gray-600 mb-2">{item.telugu}</p>
                                        )}

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.name, item.quantity - 1)}
                                                className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="font-semibold text-sm w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.name, item.quantity + 1)}
                                                className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.name)}
                                                className="ml-auto text-red-500 hover:text-red-700 p-1 transition-colors"
                                                title="Remove from cart"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer - Send to WhatsApp */}
                {cart.length > 0 && (
                    <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="mb-3 text-center">
                            <p className="text-sm text-gray-600">
                                Total Items: <span className="font-bold text-primary-navy">{getTotalItems()}</span>
                            </p>
                        </div>
                        <button
                            onClick={sendToWhatsApp}
                            className="w-full bg-gradient-gold text-white font-semibold py-3 px-4 rounded-lg 
                                     flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 
                                     transition-all duration-300"
                        >
                            <Send size={20} />
                            <span>Send Order via WhatsApp</span>
                        </button>
                        <p className="text-xs text-gray-500 text-center mt-2">
                            We'll confirm pricing and availability
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
