import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as inventoryService from '../services/inventoryService';
import TransactionTable from '../components/TransactionTable';
import Pagination from '../components/Pagination';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { History, Filter, RotateCcw } from 'lucide-react';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState('ALL');
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await inventoryService.getTransactions({
        page,
        limit: 15,
        type,
        product: productId || undefined
      });

      setTransactions(res.transactions || []);
      setPagination(res.pagination || { page: 1, limit: 15, total: 0, totalPages: 1 });
    } catch (err) {
      console.error('[Fetch Transactions Error]', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, type, productId]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-6 h-6 text-blue-400" /> Stock Audit & Transaction Logs
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Immutable audit trail of all stock intake, issuance, and quantity adjustments
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-blue-400" /> Filter Type:
          </div>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
            className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="ALL">All Transaction Types</option>
            <option value="STOCK_IN">Stock In (+)</option>
            <option value="STOCK_OUT">Stock Out (-)</option>
            <option value="ADJUSTMENT">Stock Adjustment</option>
          </select>
        </div>

        {productId && (
          <div className="flex items-center gap-2 text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-xl font-medium">
            Filtering by selected product SKU
            <button onClick={() => window.location.href = '/transactions'} className="hover:text-white">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Content Rendering */}
      {loading ? (
        <LoadingState message="Fetching audit transaction logs..." />
      ) : transactions.length > 0 ? (
        <>
          <TransactionTable transactions={transactions} />
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            limit={pagination.limit}
            onPageChange={(p) => setPage(p)}
          />
        </>
      ) : (
        <EmptyState
          title="No transaction logs recorded"
          description="Stock movements like Stock-In and Stock-Out will automatically record audit logs here."
        />
      )}
    </div>
  );
};

export default TransactionsPage;
