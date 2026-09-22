import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, User } from 'lucide-react';

const Navbar = ({ title = 'Dashboard', onToggleMobileMenu }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 px-4 sm:px-6 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl">
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
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">{title}</h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* System Health Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          System Operational
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
          <div className="p-1.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700/50">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs font-semibold text-white">{user?.name}</p>
            <p className="text-[10px] text-slate-400 capitalize">{user?.role} Account</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
