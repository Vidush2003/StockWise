import React from 'react';
import { formatDate } from '../utils/formatters';
import { ArrowUpRight, ArrowDownRight, RefreshCw, UserCheck } from 'lucide-react';

const TransactionTable = ({ transactions = [] }) => {
  const getTypeStyle = (type) => {
    switch (type) {
      case 'STOCK_IN':
        return {
          label: 'STOCK IN',
          badgeClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
          icon: ArrowUpRight
        };
      case 'STOCK_OUT':
        return {
          label: 'STOCK OUT',
          badgeClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
          icon: ArrowDownRight
        };
      default:
        return {
          label: type,
          badgeClass: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
          icon: RefreshCw
        };
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase text-[11px] tracking-wider">
            <th className="py-4 px-5">Date & Time</th>
            <th className="py-4 px-4">Product / SKU</th>
            <th className="py-4 px-4 text-center">Type</th>
            <th className="py-4 px-4 text-right">Quantity</th>
            <th className="py-4 px-4 text-center">Stock Audit</th>
            <th className="py-4 px-5">Reason / Reference</th>
            <th className="py-4 px-5 text-right">Performed By</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-slate-300">
          {transactions.map((tx) => {
            const { label, badgeClass, icon: Icon } = getTypeStyle(tx.type);
            const isOut = tx.type === 'STOCK_OUT';

            return (
              <tr key={tx._id} className="hover:bg-slate-800/40 transition-colors">
                {/* Date */}
                <td className="py-4 px-5 text-xs text-slate-400 whitespace-nowrap">
                  {formatDate(tx.createdAt)}
                </td>

                {/* Product Name & SKU */}
                <td className="py-4 px-4">
                  <div className="font-semibold text-white">
                    {tx.product?.name || 'Deleted Product'}
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {tx.product?.sku || 'N/A'}
                  </div>
                </td>

                {/* Type Badge */}
                <td className="py-4 px-4 text-center whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </span>
                </td>

                {/* Quantity */}
                <td className="py-4 px-4 text-right font-bold text-white">
                  <span className={isOut ? 'text-amber-400' : 'text-emerald-400'}>
                    {isOut ? `- ${tx.quantity}` : `+ ${tx.quantity}`}
                  </span>
                </td>

                {/* Stock Audit: Previous -> New */}
                <td className="py-4 px-4 text-center text-xs font-mono">
                  <span className="text-slate-400">{tx.previousQuantity}</span>
                  <span className="mx-1 text-slate-600">→</span>
                  <span className="font-bold text-white">{tx.newQuantity}</span>
                </td>

                {/* Reason */}
                <td className="py-4 px-5 text-xs text-slate-300 max-w-xs truncate">
                  {tx.reason}
                </td>

                {/* Performed By */}
                <td className="py-4 px-5 text-right text-xs">
                  <div className="inline-flex items-center gap-1.5 font-medium text-slate-200">
                    <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                    {tx.performedBy?.name || 'System'}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                    {tx.performedBy?.role || ''}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
