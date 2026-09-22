const Product = require('../models/Product');
const InventoryTransaction = require('../models/InventoryTransaction');

class DashboardService {
  /**
   * Calculate summary metrics (KPIs)
   */
  static async getSummary() {
    const products = await Product.find({ isActive: true }).lean();

    let totalProducts = products.length;
    let totalInventoryValue = 0;
    let lowStockItems = 0;
    let outOfStockItems = 0;

    products.forEach((p) => {
      const val = (p.price || 0) * (p.quantity || 0);
      totalInventoryValue += val;

      if (p.quantity <= 0) {
        outOfStockItems++;
      } else if (p.quantity <= p.minimumStock) {
        lowStockItems++;
      }
    });

    return {
      totalProducts,
      totalInventoryValue: Math.round(totalInventoryValue * 100) / 100,
      lowStockItems,
      outOfStockItems
    };
  }

  /**
   * Aggregation for Category Breakdown
   */
  static async getCategoryStats() {
    const stats = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          totalProducts: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' },
          totalValue: { $sum: { $multiply: ['$price', '$quantity'] } }
        }
      },
      { $sort: { totalQuantity: -1 } }
    ]);

    return stats.map((item) => ({
      category: item._id,
      totalProducts: item.totalProducts,
      totalQuantity: item.totalQuantity,
      totalValue: Math.round(item.totalValue * 100) / 100
    }));
  }

  /**
   * Aggregation for Recent Stock Movement History (Last 7 Days)
   */
  static async getStockMovement() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const transactions = await InventoryTransaction.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            type: '$type'
          },
          totalQuantity: { $sum: '$quantity' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.date': 1 } }
    ]);

    // Format into daily Stock In / Stock Out metrics
    const dailyMap = {};

    transactions.forEach((item) => {
      const date = item._id.date;
      const type = item._id.type;

      if (!dailyMap[date]) {
        dailyMap[date] = { date, stockIn: 0, stockOut: 0 };
      }

      if (type === 'STOCK_IN') {
        dailyMap[date].stockIn += item.totalQuantity;
      } else if (type === 'STOCK_OUT') {
        dailyMap[date].stockOut += item.totalQuantity;
      }
    });

    return Object.values(dailyMap);
  }

  /**
   * Get Low Stock alert list
   */
  static async getLowStockAlerts() {
    const products = await Product.find({ isActive: true }).lean();
    return products
      .filter((p) => p.quantity <= p.minimumStock)
      .sort((a, b) => a.quantity - b.quantity)
      .slice(0, 10);
  }
}

module.exports = DashboardService;
