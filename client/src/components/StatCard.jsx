import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue' }) => {
  const colorMap = {
    blue: {
      bg: 'glass-panel-elevated hover:border-brand-500/30 shadow-xl',
      iconBg: 'bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-[0_0_15px_rgba(37,99,235,0.2)]'
    },
    emerald: {
      bg: 'glass-panel-elevated hover:border-emerald-500/30 shadow-xl',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
    },
    amber: {
      bg: 'glass-panel-elevated hover:border-amber-500/30 shadow-xl',
      iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
    },
    rose: {
      bg: 'glass-panel-elevated hover:border-rose-500/30 shadow-xl',
      iconBg: 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
    }
  };

  const selectedColor = colorMap[color] || colorMap.blue;

  return (
    <div className={`relative p-6 rounded-3xl ${selectedColor.bg} transition-all duration-300 group`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{title}</p>
          <h3 className="text-3xl font-black tracking-tight text-white group-hover:scale-105 transition-transform origin-left">{value}</h3>
          {subtitle && <p className="mt-2 text-xs font-medium text-slate-500">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-4 rounded-2xl ${selectedColor.iconBg} transition-transform group-hover:-translate-y-1`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
