const express = require('express');
const router = express.Router();
const userController = require('../controllers/gameController');


router.get('/', userController.getGames);

module.exports = router;