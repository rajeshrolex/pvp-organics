import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ name, category, image, telugu }) => {
    const { addToCart, cart } = useCart();
    const [justAdded, setJustAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart({ name, category, image, telugu });
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 2000);
    };

    const isInCart = cart.some(item => item.name === name);

    return (
        <div className="glass-card rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent-light to-white">
                {image && (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                )}
                <div className="absolute top-3 right-3 glass px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-primary-navy">{category}</span>
                </div>
                {isInCart && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
                        <Check size={14} />
                        <span className="text-xs font-semibold">In Cart</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-primary-navy mb-1">{name}</h3>
                {telugu && <p className="text-sm text-gray-600 mb-4">{telugu}</p>}

                <button
                    onClick={handleAddToCart}
                    className={`w-full font-semibold py-2.5 px-4 rounded-lg 
                     flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 
                     transition-all duration-300 ${justAdded
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-gold text-white'
                        }`}
                >
                    {justAdded ? (
                        <>
                            <Check size={18} />
                            <span>Added!</span>
                        </>
                    ) : (
                        <>
                            <ShoppingBag size={18} />
                            <span>Add to Cart</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
