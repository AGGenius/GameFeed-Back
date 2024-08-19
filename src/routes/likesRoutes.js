const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likesController');
const { asyncErrorHandler } = require('../middlewares/errors.js');
const { validate } = require('../middlewares/validation.js');
const { controlLikesSchema } = require('../validators/likes.js');
const { userIDParamSchema } = require('../validators/common');


router.get('/', asyncErrorHandler(likesController.getLikes));
router.get('/user/:user_id', userIDParamSchema, validate, asyncErrorHandler(likesController.getLikesByUserID));
router.post('/', controlLikesSchema, validate, asyncErrorHandler(likesController.controlUserLike));

module.exports = router;