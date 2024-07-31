const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postControllers')
const { asyncErrorHandler } = require('../middlewares/errors.js');
const { validate } = require('../middlewares/validation.js');
const { idParamSchema, filterPostsSchema, editPostSchema, createPostSchema } = require('../validators/posts.js');

router.get('/game/:id', idParamSchema, validate, asyncErrorHandler(postControllers.getPostsByGameId));
router.post('/filter', filterPostsSchema, validate, asyncErrorHandler(postControllers.getPostByFilter));
router.get('/:id', idParamSchema, validate, asyncErrorHandler(postControllers.getPostsById));
router.put('/:id', idParamSchema, editPostSchema, validate, asyncErrorHandler(postControllers.editPostById));
router.delete('/:id', idParamSchema, validate, asyncErrorHandler(postControllers.deletPostById));
router.post('/create', createPostSchema, validate, asyncErrorHandler(postControllers.createPost));

module.exports = router;