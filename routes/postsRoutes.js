const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postControllers')


router.get('/:id', postControllers.getPostsByGameId);
router.put('/:id', postControllers.editPostById);
router.post('/create', postControllers.createPost);
router.delete('/:id', postControllers.deletPostById);

module.exports = router;