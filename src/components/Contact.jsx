import { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';

const Contact = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
                            setTimeout(() => {
                                el.style.opacity = '1';
                                el.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const contactInfo = [
        {
            icon: <Phone className="text-primary-gold" size={24} />,
            title: 'Phone',
            details: [
                { label: '7013490164', link: 'tel:+917013490164' },
                { label: '9493709757', link: 'tel:+919493709757' },
            ],
        },
        {
            icon: <Mail className="text-primary-gold" size={24} />,
            title: 'Email',
            details: [
                { label: 'pvporganics078@gmail.com', link: 'mailto:pvporganics078@gmail.com' },
            ],
        },
        {
            icon: <MapPin className="text-primary-gold" size={24} />,
            title: 'Address',
            details: [
                { label: 'near SFS school mithalapuri Vudacolony madhurwada vishakapatnam 530048', link: null },
            ],
        },
        {
            icon: <Clock className="text-primary-gold" size={24} />,
            title: 'Business Hours',
            details: [
                { label: 'Monday - Friday: 9am to 9pm', link: null },
                { label: 'Saturday: 9am to 6pm', link: null },
                { label: 'Sunday: 9am to 6pm', link: null },
            ],
        },
    ];

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="section-padding bg-gradient-to-br from-accent-light via-white to-accent-light relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-gold/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl"></div>

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
                        Get In <span className="text-gradient">Touch</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6"></div>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Reach out to us anytime!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 animate-on-scroll"
                                style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gradient-gold rounded-xl">{info.icon}</div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-primary-navy mb-3">{info.title}</h3>
                                        <div className="space-y-2">
                                            {info.details.map((detail, idx) => (
                                                <div key={idx}>
                                                    {detail.link ? (
                                                        <a
                                                            href={detail.link}
                                                            className="text-gray-700 hover:text-primary-gold transition-colors block"
                                                        >
                                                            {detail.label}
                                                        </a>
                                                    ) : (
                                                        <p className="text-gray-700">{detail.label}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Social Media & QR Code */}
                    <div className="space-y-6">
                        {/* Social Media Links */}
                        <div
                            className="glass-card rounded-2xl p-8 animate-on-scroll"
                            style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}
                        >
                            <h3 className="text-2xl font-bold text-primary-navy mb-6">Connect With Us</h3>
                            <div className="space-y-4">
                                <a
                                    href="#"
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary-gold/10 transition-all group"
                                >
                                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                                        <Facebook className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-primary-navy">Facebook</p>
                                        <p className="text-sm text-gray-600">Follow us on Facebook</p>
                                    </div>
                                </a>
                                <a
                                    href="https://www.instagram.com/pvp_organics"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary-gold/10 transition-all group"
                                >
                                    <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                        <Instagram className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-primary-navy">Instagram</p>
                                        <p className="text-sm text-gray-600">@pvp_organics</p>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary-gold/10 transition-all group"
                                >
                                    <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg group-hover:scale-110 transition-transform">
                                        <Linkedin className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-primary-navy">LinkedIn</p>
                                        <p className="text-sm text-gray-600">Connect on LinkedIn</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Instagram QR Code */}
                        <div
                            className="glass-card rounded-2xl p-8 text-center animate-on-scroll"
                            style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}
                        >
                            <h3 className="text-xl font-bold text-primary-navy mb-4">Scan to Follow</h3>
                            <img
                                src="/instagram-qr.jpg"
                                alt="Instagram QR Code"
                                className="w-64 h-64 mx-auto rounded-2xl shadow-lg"
                            />
                            <p className="text-gray-600 mt-4">Scan to follow us on Instagram</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div
                    className="mt-16 text-center glass-card rounded-3xl p-12 animate-on-scroll"
                    style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}
                >
                    <h3 className="text-3xl font-bold text-primary-navy mb-4">
                        Ready to Experience Pure Organic Goodness?
                    </h3>
                    <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                        Order now and get premium quality organic products delivered to your doorstep
                    </p>
                    <a
                        href="https://wa.me/917013490164?text=Hi,%20I'd%20like%20to%20place%20an%20order"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-block"
                    >
                        Order on WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
