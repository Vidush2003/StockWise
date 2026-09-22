const Product = require('../models/Product');
const InventoryTransaction = require('../models/InventoryTransaction');

/**
 * Service handling inventory movements (Stock In, Stock Out, Adjustments).
 * Encapsulates validation, stock calculation, data consistency, and transaction logging.
 */
class InventoryService {
  /**
   * Add stock to product (Stock In)
   */
  static async recordStockIn({ productId, quantity, reason, userId }) {
    const qty = Number(quantity);
    if (!qty || qty <= 0 || !Number.isInteger(qty)) {
      const err = new Error('Stock-in quantity must be a positive whole integer');
      err.statusCode = 400;
      throw err;
    }

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      const err = new Error('Product not found or inactive');
      err.statusCode = 404;
      throw err;
    }

    const previousQuantity = product.quantity;
    const newQuantity = previousQuantity + qty;

    // Perform atomic update on Product stock
    product.quantity = newQuantity;
    await product.save();

    // Create Audit Transaction record
    const transaction = await InventoryTransaction.create({
      product: product._id,
      type: 'STOCK_IN',
      quantity: qty,
      previousQuantity,
      newQuantity,
      reason: reason || 'Stock received',
      performedBy: userId
    });

    return { product, transaction };
  }

  /**
   * Remove stock from product (Stock Out) with negative quantity guard
   */
  static async recordStockOut({ productId, quantity, reason, userId }) {
    const qty = Number(quantity);
    if (!qty || qty <= 0 || !Number.isInteger(qty)) {
      const err = new Error('Stock-out quantity must be a positive whole integer');
      err.statusCode = 400;
      throw err;
    }

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      const err = new Error('Product not found or inactive');
      err.statusCode = 404;
      throw err;
    }

    const previousQuantity = product.quantity;

    // Strict validation: Reject if requested stock exceeds current stock
    if (qty > previousQuantity) {
      const err = new Error(
        `Insufficient stock: Cannot remove ${qty} units. Only ${previousQuantity} units available.`
      );
      err.statusCode = 400;
      throw err;
    }

    const newQuantity = previousQuantity - qty;

    product.quantity = newQuantity;
    await product.save();

    const transaction = await InventoryTransaction.create({
      product: product._id,
      type: 'STOCK_OUT',
      quantity: qty,
      previousQuantity,
      newQuantity,
      reason: reason || 'Stock issued / sold',
      performedBy: userId
    });

    return { product, transaction };
  }
}

module.exports = InventoryService;
