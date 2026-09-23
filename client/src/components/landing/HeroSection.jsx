import { ArrowRight, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MockChart, MockTableRow } from './UIFragments';

const HeroSection = ({ onOpenAuth }) => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-visible">
      {/* Background elements (Localized to Hero) */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-600/15 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-sm text-brand-100 font-medium mb-8 animate-float">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow"></span>
          StockWise 2.0 is live
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          KNOW YOUR STOCK.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            MOVE WITH CONFIDENCE.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          The modern inventory platform that visualizes your stock health in real-time.
          Stop guessing. Start managing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => onOpenAuth('register')}
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2 group"
          >
            Start Managing Inventory
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 glass-panel text-white rounded-xl font-medium hover:bg-white/5 transition-colors flex items-center justify-center"
          >
            Explore Features
          </a>
        </div>

        {/* Dashboard Preview Presentation */}
        <div className="relative mx-auto max-w-[1050px] mt-12 mb-10 overflow-visible">
          
          {/* Ambient Background Glow (z-index: 0) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

          {/* Main Composition Container */}
          <div className="relative w-full z-10 overflow-visible">
            
            {/* Dashboard Frame (z-index: 10, overflow: hidden) */}
            <div className="glass-panel-elevated rounded-xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden relative bg-slate-900/95 backdrop-blur-xl z-10">
              
              {/* Premium Window Frame */}
              <div className="h-12 border-b border-white/5 flex items-center justify-center px-6 bg-slate-950/80 relative z-20">
                <div className="absolute left-6 flex gap-2 opacity-30">
                  <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                </div>
                <span className="text-[11px] font-mono text-slate-500 tracking-[0.2em] uppercase">StockWise Console</span>
              </div>

              {/* Dashboard Content (z-index: 11) */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8 bg-transparent relative z-11">
                {/* Sidebar Mock */}
                <div className="hidden md:flex flex-col gap-3 border-r border-white/10 pr-8">
                  <div className="h-10 flex items-center gap-3 text-brand-400 bg-brand-500/10 px-4 rounded-xl mb-6 shadow-inner">
                    <div className="w-4 h-4 rounded-md bg-brand-500 shadow-[0_0_12px_rgba(37,99,235,0.6)]"></div>
                    <span className="text-sm font-bold">Dashboard</span>
                  </div>
                  {['Inventory', 'Products', 'Analytics', 'Settings'].map(item => (
                    <div key={item} className="h-10 flex items-center px-4 text-slate-400 hover:text-slate-200 transition-colors cursor-default">
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Main Area Mock */}
                <div className="md:col-span-3 flex flex-col gap-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {/* KPI Cards */}
                    <div className="bg-slate-950/60 rounded-2xl border border-white/5 p-5 relative overflow-hidden shadow-inner">
                      <div className="absolute right-0 top-0 w-20 h-20 bg-brand-500/10 rounded-bl-full pointer-events-none"></div>
                      <p className="text-xs text-slate-400 font-medium mb-2 relative z-10">Total Items</p>
                      <p className="text-3xl font-bold relative z-10 text-white">2,405</p>
                    </div>
                    <div className="bg-slate-950/60 rounded-2xl border border-white/5 p-5 relative overflow-hidden shadow-inner">
                      <div className="absolute right-0 top-0 w-20 h-20 bg-amber-500/10 rounded-bl-full pointer-events-none"></div>
                      <p className="text-xs text-slate-400 font-medium mb-2 relative z-10">Low Stock</p>
                      <p className="text-3xl font-bold text-amber-400 relative z-10">12</p>
                    </div>
                    <div className="hidden md:block bg-slate-950/60 rounded-2xl border border-white/5 p-5 relative overflow-hidden shadow-inner">
                      <div className="absolute right-0 top-0 w-20 h-20 bg-emerald-500/10 rounded-bl-full pointer-events-none"></div>
                      <p className="text-xs text-slate-400 font-medium mb-2 relative z-10">Stock Value</p>
                      <p className="text-3xl font-bold text-emerald-400 relative z-10">₹45.2L</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-950/60 rounded-2xl border border-white/5 p-6 flex flex-col shadow-inner">
                      <p className="text-sm text-slate-400 font-medium mb-6">Inventory Health</p>
                      <div className="flex-1 h-36 opacity-80">
                        <MockChart />
                      </div>
                    </div>
                    <div className="bg-slate-950/60 rounded-2xl border border-white/5 p-6 shadow-inner">
                      <p className="text-sm text-slate-400 font-medium mb-6">Critical Items</p>
                      <div className="space-y-2">
                        <MockTableRow name="Mechanical Keyboard" sku="SKU-MK-02" stock={3} status="Low Stock" />
                        <MockTableRow name="Ergo Mouse" sku="SKU-EM-01" stock={0} status="Out of Stock" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards (z-index: 30) - Siblings to Dashboard Frame */}
            
            {/* Left Floating Card: Stock Value */}
            <div className="hidden lg:flex absolute -left-10 top-20 z-30 glass-panel-elevated p-4 rounded-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-slate-900/95 backdrop-blur-xl items-center gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl shadow-inner">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-left pr-4">
                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mb-1">Stock Value</p>
                <p className="text-xl font-bold text-white leading-none">₹45.2L</p>
              </div>
            </div>

            {/* Right Floating Card: Action Needed */}
            <div className="hidden lg:flex absolute -right-10 bottom-24 z-30 glass-panel-elevated p-4 rounded-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-slate-900/95 backdrop-blur-xl items-center gap-4">
              <div className="p-3 bg-amber-500/20 rounded-xl shadow-inner">
                <AlertCircle className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-left pr-4">
                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mb-1">Action Needed</p>
                <p className="text-xl font-bold text-amber-400 leading-none">12 Low Stock</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
