const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { asyncErrorHandler } = require('../middlewares/errors.js');
const { validate } = require('../middlewares/validation.js');
const { idParamSchema, tittleParamSchema, newGameBodySchema, editGameSchema, filterGameSchema } = require('../validators/games');
const { userIDParamSchema } = require('../validators/common');


router.get('/filter', filterGameSchema, validate, asyncErrorHandler(gameController.getGamesByFilter));
router.get('/', asyncErrorHandler(gameController.getGames));
router.get('/:id', idParamSchema, validate, asyncErrorHandler(gameController.getGameById));
router.get('/tittle/:tittle',tittleParamSchema, validate, asyncErrorHandler(gameController.getGameByTittle));
router.get('/user/:user_id', userIDParamSchema, validate, asyncErrorHandler(gameController.getGamesByUserID)); 
router.put('/:id', idParamSchema, editGameSchema, validate, asyncErrorHandler(gameController.editGameById));
router.post('/create', newGameBodySchema, validate, asyncErrorHandler(gameController.createGame));
router.delete('/:id',idParamSchema, validate, asyncErrorHandler(gameController.deletGameById));

module.exports = router;