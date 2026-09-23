import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import LoadingState from '../components/LoadingState';

const pageTitleMap = {
  '/dashboard': 'Dashboard Overview',
  '/products': 'Inventory Product Catalog',
  '/transactions': 'Stock Audit History',
  '/analytics': 'Inventory Analytics & Reports',
  '/profile': 'Profile & Account Settings'
};

const AppLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <LoadingState message="Authenticating session..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const title = pageTitleMap[location.pathname] || 'StockWise';

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white relative">
        <div className="aurora-bg"></div>
        <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0 relative z-10">
          <Navbar title={title} onToggleMobileMenu={() => setMobileMenuOpen(true)} />
          <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};

export default AppLayout;
