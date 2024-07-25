const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likesController');

router.get('/', likesController.getLikes)
router.post('/', likesController.controlUserLike);

module.exports = router;