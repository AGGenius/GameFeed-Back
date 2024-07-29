const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');


router.get('/', gameController.getGames);
router.get('/:id', gameController.getGameById);
router.get('/page/:page', gameController.getGamesPaged);
router.get('/page/:page/:filter', gameController.getGamesPagedFilter);
router.get('/tittle/:tittle', gameController.getGameByTittle);
router.put('/:id', gameController.editGameById);
router.post('/create', gameController.createGame);
router.delete('/:id', gameController.deletGameById);

module.exports = router;