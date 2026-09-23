import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Key, CheckCircle } from 'lucide-react';

const TrustAndCTASection = ({ onOpenAuth }) => {
  return (
    <React.Fragment>
      {/* Security & Trust Section */}
      <section id="security" className="py-32 relative z-10 px-6">
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none z-0"></div>
            <div className="glass-panel-elevated p-6 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative z-10 max-w-md mx-auto bg-slate-900/50 backdrop-blur-xl">
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
        <div className="max-w-5xl mx-auto rounded-3xl p-8 md:p-12 relative overflow-visible group">
          
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/15 via-transparent to-transparent pointer-events-none -m-32"></div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none transition-all duration-700 group-hover:bg-brand-500/15"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            
            {/* LEFT COLUMN: Copy & CTA */}
            <div className="flex-1 text-left">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white drop-shadow-lg">
                YOUR INVENTORY.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  UNDER CONTROL.
                </span>
              </h2>
              <p className="text-slate-400 text-base md:text-lg mb-8 max-w-md font-medium">
                Experience the precision of StockWise. Command your supply chain, track assets in real-time, and eliminate stockouts forever.
              </p>
              
              <button
                onClick={() => onOpenAuth('register')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-brand-600 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-all hover:-translate-y-1 group/btn border border-brand-400/30"
              >
                Start Managing Inventory
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* RIGHT COLUMN: UI Preview */}
            <div className="flex-1 w-full max-w-sm relative">
              {/* Floating UI Card */}
              <div className="glass-panel-elevated rounded-2xl border border-white/10 p-6 shadow-2xl relative z-10 backdrop-blur-2xl bg-slate-900/60 transform transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-1">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="text-white font-bold text-lg tracking-tight">Inventory Health</h4>
                    <p className="text-xs text-slate-400 mt-1 font-medium">Real-time system status</p>
                  </div>
                  <div className="relative w-14 h-14 rounded-full border-[3px] border-emerald-500/20 flex items-center justify-center bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-emerald-500"
                        strokeDasharray="92, 100"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-emerald-400 font-bold text-sm relative z-10">92%</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/50 border border-white/5 shadow-inner">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                      <span className="text-sm font-semibold text-slate-300">Total Products</span>
                    </div>
                    <span className="text-white font-bold font-mono">19</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/50 border border-white/5 shadow-inner">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
                      <span className="text-sm font-semibold text-slate-300">Low Stock</span>
                    </div>
                    <span className="text-white font-bold font-mono">3</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative background elements behind UI card */}
              <div className="absolute -bottom-10 -right-10 w-full h-full bg-indigo-600/20 rounded-full blur-[80px] -z-10 group-hover:bg-indigo-500/30 transition-colors duration-700"></div>
            </div>

          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default TrustAndCTASection;
