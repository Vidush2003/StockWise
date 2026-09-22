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
      <div className="p-6 rounded-xl border border-slate-800 bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-2xl shadow-xl shadow-blue-500/20">
            {user?.name?.[0] || 'U'}
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              {user?.name}
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" /> {user?.email}
            </p>
            <div className="pt-1">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isAdmin
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> {user?.role} Account
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === 'profile'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
        >
          <User className="w-4 h-4" /> Profile Info
        </button>

        <button
          onClick={() => setActiveTab('permissions')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === 'permissions'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
        >
          <Shield className="w-4 h-4" /> Role Permissions
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === 'security'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
        >
          <KeyRound className="w-4 h-4" /> Security
        </button>
      </div>

      {/* Tab 1: Profile Info */}
      {activeTab === 'profile' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-400" /> Account Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" /> Unique User ID
              </div>
              <div className="font-mono text-slate-200 text-xs truncate">{user?._id}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Registration Date
              </div>
              <div className="font-medium text-slate-200">{formatDate(user?.createdAt)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Role Permissions */}
      {activeTab === 'permissions' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <Shield className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-bold text-white">System Role Capabilities</h2>
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
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <KeyRound className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Security & Authentication</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-white">Password Encryption:</span> Passwords are hashed using bcrypt with salt rounds before database storage.
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-white">Session Security:</span> JSON Web Tokens (JWT) expire automatically after 7 days.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
