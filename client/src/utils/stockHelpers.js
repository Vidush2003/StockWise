export const getStockStatus = (quantity, minimumStock = 5) => {
  const qty = Number(quantity) || 0;
  const min = Number(minimumStock) || 0;
  if (qty <= 0) return 'OUT_OF_STOCK';
  if (qty <= min) return 'LOW_STOCK';
  return 'IN_STOCK';
};

export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'IN_STOCK':
      return {
        label: 'In Stock',
        badgeClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]',
        dotClass: 'bg-emerald-400'
      };
    case 'LOW_STOCK':
      return {
        label: 'Low Stock',
        badgeClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)]',
        dotClass: 'bg-amber-400'
      };
    case 'OUT_OF_STOCK':
      return {
        label: 'Out of Stock',
        badgeClass: 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.15)]',
        dotClass: 'bg-rose-400'
      };
    default:
      return {
        label: status,
        badgeClass: 'bg-slate-500/10 text-slate-400 border border-slate-500/20 shadow-[0_0_10px_rgba(148,163,184,0.15)]',
        dotClass: 'bg-slate-400'
      };
  }
};
