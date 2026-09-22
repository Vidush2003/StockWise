import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as productService from '../services/productService';
import LoadingState from '../components/LoadingState';
import StatusBadge from '../components/StatusBadge';
import TransactionTable from '../components/TransactionTable';
import { formatCurrency, formatDate } from '../utils/formatters';
import { ArrowLeft, Package, Tag, IndianRupee, Layers, Truck, Calendar, User, History } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await productService.getProductById(id);
        setProduct(res.product);
        setRecentTransactions(res.recentTransactions || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product specifications');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return <LoadingState message="Loading product specification sheet..." />;
  }

  if (error || !product) {
    return (
      <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl max-w-lg mx-auto my-12">
        <h3 className="text-lg font-bold text-rose-400">Product Not Found</h3>
        <p className="mt-2 text-xs text-slate-400">{error || 'This product does not exist or has been deleted.'}</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-6 px-4 py-2 bg-slate-800 text-slate-200 hover:bg-slate-700 rounded-xl text-xs font-semibold"
        >
          ← Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Product Catalog
        </button>
      </div>

      {/* Main Spec Card Header */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-mono font-semibold border border-blue-500/20">
                {product.sku}
              </span>
              <StatusBadge status={product.status} />
            </div>
            <h1 className="mt-3 text-2xl font-bold text-white">{product.name}</h1>
            <p className="mt-1 text-sm text-slate-400">{product.description || 'No detailed description specified.'}</p>
          </div>

          <div className="text-left md:text-right">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Unit Price</div>
            <div className="text-3xl font-extrabold text-white mt-0.5">{formatCurrency(product.price)}</div>
          </div>
        </div>

        {/* Specification Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase">
              <Layers className="w-4 h-4 text-blue-400" /> Current Stock
            </div>
            <div className="mt-2 text-xl font-bold text-white">
              {product.quantity} <span className="text-xs font-normal text-slate-400">{product.unit || 'pcs'}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase">
              <Tag className="w-4 h-4 text-amber-400" /> Min Threshold
            </div>
            <div className="mt-2 text-xl font-bold text-white">
              {product.minimumStock} <span className="text-xs font-normal text-slate-400">{product.unit || 'pcs'}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase">
              <Package className="w-4 h-4 text-emerald-400" /> Category
            </div>
            <div className="mt-2 text-base font-bold text-white truncate">{product.category}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase">
              <Truck className="w-4 h-4 text-indigo-400" /> Supplier
            </div>
            <div className="mt-2 text-base font-bold text-white truncate">{product.supplierName || 'N/A'}</div>
          </div>
        </div>

        {/* Metadata Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> Cataloged on: {formatDate(product.createdAt)}
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" /> Created By: {product.createdBy?.name || 'Admin'}
          </div>
        </div>
      </div>

      {/* Recent Audit Transactions for this Product */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-bold text-white">Audit Trail — Recent Movements</h2>
          </div>
          <Link to={`/transactions?product=${product._id}`} className="text-xs text-blue-400 hover:underline font-semibold">
            View All Transactions →
          </Link>
        </div>

        {recentTransactions.length > 0 ? (
          <TransactionTable transactions={recentTransactions} />
        ) : (
          <div className="text-center py-8 text-xs text-slate-500">
            No recent stock movements recorded for this SKU.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
