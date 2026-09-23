import React, { useState, useRef, useEffect } from 'react';
import { Eye, Edit3, Trash2, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatCurrency } from '../utils/formatters';

const ProductRow = ({ product, isAdmin, onView, onEdit, onDelete, onStockIn, onStockOut }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <tr className="hover:bg-white/5 transition-colors group">
      {/* Product Name */}
      <td className="py-4 px-5">
        <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
          {product.name}
        </div>
        <div className="text-xs text-slate-500 truncate max-w-xs">
          {product.supplierName ? `Supplier: ${product.supplierName}` : ''}
        </div>
      </td>

      {/* SKU */}
      <td className="py-4 px-4 font-mono text-xs text-slate-400">
        {product.sku}
      </td>

      {/* Category */}
      <td className="py-4 px-4">
        <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/50">
          {product.category}
        </span>
      </td>

      {/* Price */}
      <td className="py-4 px-4 text-right font-medium text-white">
        {formatCurrency(product.price)}
      </td>

      {/* Stock */}
      <td className="py-4 px-4 text-center font-bold text-white">
        {product.quantity} <span className="text-xs font-normal text-slate-400">{product.unit || 'pcs'}</span>
      </td>

      {/* Status */}
      <td className="py-4 px-4 text-center">
        <StatusBadge status={product.status} />
      </td>

      {/* Actions */}
      <td className="py-4 px-5 text-right relative">
        <div className="inline-flex items-center justify-end w-full" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-8 top-8 w-48 glass-panel-elevated border border-white/10 rounded-2xl shadow-2xl z-50 py-2 overflow-hidden backdrop-blur-3xl">
              <button
                onClick={() => { setMenuOpen(false); onView(product._id); }}
                className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2"
              >
                <Eye className="w-4 h-4" /> View Details
              </button>
              <button
                onClick={() => { setMenuOpen(false); onStockIn(product); }}
                className="w-full text-left px-4 py-2 text-sm text-emerald-400 hover:bg-slate-700 flex items-center gap-2"
              >
                <ArrowUpRight className="w-4 h-4" /> Stock In
              </button>
              <button
                onClick={() => { setMenuOpen(false); onStockOut(product); }}
                className="w-full text-left px-4 py-2 text-sm text-amber-400 hover:bg-slate-700 flex items-center gap-2"
              >
                <ArrowDownRight className="w-4 h-4" /> Stock Out
              </button>

              {isAdmin && (
                <>
                  <div className="h-px bg-slate-700/50 my-1 mx-2"></div>
                  <button
                    onClick={() => { setMenuOpen(false); onEdit(product); }}
                    className="w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-slate-700 flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Specs
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); onDelete(product); }}
                    className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-slate-700 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

const ProductTable = ({
  products = [],
  isAdmin = false,
  onView,
  onEdit,
  onDelete,
  onStockIn,
  onStockOut
}) => {
  return (
    <div className="w-full rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl overflow-visible">
      <div className="w-full overflow-x-auto overflow-y-visible">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-slate-950/40 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              <th className="py-4 px-5">Product</th>
              <th className="py-4 px-4">SKU</th>
              <th className="py-4 px-4">Category</th>
              <th className="py-4 px-4 text-right">Price</th>
              <th className="py-4 px-4 text-center">Stock</th>
              <th className="py-4 px-4 text-center">Status</th>
              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {products.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                isAdmin={isAdmin}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onStockIn={onStockIn}
                onStockOut={onStockOut}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
