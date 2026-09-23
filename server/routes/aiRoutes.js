const express = require('express');
const router = express.Router();
const { handleChatQuery, getPredictiveInsights } = require('../controllers/aiController');
const { requireAuth } = require('../middleware/authMiddleware');

// Protect all AI routes
router.use(requireAuth);

router.post('/chat', handleChatQuery);
router.get('/forecast', getPredictiveInsights);

module.exports = router;
