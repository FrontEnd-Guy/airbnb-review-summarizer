const express = require('express');
const reviewsController = require('../controllers/reviewsController');
const router = express.Router();

router.post('/summarize', reviewsController.summarize);

module.exports = router;
