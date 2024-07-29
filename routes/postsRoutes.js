const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postControllers')


router.get('/game/:id', postControllers.getPostsByGameId);
router.get('/page/:page/:id', postControllers.getPostPaged);
router.get('/:id', postControllers.getPostsById);
router.put('/:id', postControllers.editPostById);
router.post('/create', postControllers.createPost);
router.delete('/:id', postControllers.deletPostById);

module.exports = router;