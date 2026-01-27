import { Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-navy text-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary-gold/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-orange/5 rounded-full blur-3xl"></div>

            <div className="container-custom px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/logo.png" alt="PVP Organics" className="h-12 w-12" />
                            <div>
                                <h3 className="text-xl font-bold">PVP Organics</h3>
                                <p className="text-sm text-accent-light">Pure & Natural</p>
                            </div>
                        </div>
                        <p className="text-white/80 mb-4">
                            Your trusted source for premium wood-pressed oils, organic dry fruits, and authentic spices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {['Home', 'About', 'Products', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="text-white/80 hover:text-primary-gold transition-colors"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-white/80">
                            <li>
                                <a href="tel:+917013490164" className="hover:text-primary-gold transition-colors">
                                    📞 7013490164
                                </a>
                            </li>
                            <li>
                                <a href="tel:+919493709757" className="hover:text-primary-gold transition-colors">
                                    📞 9493709757
                                </a>
                            </li>
                            <li>
                                <a href="mailto:pvporganics078@gmail.com" className="hover:text-primary-gold transition-colors">
                                    ✉️ pvporganics078@gmail.com
                                </a>
                            </li>
                            <li className="text-sm">
                                📍 near SFS school mithalapuri<br />
                                Vudacolony madhurwada<br />
                                vishakapatnam 530048
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/60 text-sm text-center md:text-left">
                        © {currentYear} PVP Organics. All rights reserved.
                    </p>
                    <p className="text-white/60 text-sm flex items-center gap-2">
                        Made with <Heart className="text-red-500" size={16} /> for health & wellness
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
