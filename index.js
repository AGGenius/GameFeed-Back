const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const gameRoutes = require('./routes/gamesRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postsRoutes');
const likesRoutes = require('./routes/likesRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/games', gameRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likesRoutes);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});