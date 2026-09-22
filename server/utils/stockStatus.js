/**
 * Determines stock status string based on current quantity and minimum stock threshold.
 * 
 * Logic per Master Prompt Section 8:
 * - OUT_OF_STOCK: quantity === 0
 * - LOW_STOCK: quantity > 0 AND quantity <= minimumStock
 * - IN_STOCK: quantity > minimumStock
 * 
 * @param {number} quantity - Current product stock quantity
 * @param {number} minimumStock - Minimum stock alert threshold
 * @returns {'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'}
 */
const getStockStatus = (quantity, minimumStock = 0) => {
  const qty = Number(quantity) || 0;
  const min = Number(minimumStock) || 0;

  if (qty <= 0) {
    return 'OUT_OF_STOCK';
  }
  if (qty <= min) {
    return 'LOW_STOCK';
  }
  return 'IN_STOCK';
};

module.exports = {
  getStockStatus
};
