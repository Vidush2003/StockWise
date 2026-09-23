import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatters';
import { User, Mail, ShieldCheck, CheckCircle2, Calendar, Shield, KeyRound, Sliders } from 'lucide-react';

const ProfilePage = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const adminPermissions = [
    'Create, edit, and soft-delete product catalog items',
    'Set product pricing, minimum stock thresholds, and suppliers',
    'Record Stock-In and Stock-Out inventory transactions',
    'View complete transaction audit history & export data',
    'Access real-time dashboard KPIs and category analytics'
  ];

  const staffPermissions = [
    'View product catalog, current quantities, and specifications',
    'Record Stock-In (receiving shipments) transactions',
    'Record Stock-Out (issuing stock / sales) transactions',
    'View transaction audit history',
    'Access dashboard analytics & low stock warnings'
  ];

  const permissions = isAdmin ? adminPermissions : staffPermissions;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Header Banner */}
      <div className="p-8 rounded-3xl glass-panel-elevated relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-brand-500/20 transition-colors"></div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center font-black text-3xl shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            {user?.name?.[0] || 'U'}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white flex items-center gap-2 tracking-tight">
              {user?.name}
            </h1>
            <p className="text-sm text-slate-400 flex items-center gap-2 mt-1 font-medium">
              <Mail className="w-4 h-4 text-slate-500" /> {user?.email}
            </p>
            <div className="pt-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${isAdmin
                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-[0_0_10px_rgba(37,99,235,0.1)]'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                  }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> {user?.role} Account
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'profile'
              ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-[0_0_15px_rgba(37,99,235,0.15)]'
              : 'text-slate-400 hover:text-white glass-panel hover:bg-white/5 border border-transparent'
            }`}
        >
          <User className="w-4 h-4" /> Profile Info
        </button>

        <button
          onClick={() => setActiveTab('permissions')}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'permissions'
              ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-[0_0_15px_rgba(37,99,235,0.15)]'
              : 'text-slate-400 hover:text-white glass-panel hover:bg-white/5 border border-transparent'
            }`}
        >
          <Shield className="w-4 h-4" /> Role Permissions
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'security'
              ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-[0_0_15px_rgba(37,99,235,0.15)]'
              : 'text-slate-400 hover:text-white glass-panel hover:bg-white/5 border border-transparent'
            }`}
        >
          <KeyRound className="w-4 h-4" /> Security
        </button>
      </div>

      {/* Tab 1: Profile Info */}
      {activeTab === 'profile' && (
        <div className="p-8 rounded-3xl glass-panel-elevated space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-brand-400" /> Account Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 shadow-inner">
              <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-brand-400" /> Unique User ID
              </div>
              <div className="font-mono text-slate-200 text-sm truncate">{user?._id}</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 shadow-inner">
              <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" /> Registration Date
              </div>
              <div className="font-medium text-slate-200">{formatDate(user?.createdAt)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Role Permissions */}
      {activeTab === 'permissions' && (
        <div className="p-8 rounded-3xl glass-panel-elevated space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <Shield className="w-6 h-6 text-brand-400" />
            <h2 className="text-lg font-bold text-white">System Role Capabilities</h2>
          </div>

          <p className="text-xs text-slate-400">
            Your account is assigned the <strong className="text-white capitalize">{user?.role}</strong> role. Backend authorization middleware enforces these privileges on all API endpoints.
          </p>

          <div className="space-y-2.5 pt-2">
            {permissions.map((perm, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{perm}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Security */}
      {activeTab === 'security' && (
        <div className="p-8 rounded-3xl glass-panel-elevated space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <KeyRound className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Security & Authentication</h2>
          </div>

          <div className="space-y-4 text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 shadow-inner">
              <span className="font-bold text-white">Password Encryption:</span> Passwords are hashed using bcrypt with salt rounds before database storage.
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 shadow-inner">
              <span className="font-bold text-white">Session Security:</span> JSON Web Tokens (JWT) expire automatically after 7 days.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
