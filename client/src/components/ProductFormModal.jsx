import React, { useState, useEffect } from 'react';
import { X, Save, PackagePlus, Edit3 } from 'lucide-react';

const ProductFormModal = ({ isOpen, onClose, onSubmit, initialData = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    minimumStock: 5,
    unit: 'pcs',
    supplierName: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData && isEditing) {
      setFormData({
        name: initialData.name || '',
        sku: initialData.sku || '',
        category: initialData.category || '',
        description: initialData.description || '',
        price: initialData.price ?? '',
        quantity: initialData.quantity ?? '',
        minimumStock: initialData.minimumStock ?? 5,
        unit: initialData.unit || 'pcs',
        supplierName: initialData.supplierName || ''
      });
    } else {
      setFormData({
        name: '',
        sku: '',
        category: '',
        description: '',
        price: '',
        quantity: 0,
        minimumStock: 5,
        unit: 'pcs',
        supplierName: ''
      });
    }
    setErrors({});
  }, [initialData, isEditing, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product name is required';
    if (!formData.sku.trim()) errs.sku = 'SKU is required';
    if (!formData.category.trim()) errs.category = 'Category is required';
    if (formData.price === '' || Number(formData.price) < 0) errs.price = 'Valid non-negative price is required';
    if (formData.minimumStock === '' || Number(formData.minimumStock) < 0) errs.minimumStock = 'Minimum stock cannot be negative';
    if (!isEditing && (formData.quantity === '' || Number(formData.quantity) < 0)) errs.quantity = 'Initial quantity cannot be negative';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        minimumStock: Number(formData.minimumStock)
      });
      onClose();
    } catch (err) {
      setErrors({ server: err.response?.data?.message || 'Failed to save product' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel-elevated border border-white/10 rounded-3xl p-8 shadow-2xl my-8 overflow-hidden backdrop-blur-3xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10 relative z-10">
          <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
            {isEditing ? <Edit3 className="w-6 h-6" /> : <PackagePlus className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {isEditing ? 'Edit Product Specifications' : 'Add New Product'}
            </h2>
            <p className="text-xs font-medium text-slate-400 mt-1">
              {isEditing ? 'Update stock parameters & details' : 'Enter product catalog details & initial stock'}
            </p>
          </div>
        </div>

        {errors.server && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Wireless Mouse"
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-white focus:border-brand-500 focus:outline-none shadow-inner"
              />
              {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
            </div>

            {/* SKU */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                SKU (Stock Keeping Unit) *
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                placeholder="e.g. MOU-LOG-MX3"
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-white focus:border-brand-500 focus:outline-none shadow-inner uppercase font-mono"
              />
              {errors.sku && <p className="mt-1 text-xs text-rose-400">{errors.sku}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Accessories, Electronics"
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-white focus:border-brand-500 focus:outline-none shadow-inner"
              />
              {errors.category && <p className="mt-1 text-xs text-rose-400">{errors.category}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Price (₹) *
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. 1499"
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-white focus:border-brand-500 focus:outline-none shadow-inner"
              />
              {errors.price && <p className="mt-1 text-xs text-rose-400">{errors.price}</p>}
            </div>

            {/* Initial Quantity (Only on create) */}
            {!isEditing && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Initial Stock Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g. 20"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-white focus:border-brand-500 focus:outline-none shadow-inner"
                />
                {errors.quantity && <p className="mt-1 text-xs text-rose-400">{errors.quantity}</p>}
              </div>
            )}

            {/* Minimum Stock Threshold */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Minimum Stock Alert Level *
              </label>
              <input
                type="number"
                min="0"
                value={formData.minimumStock}
                onChange={(e) => setFormData({ ...formData, minimumStock: e.target.value })}
                placeholder="e.g. 5"
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-white focus:border-brand-500 focus:outline-none shadow-inner"
              />
              {errors.minimumStock && <p className="mt-1 text-xs text-rose-400">{errors.minimumStock}</p>}
            </div>

            {/* Unit */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Unit of Measure
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="e.g. pcs, boxes, reams"
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-white focus:border-brand-500 focus:outline-none shadow-inner"
              />
            </div>

            {/* Supplier Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Supplier Name
              </label>
              <input
                type="text"
                value={formData.supplierName}
                onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                placeholder="e.g. ABC Tech Distributors"
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-white focus:border-brand-500 focus:outline-none shadow-inner"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Product details or specifications..."
              className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-white focus:border-brand-500 focus:outline-none shadow-inner resize-none"
            />
          </div>

          {/* Modal Action Buttons */}
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
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
