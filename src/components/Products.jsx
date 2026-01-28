import { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { Droplet, Apple, Sparkles } from 'lucide-react';

const Products = () => {
    const [activeTab, setActiveTab] = useState('oils');
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
                            }, index * 50);
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
    }, [activeTab]);

    const categories = [
        { id: 'oils', name: 'Wood Pressed Oils', icon: <Droplet size={20} />, image: '/oils.png' },
        { id: 'dryfruits', name: 'Dry Fruits', icon: <Apple size={20} />, image: '/dryfruits.png' },
        { id: 'spices', name: 'Spices', icon: <Sparkles size={20} />, image: '/spices.png' },
    ];

    const products = {
        oils: [
            { name: 'Black Sesame Oil', telugu: 'నల్ల నువ్వుల నూనె', category: 'Wood Pressed', image: '/Wood Pressed Oils/Black Sesame Oil.jpg', quantities: ['1 Litre', '500 ml'] },
            { name: 'Coconut Oil', telugu: 'కొబ్బరి నూనె', category: 'Wood Pressed', image: '/Wood Pressed Oils/coconut oil.jpg', quantities: ['1 Litre', '500 ml'] },
            { name: 'Castor Oil', telugu: 'ఆముదం నూనె', category: 'Wood Pressed', image: '/Wood Pressed Oils/Castor Oil.jpg', quantities: ['1 Litre', '500 ml'] },
            { name: 'Ground Nut Oil', telugu: 'వేరు శెనగ నూనె', category: 'Wood Pressed', image: '/Wood Pressed Oils/Ground Nut Oil.jpg', quantities: ['1 Litre', '500 ml'] },
            { name: 'Mustard Oil', telugu: 'ఆవ నూనె', category: 'Wood Pressed', image: '/Wood Pressed Oils/modified.jpg', quantities: ['1 Litre', '500 ml'] },
            { name: 'Sesame Oil', telugu: 'నువ్వుల నూనె', category: 'Wood Pressed', image: '/Wood Pressed Oils/Sesame Oil.jpg', quantities: ['1 Litre', '500 ml'] },
            { name: 'Sunflower Oil', telugu: 'పొద్దు తిరుగుడు నూనె', category: 'Wood Pressed', image: '/Wood Pressed Oils/Sunflower Oil.jpg', quantities: ['1 Litre', '500 ml'] },
            { name: 'Almond Oil', telugu: 'బాదం నూనె', category: 'Wood Pressed', image: '/Wood Pressed Oils/Almond Oil.jpg', quantities: ['1 Litre', '500 ml'] },
            { name: 'Safflower Oil', telugu: 'కుసుము నూనె', category: 'Wood Pressed', image: '/Wood Pressed Oils/Safflower Oil.jpg', quantities: ['1 Litre', '500 ml'] },
        ],
        dryfruits: [
            { name: 'Cashew JH', telugu: 'జీడి పప్పు (JH)', category: 'Premium', image: '/Dry Fruits/Cashew_JH.png', quantities: ['1 kg', '500 g', '250 g'] },
            { name: 'Cashew Jumbo', telugu: 'జీడి పప్పు (Jumbo)', category: 'Premium', image: '/Dry Fruits/Cashew Jumbo.jpg', quantities: ['1 kg', '500 g', '250 g'] },
            { name: 'Anjeer', telugu: 'అంజూరం', category: 'Premium', image: '/Dry Fruits/Dry Figs.jpg', quantities: ['1 kg', '500 g', '250 g'] },
            { name: 'Badam', telugu: 'బాదం పప్పు', category: 'Premium', image: '/Dry Fruits/Almond.png', quantities: ['1 kg', '500 g', '250 g'] },
            { name: 'Kismiss', telugu: 'ఎండు ద్రాక్ష', category: 'Premium', image: '/Dry Fruits/Golden Raisins.jpg', quantities: ['1 kg', '500 g', '250 g'] },
            { name: 'Black Kismiss', telugu: 'నల్ల ద్రాక్ష', category: 'Premium', image: '/Dry Fruits/Black Raisins.jpg', quantities: ['1 kg', '500 g', '250 g'] },
            { name: 'Pumpkin Seeds', telugu: 'గుమ్మడి విత్తనాలు', category: 'Seeds', image: '/Seeds/Pumpkin_Seeds.jpg', quantities: ['1 kg', '500 g', '250 g'] },
            { name: 'Sunflower Seeds', telugu: 'పొద్దుతిరుగుడు విత్తనాలు', category: 'Seeds', image: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Sunflower_seeds.jpg', quantities: ['1 kg', '500 g', '250 g'] },
            { name: 'Flax Seeds', telugu: 'అవిసె గింజలు', category: 'Seeds', image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Brown_Flax_Seeds.jpg', quantities: ['1 kg', '500 g', '250 g'] },
            { name: 'Chia Seeds', telugu: 'చియా విత్తనాలు', category: 'Seeds', image: '/Dry Fruits/7c5d18a8086fb13cbd8f233151700681.jpg', quantities: ['1 kg', '500 g', '250 g'] },
            { name: 'Honey', telugu: 'తేనె', category: 'Natural', image: '/oils.png', quantities: ['1 kg', '500 g', '250 g'] },
        ],
        spices: [
            { name: 'Turmeric Powder', telugu: 'పసుపు', category: 'Spice', image: '/turmeric.jpg', quantities: ['250 g', '500 g', '100 g'] },
            { name: 'Red Chili Powder', telugu: 'మిరపకాయ పొడి', category: 'Spice', image: '/chili.jpg', quantities: ['250 g', '500 g', '100 g'] },
            { name: 'Coriander Seeds', telugu: 'ధనియాలు', category: 'Spice', image: '/coriander.jpg', quantities: ['250 g', '500 g', '100 g'] },
            { name: 'Cumin Seeds', telugu: 'జీలకర్ర', category: 'Spice', image: '/cumin.jpg', quantities: ['250 g', '500 g', '100 g'] },
            { name: 'Black Pepper', telugu: 'మిరియాలు', category: 'Spice', image: '/pepper.jpg', quantities: ['250 g', '500 g', '100 g'] },
            { name: 'Mustard Seeds', telugu: 'ఆవాలు', category: 'Spice', image: '/mustard-seeds.jpg', quantities: ['250 g', '500 g', '100 g'] },
            { name: 'Fenugreek Seeds', telugu: 'మెంతులు', category: 'Spice', image: '/Spices/Fenugreek Seeds.png', quantities: ['250 g', '500 g', '100 g'] },
            { name: 'Cardamom', telugu: 'ఏలకులు', category: 'Spice', image: '/Spices/Cardamom.png', quantities: ['250 g', '500 g', '100 g'] },
            { name: 'Cinnamon', telugu: 'దాల్చిన చెక్క', category: 'Spice', image: '/Spices/Cinnamon.png', quantities: ['250 g', '500 g', '100 g'] },
            { name: 'Cloves', telugu: 'లవంగాలు', category: 'Spice', image: '/Spices/Cloves.png', quantities: ['100 g', '50 g'] },
            { name: 'Star Anise', telugu: 'అనాస పువ్వు', category: 'Spice', image: '/Spices/StarAnise.png', quantities: ['100 g', '50 g'] },
            { name: 'Mace', telugu: 'జాపత్రి', category: 'Spice', image: '/Spices/Mace.png', quantities: ['50 g', '25 g'] },
            { name: 'Bay Leaves', telugu: 'బిర్యానీ ఆకు', category: 'Spice', image: '/Spices/BayLeaves.png', quantities: ['50 g', '25 g'] },
            { name: 'Kasthuri Methi', telugu: 'కస్తూరి మేతి', category: 'Spice', image: '/Spices/KasthuriMethi.png', quantities: ['100 g', '50 g'] },
        ],
    };

    return (
        <section
            id="products"
            ref={sectionRef}
            className="section-padding bg-gradient-to-br from-primary-navy via-primary-dark to-primary-navy relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-gold/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl"></div>

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12 animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Our Premium <span className="text-primary-gold">Products</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6"></div>
                    <p className="text-lg text-accent-light max-w-2xl mx-auto">
                        Handpicked selection of the finest organic products for your health and wellness
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveTab(category.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === category.id
                                ? 'bg-gradient-gold text-white shadow-lg scale-105'
                                : 'glass text-white hover:bg-white/20'
                                }`}
                        >
                            {category.icon}
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>

                {/* Category Hero Image */}
                <div className="mb-12 animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}>
                    <div className="relative h-64 rounded-3xl overflow-hidden glass">
                        <img
                            src={categories.find(c => c.id === activeTab)?.image}
                            alt={categories.find(c => c.id === activeTab)?.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/80 to-transparent flex items-end">
                            <div className="p-8">
                                <h3 className="text-3xl font-bold text-white mb-2">
                                    {categories.find(c => c.id === activeTab)?.name}
                                </h3>
                                <p className="text-accent-light">
                                    {activeTab === 'oils' && 'Traditional wood-pressed oils for authentic nutrition'}
                                    {activeTab === 'dryfruits' && 'Premium quality dry fruits handpicked for you'}
                                    {activeTab === 'spices' && 'Aromatic spices to elevate your culinary experience'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products[activeTab].map((product, index) => (
                        <div
                            key={index}
                            className="animate-on-scroll"
                            style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}
                        >
                            <ProductCard
                                name={product.name}
                                telugu={product.telugu}
                                category={product.category}
                                image={product.image || categories.find(c => c.id === activeTab)?.image}
                                quantities={product.quantities}
                            />
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16 animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}>
                    <p className="text-white text-lg mb-6">
                        Can't find what you're looking for? Get in touch with us!
                    </p>
                    <a
                        href="https://wa.me/916281527429?text=Hi,%20I'd%20like%20to%20know%20more%20about%20your%20products"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-block"
                    >
                        Contact Us on WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Products;
