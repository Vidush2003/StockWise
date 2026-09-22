const express = require('express');
const router = express.Router();
const {
  getTransactions,
  getTransactionById
} = require('../controllers/transactionController');
const { requireAuth } = require('../middleware/authMiddleware');

router.use(requireAuth);

router.get('/', getTransactions);
router.get('/:id', getTransactionById);

module.exports = router;
