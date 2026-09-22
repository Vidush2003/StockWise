const express = require('express');
const router = express.Router();
const {
  getSummary,
  getCategoryStats,
  getStockMovement,
  getLowStockAlerts
} = require('../controllers/dashboardController');
const { requireAuth } = require('../middleware/authMiddleware');

router.use(requireAuth);

router.get('/summary', getSummary);
router.get('/category-stats', getCategoryStats);
router.get('/stock-movement', getStockMovement);
router.get('/low-stock-alerts', getLowStockAlerts);

module.exports = router;
