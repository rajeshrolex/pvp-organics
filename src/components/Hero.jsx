import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: '/oils.png',
            title: 'Wood Pressed Oils',
            subtitle: 'Traditional & Healthy',
            color: 'from-yellow-900/80 to-yellow-800/80'
        },
        {
            image: '/dryfruits.png',
            title: 'Premium Dry Fruits',
            subtitle: 'Handpicked Fullness',
            color: 'from-amber-900/80 to-amber-800/80'
        },
        {
            image: '/spices.png',
            title: 'Authentic Spices',
            subtitle: 'Pure & Aromatic',
            color: 'from-red-900/80 to-red-800/80'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div id="home" className="relative h-[500px] md:h-[600px] w-full overflow-hidden mt-20">
            {/* Slides */}
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="min-w-full h-full relative">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay with Text */}
                        <div className={`absolute inset-0 flex items-center justify-center`}>
                            <div className="text-center text-white px-4 animate-fade-in">
                                <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
                                    {slide.title}
                                </h2>
                                <p className="text-xl md:text-2xl font-medium mb-8 text-yellow-100">
                                    {slide.subtitle}
                                </p>
                                <a
                                    href="#products"
                                    className="bg-primary-gold text-primary-navy px-8 py-3 rounded-full font-bold 
                           hover:bg-white transition-all duration-300 transform hover:scale-105"
                                >
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
            >
                <ChevronRight size={32} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-primary-gold w-8' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
