import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue' }) => {
  const colorMap = {
    blue: {
      bg: 'bg-slate-900 border-slate-800',
      iconBg: 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
    },
    emerald: {
      bg: 'bg-slate-900 border-slate-800',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    },
    amber: {
      bg: 'bg-slate-900 border-slate-800',
      iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
    },
    rose: {
      bg: 'bg-slate-900 border-slate-800',
      iconBg: 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
    }
  };

  const selectedColor = colorMap[color] || colorMap.blue;

  return (
    <div className={`relative p-5 rounded-xl border ${selectedColor.bg} transition-all duration-200 hover:border-slate-700 hover:shadow-lg hover:shadow-black/20`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">{value}</h3>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${selectedColor.iconBg}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
