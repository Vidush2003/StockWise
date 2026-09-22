import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Key, CheckCircle } from 'lucide-react';

const TrustAndCTASection = () => {
  return (
    <React.Fragment>
      {/* Security & Trust Section */}
      <section id="security" className="py-24 relative z-10 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ambient-glow bg-brand-500/5"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              SECURE BY DESIGN.
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-lg">
              Your inventory data is the lifeblood of your operation. We protect it with enterprise-grade security protocols.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-300">JWT-based Authentication</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-300">Role-Based Access Control</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-300">Immutable Audit Logs</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-300">Encrypted Credentials</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full">
            <div className="glass-panel-elevated p-6 rounded-2xl border border-slate-700/50 shadow-2xl relative z-10 max-w-md mx-auto">
              <div className="flex justify-between items-center mb-6">
                <Lock className="w-8 h-8 text-brand-400" />
                <div className="px-2 py-1 rounded text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  STATUS: SECURE
                </div>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="p-3 bg-slate-900 rounded-lg flex justify-between items-center text-slate-400">
                  <span>auth_token</span>
                  <span className="text-slate-600">eyJhbGciOiJIUzI1...</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg flex justify-between items-center text-slate-400">
                  <span>user_role</span>
                  <span className="text-brand-400">admin</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg flex justify-between items-center text-slate-400">
                  <span>encryption</span>
                  <span className="text-emerald-400">bcrypt_10</span>
                </div>
              </div>
            </div>

            {/* Background floating icons */}
            <Key className="absolute -top-10 -right-10 w-32 h-32 text-slate-800 rotate-12 opacity-50" />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative z-10 px-6">
        <div className="max-w-4xl mx-auto glass-panel-elevated rounded-3xl p-12 md:p-20 text-center relative overflow-hidden group border border-slate-700/50 shadow-2xl hover:border-brand-500/30 transition-colors duration-500">

          {/* Decorative mesh background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-600/20 rounded-full blur-[100px] group-hover:bg-brand-500/30 transition-colors duration-700 pointer-events-none"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] group-hover:bg-indigo-500/30 transition-colors duration-700 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white">
              YOUR INVENTORY.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                UNDER CONTROL.
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Join modern teams that use StockWise to manage their supply chain with precision and confidence.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default TrustAndCTASection;
