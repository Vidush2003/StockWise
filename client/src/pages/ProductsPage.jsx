import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import * as productService from '../services/productService';
import * as inventoryService from '../services/inventoryService';
import ProductTable from '../components/ProductTable';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import Skeleton from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import ProductFormModal from '../components/ProductFormModal';
import StockModal from '../components/StockModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Plus, Package } from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [stockModal, setStockModal] = useState({ isOpen: false, product: null, mode: 'IN' });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, product: null, loading: false });

  const { isAdmin } = useAuth();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setIsFormOpen(true);
      setEditingProduct(null);
    }
    if (searchParams.get('status')) {
      setStatus(searchParams.get('status'));
    }
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getProducts({
        page,
        limit: 10,
        search,
        category,
        status,
        sortBy,
        order
      });

      setProducts(res.products || []);
      setCategories(res.categories || []);
      setPagination(res.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 });
    } catch (err) {
      console.error('[Fetch Products Error]', err);
      showToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, category, status, sortBy, order]);

  // Create or Edit Product submit handler
  const handleSaveProduct = async (formData) => {
    if (editingProduct) {
      const res = await productService.updateProduct(editingProduct._id, formData);
      showToast(res.message || 'Product updated successfully', 'success');
    } else {
      const res = await productService.createProduct(formData);
      showToast(res.message || 'Product created successfully', 'success');
    }
    fetchProducts();
  };

  // Stock In / Stock Out submit handler
  const handleStockMutation = async (productId, quantity, reason) => {
    if (stockModal.mode === 'IN') {
      const res = await inventoryService.recordStockIn(productId, quantity, reason);
      showToast(res.message || 'Stock In recorded', 'success');
    } else {
      const res = await inventoryService.recordStockOut(productId, quantity, reason);
      showToast(res.message || 'Stock Out recorded', 'success');
    }
    fetchProducts();
  };

  // Delete product handler
  const handleDeleteConfirm = async () => {
    if (!deleteModal.product) return;
    setDeleteModal((prev) => ({ ...prev, loading: true }));
    try {
      const res = await productService.deleteProduct(deleteModal.product._id);
      showToast(res.message || 'Product deleted', 'success');
      setDeleteModal({ isOpen: false, product: null, loading: false });
      fetchProducts();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete product', 'error');
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 mb-8 bg-slate-900/40 p-6 md:p-8 rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 tracking-tight">
            <Package className="w-8 h-8 text-brand-400" /> Product Catalog
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            Manage SKUs, prices, stock quantities, and inventory movements.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="relative z-10 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
          >
            <Plus className="w-5 h-5" /> Add New Product
          </button>
        )}
      </div>

      {/* Search & Filter Controls */}
      <FilterBar
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        category={category}
        onCategoryChange={(cat) => {
          setCategory(cat);
          setPage(1);
        }}
        categories={categories}
        status={status}
        onStatusChange={(stat) => {
          setStatus(stat);
          setPage(1);
        }}
        sortBy={sortBy}
        onSortByChange={(sort) => setSortBy(sort)}
        order={order}
        onOrderToggle={() => setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
      />

      {/* Table Content or Skeleton Loading State */}
      {loading ? (
        <Skeleton.Table rows={6} />
      ) : products.length > 0 ? (
        <>
          <ProductTable
            products={products}
            isAdmin={isAdmin}
            onView={(id) => navigate(`/products/${id}`)}
            onEdit={(prod) => {
              setEditingProduct(prod);
              setIsFormOpen(true);
            }}
            onDelete={(prod) => setDeleteModal({ isOpen: true, product: prod, loading: false })}
            onStockIn={(prod) => setStockModal({ isOpen: true, product: prod, mode: 'IN' })}
            onStockOut={(prod) => setStockModal({ isOpen: true, product: prod, mode: 'OUT' })}
          />

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
          title="No products matched your query"
          description="Try broadening your search term or clearing active filters."
          actionText={isAdmin ? 'Add New Product' : null}
          onAction={isAdmin ? () => setIsFormOpen(true) : null}
        />
      )}

      {/* Product Add/Edit Modal */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSaveProduct}
        initialData={editingProduct}
        isEditing={!!editingProduct}
      />

      {/* Stock In / Stock Out Modal */}
      <StockModal
        isOpen={stockModal.isOpen}
        onClose={() => setStockModal({ isOpen: false, product: null, mode: 'IN' })}
        onSubmit={handleStockMutation}
        product={stockModal.product}
        mode={stockModal.mode}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, product: null, loading: false })}
        onConfirm={handleDeleteConfirm}
        loading={deleteModal.loading}
        title="Delete Product"
        message={`Are you sure you want to delete '${deleteModal.product?.name}'? Historical transaction logs will be retained.`}
      />
    </div>
  );
};

export default ProductsPage;
