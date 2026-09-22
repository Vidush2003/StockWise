const DashboardService = require('../services/dashboardService');

// @desc    Get dashboard metrics summary (KPIs)
// @route   GET /api/dashboard/summary
// @access  Private (Admin & Staff)
const getSummary = async (req, res, next) => {
  try {
    const summary = await DashboardService.getSummary();
    res.status(200).json({
      success: true,
      summary
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get inventory breakdown by category
// @route   GET /api/dashboard/category-stats
// @access  Private (Admin & Staff)
const getCategoryStats = async (req, res, next) => {
  try {
    const categoryStats = await DashboardService.getCategoryStats();
    res.status(200).json({
      success: true,
      categoryStats
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recent stock movement metrics
// @route   GET /api/dashboard/stock-movement
// @access  Private (Admin & Staff)
const getStockMovement = async (req, res, next) => {
  try {
    const stockMovement = await DashboardService.getStockMovement();
    res.status(200).json({
      success: true,
      stockMovement
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get low stock items alert list
// @route   GET /api/dashboard/low-stock-alerts
// @access  Private (Admin & Staff)
const getLowStockAlerts = async (req, res, next) => {
  try {
    const alerts = await DashboardService.getLowStockAlerts();
    res.status(200).json({
      success: true,
      alerts
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSummary,
  getCategoryStats,
  getStockMovement,
  getLowStockAlerts
};
