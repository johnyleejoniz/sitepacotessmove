import React from 'react';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import NewsSection from './components/NewsSection';
import PricingSection from './components/PricingSection';
import SupportSection from './components/SupportSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <IntroSection />
      <NewsSection />
      <PricingSection />
      <SupportSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default App;