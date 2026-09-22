const Product = require('../models/Product');
const InventoryTransaction = require('../models/InventoryTransaction');
const { getStockStatus } = require('../utils/stockStatus');

// @desc    Get paginated, searchable, filterable products
// @route   GET /api/products
// @access  Private (Admin & Staff)
const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, category, status, sortBy = 'createdAt', order = 'desc' } = req.query;

    const query = { isActive: true };

    // Search filter across name, sku, category
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { sku: searchRegex },
        { category: searchRegex },
        { supplierName: searchRegex }
      ];
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Status filter
    let allProducts = await Product.find(query).sort({ [sortBy]: order === 'asc' ? 1 : -1 });

    if (status && status !== 'ALL') {
      allProducts = allProducts.filter((p) => getStockStatus(p.quantity, p.minimumStock) === status);
    }

    const total = allProducts.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const paginatedProducts = allProducts.slice(skip, skip + limit);

    // Extract unique categories for frontend dropdown filter
    const categories = await Product.distinct('category', { isActive: true });

    res.status(200).json({
      success: true,
      products: paginatedProducts,
      categories,
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

// @desc    Get single product by ID with recent transaction logs
// @route   GET /api/products/:id
// @access  Private
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name email');
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Fetch recent 10 transactions for this product
    const recentTransactions = await InventoryTransaction.find({ product: product._id })
      .populate('performedBy', 'name role')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      product,
      recentTransactions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Admin Only)
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      sku,
      category,
      description,
      price,
      quantity,
      minimumStock,
      unit,
      supplierName
    } = req.body;

    if (!name || !sku || !category || price === undefined || price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Name, SKU, category, and a valid non-negative price are required'
      });
    }

    const skuUpper = sku.toUpperCase().trim();
    const existingSku = await Product.findOne({ sku: skuUpper });
    if (existingSku) {
      return res.status(409).json({
        success: false,
        message: `Product with SKU '${skuUpper}' already exists`
      });
    }

    const initialQuantity = parseInt(quantity) || 0;
    const minStock = parseInt(minimumStock) >= 0 ? parseInt(minimumStock) : 5;

    const product = await Product.create({
      name: name.trim(),
      sku: skuUpper,
      category: category.trim(),
      description: description ? description.trim() : '',
      price: Number(price),
      quantity: initialQuantity,
      minimumStock: minStock,
      unit: unit ? unit.trim() : 'pcs',
      supplierName: supplierName ? supplierName.trim() : 'N/A',
      createdBy: req.user._id
    });

    // If initial stock was provided, create an initial transaction record
    if (initialQuantity > 0) {
      await InventoryTransaction.create({
        product: product._id,
        type: 'STOCK_IN',
        quantity: initialQuantity,
        previousQuantity: 0,
        newQuantity: initialQuantity,
        reason: 'Initial stock intake on product creation',
        performedBy: req.user._id
      });
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product details
// @route   PUT /api/products/:id
// @access  Private (Admin Only)
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const {
      name,
      sku,
      category,
      description,
      price,
      minimumStock,
      unit,
      supplierName
    } = req.body;

    if (sku && sku.toUpperCase().trim() !== product.sku) {
      const existingSku = await Product.findOne({ sku: sku.toUpperCase().trim() });
      if (existingSku) {
        return res.status(409).json({
          success: false,
          message: `Product with SKU '${sku.toUpperCase().trim()}' already exists`
        });
      }
      product.sku = sku.toUpperCase().trim();
    }

    if (name) product.name = name.trim();
    if (category) product.category = category.trim();
    if (description !== undefined) product.description = description.trim();
    if (price !== undefined) {
      if (Number(price) < 0) {
        return res.status(400).json({ success: false, message: 'Price cannot be negative' });
      }
      product.price = Number(price);
    }
    if (minimumStock !== undefined) {
      if (Number(minimumStock) < 0) {
        return res.status(400).json({ success: false, message: 'Minimum stock cannot be negative' });
      }
      product.minimumStock = Number(minimumStock);
    }
    if (unit) product.unit = unit.trim();
    if (supplierName !== undefined) product.supplierName = supplierName.trim();

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Soft Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin Only)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Soft delete to maintain historical transaction reference integrity
    product.isActive = false;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
