import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, User } from 'lucide-react';

const Navbar = ({ title = 'Dashboard', onToggleMobileMenu }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 px-4 sm:px-6 bg-slate-900/20 border-b border-white/5 flex items-center justify-between sticky top-0 z-40 backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Hamburger Toggle */}
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base sm:text-xl font-black text-white tracking-tight">{title}</h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* System Health Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
          System Operational
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="p-2 rounded-xl bg-slate-900/60 text-slate-300 border border-white/10 shadow-sm">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-white leading-none">{user?.name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{user?.role} Account</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
