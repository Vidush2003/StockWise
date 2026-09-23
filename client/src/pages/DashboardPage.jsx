import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as dashboardService from '../services/dashboardService';
import StatCard from '../components/StatCard';
import Skeleton from '../components/Skeleton';
import PredictiveInsights from '../components/ai/PredictiveInsights';
import StatusBadge from '../components/StatusBadge';
import { formatCurrency } from '../utils/formatters';
import {
  Package,
  IndianRupee,
  AlertTriangle,
  XCircle,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  History,
  TrendingUp,
  PieChart as PieIcon,
  Sparkles
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from 'recharts';

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [categoryStats, setCategoryStats] = useState([]);
  const [stockMovement, setStockMovement] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [sumRes, catRes, movRes, alertRes] = await Promise.all([
        dashboardService.getDashboardSummary(),
        dashboardService.getCategoryStats(),
        dashboardService.getStockMovement(),
        dashboardService.getLowStockAlerts()
      ]);

      setSummary(sumRes.summary);
      setCategoryStats(catRes.categoryStats || []);
      setStockMovement(movRes.stockMovement || []);
      setLowStockAlerts(alertRes.alerts || []);
    } catch (err) {
      console.error('[Dashboard Error]', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton.Card />
          <Skeleton.Card />
          <Skeleton.Card />
          <Skeleton.Card />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton.Chart />
          <Skeleton.Chart />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Personalized Welcome Banner & Quick Action Toolbar */}
      <div className="p-8 rounded-3xl glass-panel-elevated flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] group-hover:bg-brand-500/20 transition-colors pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3 tracking-tight">
            <Sparkles className="w-8 h-8 text-brand-400" />
            {getGreeting()}, {user?.name || 'User'}!
          </h1>
          <p className="text-sm md:text-base text-slate-400 mt-2 leading-relaxed max-w-xl">
            Here's what is happening with your stock, inventory valuations, and recent activity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          {isAdmin && (
            <button
              onClick={() => navigate('/products?action=add')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          )}

          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-emerald-400 glass-panel hover:bg-white/5 border-emerald-500/10 rounded-xl transition-colors shadow-lg shadow-black/10"
          >
            <ArrowUpRight className="w-4 h-4" /> Stock In
          </button>

          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-amber-400 glass-panel hover:bg-white/5 border-amber-500/10 rounded-xl transition-colors shadow-lg shadow-black/10"
          >
            <ArrowDownRight className="w-4 h-4" /> Stock Out
          </button>

          <button
            onClick={() => navigate('/transactions')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-slate-300 glass-panel hover:bg-white/5 rounded-xl transition-colors shadow-lg shadow-black/10"
          >
            <History className="w-4 h-4" /> Transactions
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={summary?.totalProducts || 0}
          subtitle="Active SKUs in catalog"
          icon={Package}
          color="blue"
        />
        <StatCard
          title="Total Inventory Value"
          value={formatCurrency(summary?.totalInventoryValue || 0)}
          subtitle="Σ (price × quantity)"
          icon={IndianRupee}
          color="emerald"
        />
        <StatCard
          title="Low Stock Items"
          value={summary?.lowStockItems || 0}
          subtitle="Stock ≤ Minimum Threshold"
          icon={AlertTriangle}
          color="amber"
        />
        <StatCard
          title="Out of Stock Items"
          value={summary?.outOfStockItems || 0}
          subtitle="Stock = 0 units"
          icon={XCircle}
          color="rose"
        />
      </div>

      {/* Predictive Insights */}
      <div className="mb-6">
        <PredictiveInsights />
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown Chart */}
        <div className="p-8 rounded-3xl glass-panel-elevated">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-brand-400" />
              <h3 className="text-lg font-bold text-white tracking-tight">Stock Quantity by Category</h3>
            </div>
          </div>
          <div className="h-64">
            {categoryStats.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="category" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    formatter={(val) => [`${val} units`, 'Quantity']}
                  />
                  <Bar dataKey="totalQuantity" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                No category metrics recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Stock Movement Line Chart */}
        <div className="p-8 rounded-3xl glass-panel-elevated">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white tracking-tight">Recent Stock Movement (7 Days)</h3>
            </div>
          </div>
          <div className="h-64">
            {stockMovement.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stockMovement}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="stockIn" name="Stock In (+)" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="stockOut" name="Stock Out (-)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                No recent stock movements in the last 7 days.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Low Stock Alerts Table */}
      <div className="p-8 rounded-3xl glass-panel-elevated mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">Low & Out of Stock Alerts</h3>
          </div>
          <button
            onClick={() => navigate('/products?status=LOW_STOCK')}
            className="text-sm text-brand-400 hover:text-brand-300 font-bold transition-colors"
          >
            View All in Catalog &rarr;
          </button>
        </div>

        {lowStockAlerts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4 text-center">Current Stock</th>
                  <th className="py-3 px-4 text-center">Min Threshold</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {lowStockAlerts.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-semibold text-white">{item.name}</td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-400">{item.sku}</td>
                    <td className="py-3 px-4 text-center font-bold text-amber-400">
                      {item.quantity} {item.unit || 'pcs'}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-400">
                      {item.minimumStock} {item.unit || 'pcs'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <StatusBadge status={item.quantity === 0 ? 'OUT_OF_STOCK' : 'LOW_STOCK'} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => navigate(`/products`)}
                        className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-semibold"
                      >
                        + Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6 text-sm text-slate-400">
            ✅ All inventory stock levels are healthy! No low stock warnings.
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
