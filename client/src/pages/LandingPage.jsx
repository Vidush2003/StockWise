import React, { useState } from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import HeroSection from '../components/landing/HeroSection';
import BentoGrid from '../components/landing/BentoGrid';
import WorkflowSection from '../components/landing/WorkflowSection';
import TrustAndCTASection from '../components/landing/TrustAndCTASection';
import LandingFooter from '../components/landing/LandingFooter';
import AuthModal from '../components/landing/AuthModal';

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-brand-500/30 font-sans relative">
      {/* Global Ambient Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/5 blur-[150px]"></div>
      </div>
      
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col">
        <LandingNavbar onOpenAuth={openAuthModal} />
        <HeroSection onOpenAuth={openAuthModal} />
        <BentoGrid />
        <WorkflowSection />
        <TrustAndCTASection onOpenAuth={openAuthModal} />
        <LandingFooter />
      </div>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        initialMode={authMode} 
      />
    </div>
  );
};

export default LandingPage;
