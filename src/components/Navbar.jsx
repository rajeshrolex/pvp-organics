import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { getTotalItems, setIsCartOpen } = useCart();

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Products', href: '#products' },
        { name: 'Contact', href: '#contact' },
    ];

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-navy shadow-lg">
            <div className="container-custom px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('#home');
                        }}
                        className="flex items-center space-x-3 group"
                    >
                        <img
                            src="/logo.png"
                            alt="PVP Organics Logo"
                            className="h-14 w-14 transition-transform duration-300 group-hover:scale-110"
                        />
                        <div>
                            <h1 className="text-xl font-bold text-white">PVP Organics</h1>
                            <p className="text-xs text-accent-light">Pure & Natural</p>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(link.href);
                                }}
                                className="text-white font-medium hover:text-primary-gold transition-colors duration-300 relative group"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-gold transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative text-white hover:text-primary-gold transition-colors p-2"
                            aria-label="Open cart"
                        >
                            <ShoppingCart size={24} />
                            {getTotalItems() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {getTotalItems()}
                                </span>
                            )}
                        </button>
                        <a
                            href="https://wa.me/916281527429"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-sm !py-2.5 !px-6"
                        >
                            Order Now
                        </a>
                    </div>

                    {/* Mobile Cart and Menu Buttons */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Open cart"
                        >
                            <ShoppingCart size={24} />
                            {getTotalItems() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {getTotalItems()}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 border-t border-white/10 pt-4 animate-slide-up">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(link.href);
                                }}
                                className="block text-white font-medium py-3 hover:text-primary-gold transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="https://wa.me/916281527429"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary w-full mt-4 text-center block"
                        >
                            Order Now
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
