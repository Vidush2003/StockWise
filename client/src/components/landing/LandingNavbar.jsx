import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const LandingNavbar = ({ onOpenAuth }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-center">
      <div className="glass-panel w-full max-w-7xl rounded-2xl px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-brand-500/20 p-2 rounded-lg group-hover:bg-brand-500/30 transition-colors">
            <Package className="w-6 h-6 text-brand-500" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">StockWise</span>
        </Link>

        {/* Center Links (Desktop only) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#workflow" className="hover:text-white transition-colors">How it Works</a>
          <a href="#security" className="hover:text-white transition-colors">Security</a>
        </div>

        {/* Auth CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onOpenAuth('login')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => onOpenAuth('register')}
            className="text-sm font-medium bg-white text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
