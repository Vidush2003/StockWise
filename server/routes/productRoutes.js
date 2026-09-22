const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const {
  stockIn,
  stockOut
} = require('../controllers/inventoryController');

const { requireAuth } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

// All product routes require authentication
router.use(requireAuth);

// Product CRUD routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', requireRole('admin'), createProduct);
router.put('/:id', requireRole('admin'), updateProduct);
router.delete('/:id', requireRole('admin'), deleteProduct);

// Inventory mutation routes (Both admin and staff can perform stock operations)
router.post('/:id/stock-in', requireRole('admin', 'staff'), stockIn);
router.post('/:id/stock-out', requireRole('admin', 'staff'), stockOut);

module.exports = router;
