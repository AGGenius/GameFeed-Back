const express = require('express');
const router = express.Router();
const userController = require('../controllers/gameController');


router.get('/', userController.getGames);
router.get('/:id', userController.getGameById);
router.put('/:id', userController.editGameById);
router.post('/create', userController.createGame);
router.delete('/:id', userController.deletGameById);

module.exports = router;