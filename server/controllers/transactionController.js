const InventoryTransaction = require('../models/InventoryTransaction');

// @desc    Get paginated transaction history with filters
// @route   GET /api/transactions
// @access  Private (Admin & Staff)
const getTransactions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    const { type, product, user, startDate, endDate } = req.query;

    const query = {};

    if (type && type !== 'ALL') {
      query.type = type;
    }

    if (product) {
      query.product = product;
    }

    if (user) {
      query.performedBy = user;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    const total = await InventoryTransaction.countDocuments(query);
    const totalPages = Math.ceil(total / limit) || 1;

    const transactions = await InventoryTransaction.find(query)
      .populate('product', 'name sku category price unit')
      .populate('performedBy', 'name email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      transactions,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single transaction by ID
// @route   GET /api/transactions/:id
// @access  Private
const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await InventoryTransaction.findById(req.params.id)
      .populate('product', 'name sku category price unit supplierName')
      .populate('performedBy', 'name email role');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction record not found'
      });
    }

    res.status(200).json({
      success: true,
      transaction
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTransactions,
  getTransactionById
};
