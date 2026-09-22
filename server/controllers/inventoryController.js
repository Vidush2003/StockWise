const InventoryService = require('../services/inventoryService');

// @desc    Record Stock In transaction
// @route   POST /api/products/:id/stock-in
// @access  Private (Admin & Staff)
const stockIn = async (req, res, next) => {
  try {
    const { quantity, reason } = req.body;
    const productId = req.params.id;

    if (!quantity || Number(quantity) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid positive quantity for stock-in'
      });
    }

    const result = await InventoryService.recordStockIn({
      productId,
      quantity,
      reason,
      userId: req.user._id
    });

    res.status(200).json({
      success: true,
      message: `Successfully added ${quantity} units to ${result.product.name}`,
      product: result.product,
      transaction: result.transaction
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

// @desc    Record Stock Out transaction
// @route   POST /api/products/:id/stock-out
// @access  Private (Admin & Staff)
const stockOut = async (req, res, next) => {
  try {
    const { quantity, reason } = req.body;
    const productId = req.params.id;

    if (!quantity || Number(quantity) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid positive quantity for stock-out'
      });
    }

    const result = await InventoryService.recordStockOut({
      productId,
      quantity,
      reason,
      userId: req.user._id
    });

    res.status(200).json({
      success: true,
      message: `Successfully issued ${quantity} units from ${result.product.name}`,
      product: result.product,
      transaction: result.transaction
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

module.exports = {
  stockIn,
  stockOut
};
