
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Founder from './components/Founder';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import MotionBackground from './components/MotionBackground';

const App: React.FC = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-larsson-black overflow-x-hidden selection:bg-larsson-accent selection:text-white">
      {/* Global Motion Background */}
      <MotionBackground />

      <Navbar onBookingClick={() => {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
      }} />
      
      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>

        <section id="services" className="py-32 bg-larsson-black/20 backdrop-blur-sm relative border-y border-white/5">
          <Services />
        </section>

        <section id="about" className="bg-larsson-black/20 backdrop-blur-sm">
          <About />
        </section>

        <section id="founder" className="bg-larsson-black/20 backdrop-blur-sm">
          <Founder />
        </section>

        <section id="portfolio" className="py-32 bg-larsson-black/20 backdrop-blur-sm border-y border-white/5">
          <Portfolio />
        </section>

        <section id="testimonials" className="bg-larsson-black/20 backdrop-blur-sm">
          <Testimonials />
        </section>

        <section id="booking" className="py-32 bg-larsson-black/40 backdrop-blur-md relative overflow-hidden border-t border-white/5">
          <Booking />
        </section>
      </main>

      <Footer />

      {/* AI Assistant FAB */}
      <div className="fixed bottom-10 right-10 z-[70]">
        <button
          onClick={() => setIsAiOpen(!isAiOpen)}
          className="bg-white hover:bg-larsson-accent text-larsson-black hover:text-white w-16 h-16 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all hover:scale-110 active:scale-95 flex items-center justify-center group overflow-hidden"
        >
          {isAiOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </button>
        {isAiOpen && <AIAssistant onClose={() => setIsAiOpen(false)} />}
      </div>

      <style>{`
        .reveal {
          position: relative;
          transform: translateY(60px);
          opacity: 0;
          transition: 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) all;
        }
        .reveal.active {
          transform: translateY(0);
          opacity: 1;
        }
        #services .reveal { transform: scale(0.98) translateY(40px); }
        #services .reveal.active { transform: scale(1) translateY(0); }
      `}</style>
    </div>
  );
};

export default App;
