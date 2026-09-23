const aiService = require('../services/aiService');

/**
 * @desc    Process an AI chat query
 * @route   POST /api/ai/chat
 * @access  Private
 */
const handleChatQuery = async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query is required' });
    }

    const responseText = await aiService.processChatQuery(query);
    res.json({ success: true, data: responseText });
  } catch (error) {
    console.error('Chat AI Error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

/**
 * @desc    Get AI predictive insights
 * @route   GET /api/ai/forecast
 * @access  Private
 */
const getPredictiveInsights = async (req, res) => {
  try {
    const insights = await aiService.generatePredictiveInsights();
    res.json({ success: true, data: insights });
  } catch (error) {
    console.error('Forecast AI Error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

module.exports = {
  handleChatQuery,
  getPredictiveInsights
};
