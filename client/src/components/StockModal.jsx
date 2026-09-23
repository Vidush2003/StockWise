import React, { useState, useEffect } from 'react';
import { X, ArrowDownRight, ArrowUpRight, ShieldAlert } from 'lucide-react';

const StockModal = ({ isOpen, onClose, onSubmit, product, mode = 'IN' }) => {
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQuantity('');
    setReason('');
    setError('');
  }, [product, mode, isOpen]);

  if (!isOpen || !product) return null;

  const currentStock = product.quantity || 0;
  const numQty = Number(quantity) || 0;
  const isStockOut = mode === 'OUT';

  const newStock = isStockOut ? currentStock - numQty : currentStock + numQty;
  const isExceeding = isStockOut && numQty > currentStock;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!numQty || numQty <= 0) {
      setError('Please enter a positive whole quantity');
      return;
    }

    if (isExceeding) {
      setError(`Cannot remove ${numQty} units. Only ${currentStock} units available.`);
      return;
    }

    if (!reason.trim()) {
      setError('Please specify a reason for this inventory movement');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit(product._id, numQty, reason.trim());
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update stock');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel-elevated border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden backdrop-blur-3xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10 relative z-10">
          <div
            className={`p-3 rounded-xl border ${isStockOut
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}
          >
            {isStockOut ? <ArrowDownRight className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {isStockOut ? `Stock Out — ${product.name}` : `Stock In — ${product.name}`}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              SKU: <span className="font-mono text-slate-300">{product.sku}</span> | Current Stock: {' '}
              <span className="font-bold text-white">{currentStock} {product.unit || 'pcs'}</span>
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quantity Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              {isStockOut ? 'Remove Quantity *' : 'Add Quantity *'}
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 5"
              className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-white focus:border-brand-500 focus:outline-none shadow-inner"
            />
          </div>

          {/* Stock Calculation Preview Card */}
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 text-xs space-y-3 shadow-inner relative z-10">
            <div className="flex justify-between text-slate-400">
              <span>Previous Stock:</span>
              <span className="font-medium text-slate-200">{currentStock} {product.unit || 'pcs'}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>{isStockOut ? 'Requested Issue:' : 'Incoming Intake:'}</span>
              <span className={`font-semibold ${isStockOut ? 'text-amber-400' : 'text-emerald-400'}`}>
                {isStockOut ? `- ${numQty}` : `+ ${numQty}`} {product.unit || 'pcs'}
              </span>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-between font-bold text-sm text-white">
              <span>Calculated New Stock:</span>
              <span className={isExceeding ? 'text-rose-400' : 'text-blue-400'}>
                {newStock} {product.unit || 'pcs'}
              </span>
            </div>
          </div>

          {/* Reason Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Reason / Reference *
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={isStockOut ? 'e.g. Customer sale, Internal issue' : 'e.g. Supplier shipment #PO-4021'}
              className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-white focus:border-brand-500 focus:outline-none shadow-inner"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-6 flex items-center justify-end gap-4 border-t border-white/10 mt-8 relative z-10">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-3 text-sm font-bold text-slate-300 glass-panel hover:bg-white/10 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || isExceeding}
              className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-xl transition-all disabled:opacity-50 ${isStockOut
                  ? 'bg-amber-600 hover:bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                }`}
            >
              {loading ? 'Processing...' : isStockOut ? 'Confirm Stock Out' : 'Confirm Stock In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockModal;
