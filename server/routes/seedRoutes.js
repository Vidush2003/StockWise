const express = require('express');
const router = express.Router();
const { seedRemoteDB } = require('../controllers/seedController');

router.get('/', seedRemoteDB);

module.exports = router;
