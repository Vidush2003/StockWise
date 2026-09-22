import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import HeroSection from '../components/landing/HeroSection';
import BentoGrid from '../components/landing/BentoGrid';
import WorkflowSection from '../components/landing/WorkflowSection';
import TrustAndCTASection from '../components/landing/TrustAndCTASection';
import LandingFooter from '../components/landing/LandingFooter';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-surface-a text-white overflow-x-hidden selection:bg-brand-500/30 font-sans">
      <LandingNavbar />
      <HeroSection />
      <BentoGrid />
      <WorkflowSection />
      <TrustAndCTASection />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
