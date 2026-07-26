import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import RequestQuote from './sections/RequestQuote';
import Inquiry from './sections/Inquiry';
import ConverterPage from './pages/ConverterPage';
import TechnologyPage from './pages/TechnologyPage';
import ApplicationsPage from './pages/ApplicationsPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';

function HomePage() {
  return (
    <>
      <Hero />
      <RequestQuote />
      <Inquiry />
    </>
  );
}

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <Header />
      <ScrollToHash />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/converter" element={<ConverterPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
