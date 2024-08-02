const express = require('express');
const router = express.Router();
const gameRoutes = require('./gamesRoutes');
const likesRoutes = require('./likesRoutes');
const postRoutes = require('./postsRoutes');
const userRoutes = require('./userRoutes');

router.use('/api/games', gameRoutes);
router.use('/api/users', userRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/likes', likesRoutes);

module.exports = router