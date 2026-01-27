import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import './index.css';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Navbar />
        <Hero />
        <About />
        <Products />
        <Contact />
        <Footer />
        <WhatsAppButton />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
