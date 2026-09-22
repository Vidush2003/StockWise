import { ArrowRight, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MockChart, MockTableRow } from './UIFragments';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 z-0"></div>
      <div className="ambient-glow top-0 left-1/2 -translate-x-1/2 z-0"></div>
      <div className="ambient-glow bottom-0 right-[-10%] translate-y-1/2 z-0 bg-indigo-500/10"></div>

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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2 group"
          >
            Start Managing Inventory
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 glass-panel text-white rounded-xl font-medium hover:bg-white/5 transition-colors flex items-center justify-center"
          >
            Explore Features
          </a>
        </div>

        {/* Dashboard Preview Presentation */}
        <div className="relative mx-auto max-w-5xl">
          {/* Floating Data Fragments */}
          <div className="hidden lg:block absolute -left-12 top-20 z-20 glass-panel-elevated p-4 rounded-xl animate-float-delayed">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-400 font-medium">Stock Value</p>
                <p className="text-lg font-bold">₹15.6L</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute -right-8 bottom-32 z-20 glass-panel-elevated p-4 rounded-xl animate-float">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-rose-400" />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-400 font-medium">Attention Required</p>
                <p className="text-sm font-bold text-rose-400">3 Items Low Stock</p>
              </div>
            </div>
          </div>

          {/* Main Dashboard Mock */}
          <div className="glass-panel-elevated rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden relative">
            {/* Mock Header */}
            <div className="h-12 border-b border-slate-700/50 flex items-center px-4 gap-2 bg-slate-900/50">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>

            {/* Mock Content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-900">
              {/* Sidebar Mock */}
              <div className="hidden md:flex flex-col gap-2 border-r border-slate-800 pr-6">
                <div className="h-8 flex items-center gap-3 text-brand-400 bg-brand-500/10 px-3 rounded-lg mb-4">
                  <div className="w-4 h-4 rounded bg-brand-500"></div>
                  <span className="text-sm font-semibold">Dashboard</span>
                </div>
                {['Products', 'Inventory', 'Analytics', 'Settings'].map(item => (
                  <div key={item} className="h-8 flex items-center px-3 text-slate-400 hover:text-slate-200 transition-colors cursor-default">
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Main Area Mock */}
              <div className="md:col-span-3 flex flex-col gap-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* KPI Cards */}
                  <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 relative overflow-hidden group hover:border-slate-600 transition-colors">
                    <div className="absolute right-0 top-0 w-16 h-16 bg-brand-500/10 rounded-bl-full"></div>
                    <p className="text-xs text-slate-400 font-medium mb-1 relative z-10">Total Items</p>
                    <p className="text-2xl font-bold relative z-10">2,405</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 relative overflow-hidden group hover:border-slate-600 transition-colors">
                    <div className="absolute right-0 top-0 w-16 h-16 bg-amber-500/10 rounded-bl-full"></div>
                    <p className="text-xs text-slate-400 font-medium mb-1 relative z-10">Low Stock</p>
                    <p className="text-2xl font-bold text-amber-400 relative z-10">12</p>
                  </div>
                  <div className="hidden md:block bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 relative overflow-hidden group hover:border-slate-600 transition-colors">
                    <div className="absolute right-0 top-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full"></div>
                    <p className="text-xs text-slate-400 font-medium mb-1 relative z-10">Stock Value</p>
                    <p className="text-2xl font-bold text-emerald-400 relative z-10">₹45.2L</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 flex flex-col">
                    <p className="text-xs text-slate-400 font-medium mb-4">Inventory Health</p>
                    <div className="flex-1 h-32 opacity-70">
                      <MockChart />
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
                    <p className="text-xs text-slate-400 font-medium mb-4">Critical Items</p>
                    <div className="space-y-1">
                      <MockTableRow name="Mechanical Keyboard" sku="SKU-MK-02" stock={3} status="Low Stock" />
                      <MockTableRow name="Ergo Mouse" sku="SKU-EM-01" stock={0} status="Out of Stock" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
