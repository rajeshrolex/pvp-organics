import { useEffect, useRef } from 'react';
import { Leaf, Award, Heart, Shield } from 'lucide-react';

const About = () => {
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

    const features = [
        {
            icon: <Leaf className="text-primary-gold" size={32} />,
            title: 'Traditional Methods',
            desc: 'Wood pressed oils using age-old techniques to preserve nutrients and natural goodness',
        },
        {
            icon: <Award className="text-primary-gold" size={32} />,
            title: 'Premium Quality',
            desc: 'Handpicked products sourced from trusted organic farms ensuring top quality',
        },
        {
            icon: <Heart className="text-primary-gold" size={32} />,
            title: 'Health First',
            desc: 'Chemical-free, preservative-free products for your family\'s wellness',
        },
        {
            icon: <Shield className="text-primary-gold" size={32} />,
            title: 'Purity Guaranteed',
            desc: '100% authentic products with no additives or artificial ingredients',
        },
    ];

    return (
        <section
            id="about"
            ref={sectionRef}
            className="section-padding bg-gradient-to-br from-accent-light via-white to-accent-light relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-gold/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl"></div>

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
                        About <span className="text-gradient">PVP Organics</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6"></div>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        Your trusted source for premium quality organic products
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    {/* Image */}
                    <div className="animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}>
                        <div className="relative">
                            <img
                                src="/logo.png"
                                alt="PVP Organics"
                                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-6 max-w-xs">
                                <p className="text-primary-navy font-bold text-3xl mb-1">100%</p>
                                <p className="text-gray-600">Pure & Natural Products</p>
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-6 animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}>
                        <h3 className="text-3xl font-bold text-primary-navy">
                            Bringing Nature's Finest to Your Doorstep
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            At PVP Organics, we believe in the power of nature and traditional wisdom. Our journey began with
                            a simple mission: to provide families with pure, unadulterated organic products that promote health
                            and wellness.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            We specialize in wood-pressed oils extracted using traditional cold-press methods, premium dry fruits
                            handpicked for quality, and authentic Indian spices that bring flavor and nutrition to your meals.
                            Every product is carefully sourced and processed to retain maximum nutritional value.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="glass-card rounded-xl px-6 py-3">
                                <p className="text-primary-gold font-bold text-2xl">500+</p>
                                <p className="text-gray-600 text-sm">Happy Customers</p>
                            </div>
                            <div className="glass-card rounded-xl px-6 py-3">
                                <p className="text-primary-gold font-bold text-2xl">50+</p>
                                <p className="text-gray-600 text-sm">Premium Products</p>
                            </div>
                            <div className="glass-card rounded-xl px-6 py-3">
                                <p className="text-primary-gold font-bold text-2xl">100%</p>
                                <p className="text-gray-600 text-sm">Organic Quality</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl animate-on-scroll"
                            style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h4 className="text-xl font-bold text-primary-navy mb-2">{feature.title}</h4>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
