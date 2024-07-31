const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likesController');
const { asyncErrorHandler } = require('../middlewares/errors.js');
const { validate } = require('../middlewares/validation.js');
const { controlLikesSchema } = require('../validators/likes.js');


router.get('/', asyncErrorHandler(likesController.getLikes));
router.post('/', controlLikesSchema, validate, asyncErrorHandler(likesController.controlUserLike));

module.exports = router;