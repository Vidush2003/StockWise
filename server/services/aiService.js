const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('../models/Product');
const InventoryTransaction = require('../models/InventoryTransaction');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' });

/**
 * Handle a chat query by injecting current inventory context.
 */
const processChatQuery = async (userQuery) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  try {
    // 1. Fetch relevant database context (summarized to fit context window)
    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.find({ $expr: { $lte: ['$quantity', '$minimumStock'] } })
      .select('name sku quantity minimumStock')
      .limit(20);

    // Get recent transactions to provide context on recent activity
    const recentTransactions = await InventoryTransaction.find()
      .populate('product', 'name sku')
      .sort({ createdAt: -1 })
      .limit(10);

    // 2. Build the prompt
    const systemPrompt = `
You are the StockWise AI, an intelligent inventory assistant. 
You help warehouse managers and staff understand their stock.
Be concise, helpful, and professional.

Current Inventory State:
- Total Unique Products: ${totalProducts}
- Low Stock Items (${lowStockProducts.length}):
${lowStockProducts.map(p => `  * ${p.name} (SKU: ${p.sku}) - ${p.quantity}/${p.minimumStock}`).join('\n')}

Recent Transactions (last 10):
${recentTransactions.map(t => `  * ${t.type}: ${t.quantity} of ${t.product?.name} (Reason: ${t.reason})`).join('\n')}

User Query: "${userQuery}"

Provide a clear and concise response based ONLY on the provided context. If the user asks about something not in the context, politely state you only have access to a summarized view of the current inventory.
    `;

    // 3. Generate response
    try {
      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      return response.text();
    } catch (apiError) {
      console.warn('Gemini API is unavailable, falling back to mock response:', apiError.message);
      return `[Mock AI Response - API Unavailable]\nBased on your inventory, you currently have ${totalProducts} unique products. There are ${lowStockProducts.length} items flagged as low stock. Please check the dashboard alerts for more details!`;
    }
  } catch (error) {
    console.error('Error in AI Chat Service:', error);
    throw new Error('Failed to process AI chat query.');
  }
};

/**
 * Generate predictive analytics and demand forecasting.
 */
const generatePredictiveInsights = async () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  try {
    // 1. Get products that have stock and a minimum threshold
    const products = await Product.find({ quantity: { $gt: 0 } }).select('name quantity minimumStock');

    // 2. Get STOCK_OUT transactions from the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const stockOuts = await InventoryTransaction.aggregate([
      {
        $match: {
          type: 'STOCK_OUT',
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: '$product',
          totalDepleted: { $sum: '$quantity' }
        }
      }
    ]);

    // Map depletion rates to products
    const productStats = products.map(product => {
      const depletionStat = stockOuts.find(s => s._id.toString() === product._id.toString());
      const past30DaysUsage = depletionStat ? depletionStat.totalDepleted : 0;
      const dailyBurnRate = past30DaysUsage / 30;

      return {
        name: product.name,
        currentQuantity: product.quantity,
        minimumStock: product.minimumStock,
        dailyBurnRate: dailyBurnRate.toFixed(2),
        estimatedDaysLeft: dailyBurnRate > 0 ? Math.round((product.quantity - product.minimumStock) / dailyBurnRate) : '999'
      };
    }).filter(p => p.dailyBurnRate > 0); // Only care about items that are actually moving

    // 3. Build prompt for Gemini to interpret
    const prompt = `
You are the StockWise AI Predictive Engine.
Analyze the following product burn rates (usage over the last 30 days) and provide a short, professional "Predictive Insights" summary for the warehouse manager.
Highlight any items that will reach their minimum stock threshold within the next 7 days.

Data:
${JSON.stringify(productStats, null, 2)}

Format your response exactly as a JSON array of insight strings. For example:
[
  "Product X is depleting fast and will reach minimum stock in 3 days. Consider reordering soon.",
  "Product Y has a stable burn rate, adequate stock for the next 14 days."
]
Return ONLY the JSON array.
    `;

    // 4. Generate response
    try {
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
  
      // Clean up response if it contains markdown formatting
      const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
  
      return JSON.parse(cleanedText);
    } catch (apiError) {
      console.warn('Gemini API is unavailable for forecasting, falling back to mock response:', apiError.message);
      if (productStats.length > 0) {
        return productStats.slice(0, 2).map(p => 
          `[Mock AI] Based on recent burn rate, ${p.name} is depleting at ${p.dailyBurnRate} units/day. Estimated days left: ${p.estimatedDaysLeft}.`
        );
      }
      return ["[Mock AI] Your inventory is currently stable. No significant stock depletion detected in the last 30 days."];
    }
  } catch (error) {
    console.error('Error in AI Forecasting Service:', error);
    throw new Error('Failed to generate predictive insights.');
  }
};

module.exports = {
  processChatQuery,
  generatePredictiveInsights
};
