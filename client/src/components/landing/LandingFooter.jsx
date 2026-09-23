import React from 'react';
import { Package } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-brand-500/20 p-1.5 rounded-lg">
            <Package className="w-5 h-5 text-brand-500" />
          </div>
          <span className="font-bold tracking-tight text-white">StockWise</span>
        </div>
        
        <div className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} StockWise Inc. All rights reserved.
        </div>
        
        <div className="flex gap-6 text-sm text-slate-500">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
