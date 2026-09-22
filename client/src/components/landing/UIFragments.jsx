import React from 'react';

// Mock UI elements used in Bento Grid and showcases

export const MockTableRow = ({ name, sku, stock, status }) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-800/50 last:border-0">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
        {name.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-200">{name}</p>
        <p className="text-xs text-slate-500">{sku}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium text-slate-200">{stock}</p>
      <p className={`text-xs ${
        status === 'In Stock' ? 'text-emerald-400' :
        status === 'Low Stock' ? 'text-amber-400' : 'text-rose-400'
      }`}>{status}</p>
    </div>
  </div>
);

export const MockChart = () => (
  <div className="w-full h-full flex items-end gap-2 px-2 pt-4 relative">
    {/* Axes & Grid */}
    <div className="absolute inset-0 border-b border-l border-slate-700/50"></div>
    <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
      <div className="w-full h-px bg-slate-800/50"></div>
      <div className="w-full h-px bg-slate-800/50"></div>
      <div className="w-full h-px bg-slate-800/50"></div>
    </div>
    
    {[40, 60, 45, 80, 55, 90, 75, 100].map((height, i) => (
      <div key={i} className="flex-1 bg-brand-500/20 rounded-t-sm relative group overflow-visible z-10" style={{ height: `${height}%` }}>
        <div className="absolute bottom-0 left-0 right-0 bg-brand-500 rounded-t-sm transition-all duration-500 ease-out group-hover:h-full" style={{ height: '40%' }}></div>
        
        {/* Mock Tooltip on a specific bar */}
        {i === 5 && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold py-1 px-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-700/50 z-20">
            ₹8.4L
          </div>
        )}
      </div>
    ))}
  </div>
);

export const MockBadge = ({ label, type }) => {
  const colors = {
    success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/20',
    danger: 'bg-rose-500/20 text-rose-400 border-rose-500/20',
    info: 'bg-brand-500/20 text-brand-400 border-brand-500/20',
  };
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${colors[type]}`}>
      {label}
    </span>
  );
};

export const MockAuditLog = ({ time, action, item, isLatest }) => (
  <div className={`flex gap-4 relative ${!isLatest ? 'opacity-50' : ''}`}>
    {!isLatest && <div className="absolute left-2 top-6 bottom-[-16px] w-0.5 bg-slate-800"></div>}
    <div className="mt-1 relative z-10">
      <div className={`w-4 h-4 rounded-full border-2 border-slate-900 ${
        action === 'IN' ? 'bg-emerald-500' :
        action === 'OUT' ? 'bg-brand-500' : 'bg-amber-500'
      }`}></div>
    </div>
    <div className="pb-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs text-slate-500 font-mono">{time}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
          action === 'IN' ? 'bg-emerald-500/20 text-emerald-400' :
          action === 'OUT' ? 'bg-brand-500/20 text-brand-400' : 'bg-amber-500/20 text-amber-400'
        }`}>
          STOCK {action}
        </span>
      </div>
      <p className="text-sm text-slate-300">{item}</p>
    </div>
  </div>
);
