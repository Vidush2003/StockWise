import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, History, User, LogOut, ShieldCheck, Box, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, isAdmin, logout } = useAuth();

  const navSections = [
    {
      title: 'Main',
      items: [{ label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }]
    },
    {
      title: 'Inventory',
      items: [
        { label: 'Products Catalog', path: '/products', icon: Package },
        { label: 'Audit Transactions', path: '/transactions', icon: History }
      ]
    },
    {
      title: 'Account',
      items: [{ label: 'Profile & Settings', path: '/profile', icon: User }]
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full bg-slate-900/40 border-r border-white/5 backdrop-blur-3xl">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5 leading-none">
                StockWise
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-500/70 mt-1">B2B Inventory SaaS</p>
            </div>
          </div>
          {/* Mobile Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <nav className="p-4 space-y-5 overflow-y-auto">
          {navSections.map((section, idx) => (
            <div key={idx}>
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => onClose && onClose()}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${isActive
                          ? 'bg-brand-500/10 text-brand-300 border border-brand-500/20 shadow-[0_0_15px_rgba(37,99,235,0.15)]'
                          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-white/5 bg-slate-950/20">
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-black text-xs uppercase shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.2)]">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${isAdmin
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}
              >
                <ShieldCheck className="w-2.5 h-2.5" />
                {user?.role}
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            title="Log Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Static Sidebar (Visible >= 1024px) */}
      <aside className="hidden lg:block w-64 shrink-0 min-h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay (Visible < 1024px when isOpen = true) */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
          />
          <div className="relative w-72 max-w-full z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
