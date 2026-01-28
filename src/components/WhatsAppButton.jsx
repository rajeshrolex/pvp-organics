import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        window.open(
            'https://wa.me/916281527429?text=Hi,%20I\'d%20like%20to%20know%20more%20about%20PVP%20Organics%20products',
            '_blank'
        );
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={handleClick}
                    className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full 
                     shadow-2xl hover:scale-110 transition-all duration-300 animate-glow 
                     hover:bg-green-600 group"
                    aria-label="Contact on WhatsApp"
                >
                    <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />

                    {/* Tooltip */}
                    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-primary-navy 
                         text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 
                         group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                        Chat with us on WhatsApp
                    </span>

                    {/* Pulse Effect */}
                    <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
                </button>
            )}
        </>
    );
};

export default WhatsAppButton;
