import React from 'react';
import { MockTableRow, MockChart, MockAuditLog } from './UIFragments';
import { Shield, Zap, Search } from 'lucide-react';

const BentoGrid = () => {
  return (
    <section id="features" className="py-32 relative z-10 px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-brand-500/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            EVERYTHING YOU NEED.<br />
            <span className="text-slate-400">NOTHING YOU DON'T.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            StockWise combines beautiful design with powerful inventory capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

          {/* Bento Box 1: Product Management (Spans 2 cols on Desktop) */}
          <div className="md:col-span-2 glass-panel-elevated rounded-3xl p-8 relative overflow-hidden group">
            <div className="relative z-20 md:w-[40%]">
              <h3 className="text-xl font-bold mb-2">Centralized Catalog</h3>
              <p className="text-slate-400 text-sm max-w-sm">Manage all your products, SKUs, and variants in one lightning-fast interface.</p>
            </div>

            {/* Visual Preview */}
            <div className="absolute right-0 bottom-0 w-[85%] md:w-[60%] bg-slate-900/80 backdrop-blur-xl rounded-tl-xl border-l border-t border-white/10 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2">
              <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Product</span>
                <span>Status</span>
              </div>
              <MockTableRow name="MacBook Pro 16" sku="SKU-AP-MBP" stock={42} status="In Stock" />
              <MockTableRow name="Keychron K8" sku="SKU-KC-K8" stock={5} status="Low Stock" />
              <MockTableRow name="Logitech MX Master" sku="SKU-LG-MX" stock={0} status="Out of Stock" />
            </div>
          </div>

          {/* Bento Box 2: Real-time Analytics */}
          <div className="glass-panel-elevated rounded-3xl p-8 relative overflow-hidden group">
            <div className="relative z-20 mb-8">
              <h3 className="text-xl font-bold mb-2">Value Insights</h3>
              <p className="text-slate-400 text-sm">Real-time valuation of your entire inventory.</p>
            </div>

            <div className="absolute inset-x-4 bottom-0 h-32 opacity-80 group-hover:opacity-100 transition-opacity z-10">
              <MockChart />
            </div>
          </div>

          {/* Bento Box 3: Search */}
          <div className="glass-panel-elevated rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Search</h3>
              <p className="text-slate-400 text-sm">Find any product instantly.</p>
            </div>

            <div className="w-full bg-slate-900/50 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex items-center gap-2 group-hover:border-brand-500/50 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all">
              <Search className="w-4 h-4 text-brand-400 group-hover:text-brand-300" />
              <span className="text-sm text-slate-300">Type-C Cable<span className="animate-pulse">|</span></span>
            </div>
          </div>

          {/* Bento Box 4: Audit Trail (Spans 2 cols) */}
          <div className="md:col-span-2 glass-panel-elevated rounded-3xl p-8 relative overflow-hidden group">
            <div className="relative z-10 md:w-1/2">
              <h3 className="text-xl font-bold mb-2">Immutable Audit Trail</h3>
              <p className="text-slate-400 text-sm mb-6">Every stock addition, removal, and adjustment is logged with timestamps and user attribution.</p>

              <div className="flex items-center gap-2 text-sm font-medium text-brand-400 group-hover:text-brand-300 transition-colors cursor-pointer">
                View Documentation &rarr;
              </div>
            </div>

            {/* Visual Preview */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-64 h-fit bg-slate-900/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hidden md:block shadow-[0_10px_30px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-500">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Recent Activity</div>
              <MockAuditLog time="10:42 AM" action="IN" item="+50 USB-C Adapters" isLatest={true} />
              <MockAuditLog time="09:15 AM" action="OUT" item="-2 MacBook Pro 16" />
              <MockAuditLog time="Yesterday" action="ADJ" item="Inventory Audit" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
