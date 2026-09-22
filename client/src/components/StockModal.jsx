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
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-800">
          <div
            className={`p-3 rounded-xl border ${isStockOut
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}
          >
            {isStockOut ? <ArrowDownRight className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              {isStockOut ? `Stock Out — ${product.name}` : `Stock In — ${product.name}`}
            </h2>
            <p className="text-xs text-slate-400">
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
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Stock Calculation Preview Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-2">
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
            <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-white">
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
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || isExceeding}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-xl transition-colors shadow-lg disabled:opacity-50 ${isStockOut
                  ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
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
